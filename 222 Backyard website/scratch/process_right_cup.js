import sharp from 'sharp';
import path from 'path';

const artifactDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\a5c3cba3-a7d6-4f7e-9a68-3928fffcb091';
const rightSrc = path.join(artifactDir, 'cup_cheer_right_1789311413122.jpg');

async function processRightCup() {
  const { data, info } = await sharp(rightSrc)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.from(data);

  // BFS from edges
  const visited = new Uint8Array(width * height);
  const queue = [];

  function push(x, y) {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const idx = y * width + x;
      if (!visited[idx]) {
        visited[idx] = 1;
        queue.push((y << 16) | x);
      }
    }
  }

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
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

    // Background threshold (including soft studio shadow on pure white floor: r > 220, g > 220, b > 220)
    const isBg = r > 228 && g > 228 && b > 228;

    if (isBg) {
      out[pIdx + 3] = 0;
      if (x > 0) push(x - 1, y);
      if (x < width - 1) push(x + 1, y);
      if (y > 0) push(x, y - 1);
      if (y < height - 1) push(x, y + 1);
    } else {
      const minVal = Math.min(r, g, b);
      if (minVal > 210) {
        const factor = (228 - minVal) / 18;
        out[pIdx + 3] = Math.round(Math.min(255, Math.max(0, factor * 255)));
      }
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .png()
    .toFile('public/assets/hero-cup-right.png');

  console.log('Right cup perfectly processed!');
}

processRightCup().catch(console.error);
