const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const inputPath = path.join(__dirname, '..', 'public', 'assets', 'portrait.png');

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    console.log('Dimensions:', this.width, 'x', this.height);
    // sample corner pixels
    for (let y = 0; y < 10; y++) {
      let line = '';
      for (let x = 0; x < 10; x++) {
        const idx = (y * this.width + x) * 4;
        line += `(${this.data[idx]},${this.data[idx+1]},${this.data[idx+2]}) `;
      }
      console.log(`y=${y}:`, line);
    }
  });
