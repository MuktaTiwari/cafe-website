import sharp from 'sharp';

async function cleanRightCup() {
  const { data, info } = await sharp('public/assets/hero-cup-right.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.from(data);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      // Bottom shadow is below the cup base (y > 830)
      if (y > 830) {
        out[idx + 3] = 0;
      }
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .png()
    .toFile('public/assets/hero-cup-right.png');

  console.log('Right cup shadow trimmed!');
}

cleanRightCup().catch(console.error);
