const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const inputPath = path.join(__dirname, '..', 'public', 'assets', 'portrait.png');
const outputPath = path.join(__dirname, '..', 'public', 'assets', 'portrait-cutout.png');

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    const width = this.width;
    const height = this.height;
    const data = this.data;

    const idx = (x, y) => (y * width + x) * 4;
    const visited = new Uint8Array(width * height);
    const queue = [];

    // Background threshold is very strict: r, g, b <= 3
    const isStrictBg = (x, y) => {
      const i = idx(x, y);
      return data[i] <= 3 && data[i + 1] <= 3 && data[i + 2] <= 3;
    };

    // Border scan
    for (let x = 0; x < width; x++) {
      if (isStrictBg(x, 0)) {
        visited[0 * width + x] = 1;
        queue.push([x, 0]);
      }
      if (isStrictBg(x, height - 1) && (x < width * 0.08 || x > width * 0.92)) {
        visited[(height - 1) * width + x] = 1;
        queue.push([x, height - 1]);
      }
    }
    for (let y = 0; y < height; y++) {
      if (isStrictBg(0, y)) {
        visited[y * width + 0] = 1;
        queue.push([0, y]);
      }
      if (isStrictBg(width - 1, y)) {
        visited[y * width + (width - 1)] = 1;
        queue.push([width - 1, y]);
      }
    }

    // BFS
    let head = 0;
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (head < queue.length) {
      const [cx, cy] = queue[head++];
      for (let k = 0; k < 4; k++) {
        const nx = cx + dx[k];
        const ny = cy + dy[k];
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIndex = ny * width + nx;
          if (!visited[nIndex]) {
            const i = idx(nx, ny);
            if (data[i] <= 3 && data[i + 1] <= 3 && data[i + 2] <= 3) {
              visited[nIndex] = 1;
              queue.push([nx, ny]);
            }
          }
        }
      }
    }

    // Apply alpha
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const nIndex = y * width + x;
        const i = idx(x, y);
        if (visited[nIndex]) {
          data[i + 3] = 0;
        } else {
          // Check edge feathering
          let hasBg = false;
          for (let k = 0; k < 4; k++) {
            const nx = x + dx[k];
            const ny = y + dy[k];
            if (nx >= 0 && nx < width && ny >= 0 && ny < height && visited[ny * width + nx]) {
              hasBg = true;
              break;
            }
          }
          if (hasBg) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (avg < 15) {
              data[i + 3] = Math.min(255, Math.max(0, Math.floor((avg / 15) * 255)));
            }
          }
        }
      }
    }

    this.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
      console.log('Saved refined cutout to', outputPath);
    });
  });
