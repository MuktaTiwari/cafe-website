import sharp from 'sharp';
import path from 'path';

const artifactDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\a5c3cba3-a7d6-4f7e-9a68-3928fffcb091';

const files = [
  path.join(artifactDir, 'cup_cheer_left_open_1789319263232.jpg'),
  path.join(artifactDir, 'cup_cheer_center_open_1789319523868.jpg'),
  path.join(artifactDir, 'cup_cheer_right_open_1789319419255.jpg'),
];

async function inspect(imgFile) {
  const { data, info } = await sharp(imgFile).raw().toBuffer({ resolveWithObject: true });
  console.log(`\nInspecting ${path.basename(imgFile)}: ${info.width}x${info.height}`);
  
  // Sample corner (0, 0)
  console.log('Corner (0,0):', data[0], data[1], data[2]);
  // Sample (10, 10)
  const idx10 = (10 * info.width + 10) * 3;
  console.log('Sample (10,10):', data[idx10], data[idx10+1], data[idx10+2]);

  // Center bottom
  const bIdx = ((info.height - 30) * info.width + Math.floor(info.width / 2)) * 3;
  console.log('Center bottom (cup body):', data[bIdx], data[bIdx+1], data[bIdx+2]);
}

async function run() {
  for (const f of files) {
    await inspect(f);
  }
}

run();
