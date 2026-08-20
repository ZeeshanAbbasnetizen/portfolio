const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const inputPath = 'C:/Users/Apple/.gemini/antigravity-ide/brain/bf504e17-9cb3-4a4f-88e3-e7b82b451623/.user_uploaded/media_1787212897552.png';
const outputPath = path.join(__dirname, '..', 'public', 'assets', 'hero-portrait-clean.png');
const altOutputPath = path.join(__dirname, '..', 'public', 'assets', 'portrait-cutout.png');

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    const width = this.width;
    const height = this.height;
    const data = this.data;

    const idx = (x, y) => (y * width + x) * 4;
    const isBg = new Uint8Array(width * height);
    const queue = [];

    // Background test: very dark pixel
    const isNearBlack = (x, y) => {
      const i = idx(x, y);
      return data[i] <= 4 && data[i + 1] <= 4 && data[i + 2] <= 4;
    };

    // Seed from all 4 borders
    for (let x = 0; x < width; x++) {
      if (isNearBlack(x, 0)) {
        isBg[0 * width + x] = 1;
        queue.push([x, 0]);
      }
      if (isNearBlack(x, height - 1) && (x < width * 0.1 || x > width * 0.9)) {
        isBg[(height - 1) * width + x] = 1;
        queue.push([x, height - 1]);
      }
    }
    for (let y = 0; y < height; y++) {
      if (isNearBlack(0, y)) {
        isBg[y * width + 0] = 1;
        queue.push([0, y]);
      }
      if (isNearBlack(width - 1, y)) {
        isBg[y * width + (width - 1)] = 1;
        queue.push([width - 1, y]);
      }
    }

    // BFS Flood Fill for contiguous background
    let head = 0;
    const dx = [-1, 1, 0, 0, -1, -1, 1, 1];
    const dy = [0, 0, -1, 1, -1, 1, -1, 1];

    while (head < queue.length) {
      const [cx, cy] = queue[head++];
      for (let k = 0; k < 8; k++) {
        const nx = cx + dx[k];
        const ny = cy + dy[k];
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIndex = ny * width + nx;
          if (!isBg[nIndex]) {
            const i = idx(nx, ny);
            if (data[i] <= 4 && data[i + 1] <= 4 && data[i + 2] <= 4) {
              isBg[nIndex] = 1;
              queue.push([nx, ny]);
            }
          }
        }
      }
    }

    // Also remove stray isolated pixels in the background (noise filtering)
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width; x++) {
        const nIndex = y * width + x;
        if (!isBg[nIndex]) {
          const i = idx(x, y);
          const maxVal = Math.max(data[i], data[i + 1], data[i + 2]);
          // Check how many 8-neighbors are background
          let bgCount = 0;
          for (let k = 0; k < 8; k++) {
            const nx = x + dx[k];
            const ny = y + dy[k];
            if (isBg[ny * width + nx]) bgCount++;
          }
          // If surrounded by background and very dim, it's noise
          if (bgCount >= 6 && maxVal < 18) {
            isBg[nIndex] = 1;
          }
        }
      }
    }

    // Apply alpha with smooth anti-aliased edge feathering
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const nIndex = y * width + x;
        const i = idx(x, y);
        if (isBg[nIndex]) {
          data[i + 3] = 0; // completely transparent
        } else {
          // Check distance to background for soft edge
          let minBgDist = 999;
          for (let dy1 = -2; dy1 <= 2; dy1++) {
            for (let dx1 = -2; dx1 <= 2; dx1++) {
              const nx = x + dx1;
              const ny = y + dy1;
              if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                if (isBg[ny * width + nx]) {
                  const d = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                  if (d < minBgDist) minBgDist = d;
                }
              }
            }
          }

          if (minBgDist <= 1.5) {
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (brightness < 25) {
              const alphaFactor = Math.min(1, Math.max(0, brightness / 25));
              data[i + 3] = Math.floor(alphaFactor * 255);
            }
          }
        }
      }
    }

    // Save to both files
    this.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
      fs.copyFileSync(outputPath, altOutputPath);
      console.log('Successfully saved clean transparent cutout to', outputPath, 'and', altOutputPath);
    });
  });
