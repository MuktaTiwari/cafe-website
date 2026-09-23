import sharp from 'sharp';

async function maskLeftCup() {
  // Let's crop Left Cup from hero-coffee-splash.jpg with exact padding
  // left: 40, top: 300, width: 440, height: 460
  const leftCropped = await sharp('public/assets/hero-coffee-splash.jpg')
    .extract({ left: 40, top: 300, width: 440, height: 460 })
    .toBuffer();

  // Create an SVG mask for the left cup (lid + body + bottom)
  // The left cup is tilted ~ 15 degrees
  const leftSvgMask = `
  <svg width="440" height="460" xmlns="http://www.w3.org/2000/svg">
    <path d="
      M 75,95
      C 120,40 240,10 325,25
      C 340,28 345,35 340,48
      L 315,55
      L 380,305
      C 375,325 350,340 330,345
      L 240,380
      C 220,385 205,375 200,360
      L 70,110
      C 60,105 65,98 75,95
      Z
    " fill="white" />
  </svg>`;

  await sharp(leftCropped)
    .ensureAlpha()
    .composite([{
      input: Buffer.from(leftSvgMask),
      blend: 'dest-in'
    }])
    .png()
    .toFile('public/assets/cup-test-left.png');

  console.log('Left cup test masked');
}

maskLeftCup().catch(console.error);
