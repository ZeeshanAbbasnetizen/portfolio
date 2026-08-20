const fs = require('fs');
const path = require('path');

async function fetchImage() {
  const rawUrl = 'https://raw.githubusercontent.com/ZeeshanAbbasnetizen/UET/main/download.png';
  try {
    console.log('Fetching', rawUrl);
    const res = await fetch(rawUrl);
    console.log('Status:', res.status, 'Content-Type:', res.headers.get('content-type'));
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      const dest = path.join(__dirname, '..', 'public', 'assets', 'hero-uet.png');
      fs.writeFileSync(dest, buffer);
      console.log('Saved to', dest, 'Size:', buffer.length);
    }
  } catch (e) {
    console.error('Error fetching image:', e);
  }
}

fetchImage();
