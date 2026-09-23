import sharp from 'sharp';

async function createPerfectCutouts() {
  const originalPath = 'public/assets/hero-coffee-splash.jpg';

  // --------------------------------------------------------------------------
  // 1. LEFT CUP (Takeaway cup leaning slightly right with lid)
  // --------------------------------------------------------------------------
  const leftCrop = await sharp(originalPath)
    .extract({ left: 60, top: 310, width: 380, height: 440 })
    .toBuffer();

  // SVG mask in local coordinates (origin at left: 60, top: 310)
  const leftMask = `
  <svg width="380" height="440" xmlns="http://www.w3.org/2000/svg">
    <path d="
      M 48,82
      C 100,45 220,10 305,28
      C 325,32 328,45 320,58
      L 290,66
      L 358,290
      C 350,315 325,335 295,348
      L 225,380
      C 200,388 185,380 178,360
      L 62,106
      C 45,98 42,88 48,82
      Z
    " fill="white" />
  </svg>`;

  await sharp(leftCrop)
    .ensureAlpha()
    .composite([{ input: Buffer.from(leftMask), blend: 'dest-in' }])
    .png()
    .toFile('public/assets/cup-cheer-left.png');

  // --------------------------------------------------------------------------
  // 2. RIGHT CUP (Takeaway cup leaning slightly left with lid)
  // --------------------------------------------------------------------------
  const rightCrop = await sharp(originalPath)
    .extract({ left: 880, top: 90, width: 440, height: 570 })
    .toBuffer();

  // Local coordinates (origin at left: 880, top: 90)
  const rightMask = `
  <svg width="440" height="570" xmlns="http://www.w3.org/2000/svg">
    <path d="
      M 140,48
      C 180,18 300,10 370,45
      C 395,58 395,78 385,92
      L 350,105
      L 270,440
      C 260,465 230,480 200,485
      L 125,482
      C 95,475 80,455 78,435
      L 45,115
      C 35,95 42,75 60,65
      L 140,48
      Z
    " fill="white" />
  </svg>`;

  await sharp(rightCrop)
    .ensureAlpha()
    .composite([{ input: Buffer.from(rightMask), blend: 'dest-in' }])
    .png()
    .toFile('public/assets/cup-cheer-right.png');

  // --------------------------------------------------------------------------
  // 3. CENTER CUP (Splashing cup with dynamic liquid crown and flying droplets)
  // --------------------------------------------------------------------------
  // For center cup, we crop left: 340, top: 40, width: 580, height: 720
  // Since the splash has organic liquid droplets, we use an envelope mask
  // plus luminance thresholding to preserve all flying droplets cleanly!
  const centerCrop = await sharp(originalPath)
    .extract({ left: 340, top: 40, width: 580, height: 720 })
    .toBuffer();

  const centerEnvelope = `
  <svg width="580" height="720" xmlns="http://www.w3.org/2000/svg">
    <path d="
      M 120,240
      C 80,180 140,80 280,30
      C 350,5 440,20 480,100
      C 520,160 550,220 530,290
      L 470,330
      L 400,620
      C 380,660 340,680 290,685
      L 210,680
      C 160,670 140,640 145,600
      L 180,350
      L 120,240
      Z
    " fill="white" />
  </svg>`;

  // First mask to the envelope of cup + splash
  const maskedCenter = await sharp(centerCrop)
    .ensureAlpha()
    .composite([{ input: Buffer.from(centerEnvelope), blend: 'dest-in' }])
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = maskedCenter.info;
  const data = Buffer.from(maskedCenter.data);

  // Soften dark background pixels within the splash envelope
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      const curAlpha = data[idx+3];

      if (curAlpha > 0) {
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        // In the cup body region (y > 280), keep solid
        if (y > 280 && x > 150 && x < 460) {
          // Inside cup body, fully opaque
          data[idx+3] = 255;
        } else {
          // In the splash droplet region, alpha scales with splash brightness
          if (lum < 35) {
            data[idx+3] = 0; // remove dark background between droplets
          } else if (lum < 65) {
            data[idx+3] = Math.round(((lum - 35) / 30) * 255);
          }
        }
      }
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile('public/assets/cup-cheer-center.png');

  console.log('Successfully created all 3 perfect cutouts!');
}

createPerfectCutouts().catch(console.error);
