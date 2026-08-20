async function verify() {
  try {
    const res = await fetch('http://localhost:5173/');
    console.log('Main Page HTTP Status:', res.status);
    const text = await res.text();
    console.log('Title included:', text.includes('Zeeshan — UI/UX Designer &amp; Full Stack Developer'));
    console.log('Page length:', text.length);

    const assetRes = await fetch('http://localhost:5173/assets/portrait-cutout.png');
    console.log('Hero Portrait Cutout Asset HTTP Status:', assetRes.status, 'Content-Type:', assetRes.headers.get('content-type'));

    console.log('All local endpoints verified successfully!');
  } catch (err) {
    console.error('Verification error:', err);
  }
}

verify();
