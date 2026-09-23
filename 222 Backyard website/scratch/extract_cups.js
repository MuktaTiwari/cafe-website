import sharp from 'sharp';
import fs from 'fs';

async function extractCups() {
  const imagePath = 'public/assets/hero-coffee-splash.jpg';
  const metadata = await sharp(imagePath).metadata();
  console.log('Image dimensions:', metadata.width, metadata.height);

  // 1. Crop bounding boxes for each of the 3 cups
  // Left Cup: around x=50, y=320, width=420, height=440
  // Center Cup: around x=330, y=50, width=540, height=710
  // Right Cup: around x=700, y=120, width=620, height=580

  await sharp(imagePath)
    .extract({ left: 60, top: 320, width: 420, height: 440 })
    .toFile('public/assets/cup-left-raw.png');

  await sharp(imagePath)
    .extract({ left: 340, top: 50, width: 540, height: 710 })
    .toFile('public/assets/cup-center-raw.png');

  await sharp(imagePath)
    .extract({ left: 700, top: 110, width: 620, height: 600 })
    .toFile('public/assets/cup-right-raw.png');

  console.log('Raw crops saved successfully.');
}

extractCups().catch(console.error);
