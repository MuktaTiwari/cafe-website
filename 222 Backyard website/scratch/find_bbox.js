import sharp from 'sharp';
import path from 'path';

const artifactDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\a5c3cba3-a7d6-4f7e-9a68-3928fffcb091';

const files = [
  path.join(artifactDir, 'cup_cheer_left_open_1789319263232.jpg'),
  path.join(artifactDir, 'cup_cheer_center_open_1789319523868.jpg'),
  path.join(artifactDir, 'cup_cheer_right_open_1789319419255.jpg'),
];

async function findBBox(imgFile) {
  const { data, info } = await sharp(imgFile).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  let minX = width, maxX = 0, minY = height, maxY = 0;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r < 245 || g < 245 || b < 245) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log(`${path.basename(imgFile)}: minX=${minX}, maxX=${maxX}, minY=${minY}, maxY=${maxY}, w=${maxX-minX}, h=${maxY-minY}`);
  
  // Sample inside the cup
  const midX = Math.floor((minX + maxX) / 2);
  const midY = Math.floor(minY + (maxY - minY) * 0.7);
  const mIdx = (midY * width + midX) * 3;
  console.log(`Sample inside cup (${midX}, ${midY}):`, data[mIdx], data[mIdx+1], data[mIdx+2]);
}

async function run() {
  for (const f of files) {
    await findBBox(f);
  }
}

run();
