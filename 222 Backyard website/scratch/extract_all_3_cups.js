import sharp from 'sharp';

async function processCups() {
  const original = 'public/assets/hero-coffee-splash.jpg';

  // Extract Left Cup
  const leftBox = { left: 70, top: 310, width: 400, height: 440 };
  const leftRaw = await sharp(original).extract(leftBox).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  
  // Extract Center Cup (Splash + cup)
  const centerBox = { left: 360, top: 40, width: 560, height: 720 };
  const centerRaw = await sharp(original).extract(centerBox).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  // Extract Right Cup
  const rightBox = { left: 880, top: 90, width: 440, height: 570 };
  const rightRaw = await sharp(original).extract(rightBox).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  // Helper to isolate cup based on luminance & color distance from background beans
  function isolateCup(rawObj, options = {}) {
    const { width, height, channels } = rawObj.info;
    const data = rawObj.data;
    const { 
      minBrightness = 45, 
      highBrightness = 85, 
      cropPadding = 0,
      feather = 2
    } = options;

    const outData = Buffer.from(data);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // Perceived luminance
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;

        // Compute alpha based on luminance and color
        let alpha = 0;
        if (lum > highBrightness) {
          alpha = 255;
        } else if (lum > minBrightness) {
          // Smooth transition
          alpha = Math.round(((lum - minBrightness) / (highBrightness - minBrightness)) * 255);
        } else {
          alpha = 0;
        }

        outData[idx + 3] = alpha;
      }
    }

    return sharp(outData, { raw: { width, height, channels } });
  }

  // Generate Left Cup with transparent bg
  await isolateCup(leftRaw, { minBrightness: 45, highBrightness: 80 })
    .png()
    .toFile('public/assets/cup-cheer-left.png');

  // Generate Center Cup with transparent bg (keep splash droplets)
  await isolateCup(centerRaw, { minBrightness: 38, highBrightness: 75 })
    .png()
    .toFile('public/assets/cup-cheer-center.png');

  // Generate Right Cup with transparent bg
  await isolateCup(rightRaw, { minBrightness: 45, highBrightness: 80 })
    .png()
    .toFile('public/assets/cup-cheer-right.png');

  console.log('All 3 cheering cups extracted successfully!');
}

processCups().catch(console.error);
