import sharp from 'sharp';
import path from 'path';

const artifactDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\a5c3cba3-a7d6-4f7e-9a68-3928fffcb091';

const items = [
  {
    src: path.join(artifactDir, 'cup_cheer_left_open_1789319263232.jpg'),
    dest: 'public/assets/hero-cup-left.png',
    name: 'Left Cup (Open + Coffee Splash)',
  },
  {
    src: path.join(artifactDir, 'cup_cheer_center_open_1789319523868.jpg'),
    dest: 'public/assets/hero-cup-center.png',
    name: 'Center Cup (Open + Crown Splash)',
  },
  {
    src: path.join(artifactDir, 'cup_cheer_right_open_1789319419255.jpg'),
    dest: 'public/assets/hero-cup-right.png',
    name: 'Right Cup (Open + Coffee Splash)',
  },
];

async function processCup(srcPath, destPath, name) {
  console.log(`\nProcessing ${name}...`);
  const { data, info } = await sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.from(data);

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

  // Push borders
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

    // Background check: pure white or near white
    // Note: paper cup has warm tone (b < 235), so (r>245 && g>245 && b>245) or (minVal > 246)
    const minVal = Math.min(r, g, b);
    const isBg = minVal > 244;

    if (isBg) {
      out[pIdx + 3] = 0; // fully transparent

      // Expand
      if (x > 0) pushPixel(x - 1, y);
      if (x < width - 1) pushPixel(x + 1, y);
      if (y > 0) pushPixel(x, y - 1);
      if (y < height - 1) pushPixel(x, y + 1);
    } else {
      // Soft edge anti-aliasing feathering
      if (minVal > 228) {
        const factor = (245 - minVal) / 17;
        out[pIdx + 3] = Math.round(Math.min(255, Math.max(0, factor * 255)));
      }
    }
  }

  // Find bounding box of non-zero alpha
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = out[(y * width + x) * channels + 3];
      if (a > 15) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = 12;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(width - cropX, maxX - minX + pad * 2);
  const cropH = Math.min(height - cropY, maxY - minY + pad * 2);

  console.log(`Cropping to ${cropW}x${cropH} at (${cropX}, ${cropY})`);

  await sharp(out, { raw: { width, height, channels } })
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(destPath);

  console.log(`Saved transparent ${destPath}`);
}

async function main() {
  for (const item of items) {
    await processCup(item.src, item.dest, item.name);
  }
}

main().catch(console.error);
