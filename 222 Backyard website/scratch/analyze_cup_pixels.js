import sharp from 'sharp';

async function testSegmentation() {
  const left = await sharp('public/assets/cup-left-raw.png').raw().toBuffer({ resolveWithObject: true });
  console.log('Left raw dimensions:', left.info.width, left.info.height, 'channels:', left.info.channels);

  // Sample corner pixels (background beans) vs cup center pixels
  const w = left.info.width;
  const h = left.info.height;
  const data = left.data;

  function getPixel(x, y) {
    const idx = (y * w + x) * left.info.channels;
    return [data[idx], data[idx+1], data[idx+2]];
  }

  console.log('Top-left (bg):', getPixel(10, 10));
  console.log('Bottom-left (bg):', getPixel(10, h - 10));
  console.log('Cup body center:', getPixel(Math.floor(w/2), Math.floor(h/2)));
  console.log('Cup lid:', getPixel(Math.floor(w/2), 60));
}

testSegmentation().catch(console.error);
