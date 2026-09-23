import sharp from 'sharp';

async function scanAllCups() {
  const original = await sharp('public/assets/hero-coffee-splash.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const raw = original.data;

  function scanRange(name, xStart, xEnd, yStart, yEnd, threshold = 60) {
    console.log(`=== ${name} ===`);
    const points = [];
    for (let y = yStart; y <= yEnd; y += 20) {
      let minX = -1;
      let maxX = -1;
      for (let x = xStart; x <= xEnd; x++) {
        const idx = (y * 1376 + x) * 3;
        const lum = 0.299 * raw[idx] + 0.587 * raw[idx+1] + 0.114 * raw[idx+2];
        if (lum > threshold) {
          if (minX === -1) minX = x;
          maxX = x;
        }
      }
      if (minX !== -1 && maxX - minX > 30) {
        points.push({ y, minX, maxX });
      }
    }
    console.log(points);
  }

  scanRange('Left Cup', 80, 440, 320, 720, 60);
  scanRange('Right Cup', 880, 1340, 100, 650, 60);
}

scanAllCups().catch(console.error);
