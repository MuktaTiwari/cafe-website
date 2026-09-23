import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Artifact file paths generated
const artifactDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\a5c3cba3-a7d6-4f7e-9a68-3928fffcb091';

const files = [
  {
    src: path.join(artifactDir, 'cup_cheer_left_1789311372572.jpg'),
    dest: 'public/assets/hero-cup-left.png',
  },
  {
    src: path.join(artifactDir, 'cup_cheer_center_1789311313247.jpg'),
    dest: 'public/assets/hero-cup-center.png',
  },
  {
    src: path.join(artifactDir, 'cup_cheer_right_1789311413122.jpg'),
    dest: 'public/assets/hero-cup-right.png',
  },
];

async function removeWhiteBackground(srcPath, destPath) {
  const { data, info } = await sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.from(data);

  // Simple BFS flood fill from the 4 corners to remove outer white background
  const visited = new Uint8Array(width * height);
  const queue = [];

  function pushPixel(x, y) {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const idx = y * width + x;
      if (!visited[idx]) {
        visited[idx] = 1;
        queue.push((y << 16) | x);
      }
    }
  }

  // Push all perimeter border pixels to queue if they are near-white
  for (let x = 0; x < width; x++) {
    pushPixel(x, 0);
    pushPixel(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushPixel(0, y);
    pushPixel(width - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const val = queue[head++];
    const x = val & 0xffff;
    const y = (val >> 16) & 0xffff;
    const pIdx = (y * width + x) * channels;

    const r = data[pIdx];
    const g = data[pIdx + 1];
    const b = data[pIdx + 2];

    // Check if background (near white or light neutral gray)
    const isBg = r > 242 && g > 242 && b > 242;

    if (isBg) {
      // Set transparent
      out[pIdx + 3] = 0;

      // Expand neighbors
      if (x > 0) pushPixel(x - 1, y);
      if (x < width - 1) pushPixel(x + 1, y);
      if (y > 0) pushPixel(x, y - 1);
      if (y < height - 1) pushPixel(x, y + 1);
    } else {
      // Check for anti-aliasing edge (feathering near white border)
      const minVal = Math.min(r, g, b);
      if (minVal > 225) {
        const factor = (255 - minVal) / 30;
        out[pIdx + 3] = Math.round(Math.min(255, Math.max(0, factor * 255)));
      }
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .png()
    .toFile(destPath);

  console.log(`Saved transparent cutout to: ${destPath}`);
}

async function main() {
  for (const item of files) {
    await removeWhiteBackground(item.src, item.dest);
  }
}

main().catch(console.error);
