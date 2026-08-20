const fs = require('fs');
const path = require('path');

const srcPath = 'C:/Users/Apple/.gemini/antigravity-ide/brain/bf504e17-9cb3-4a4f-88e3-e7b82b451623/.user_uploaded/media_1787210797894.png';
const publicDir = path.join(__dirname, '..', 'public', 'assets');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy original
const destOriginal = path.join(publicDir, 'portrait.png');
fs.copyFileSync(srcPath, destOriginal);
console.log('Copied raw image to', destOriginal);
