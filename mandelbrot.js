const canvas = document.getElementById('mandelbrot');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const maxIterations = 1000;

function mandelbrot(x, y) {
  let real = x;
  let imag = y;
  for (let n = 0; n < maxIterations; n++) {
    const real2 = real * real - imag * imag + x;
    const imag2 = 2 * real * imag + y;
    real = real2;
    imag = imag2;
    if (real * real + imag * imag > 4) return n / maxIterations;
  }
  return 0;
}

function draw(scale, angle) {
  const offsetX = width / 2;
  const offsetY = height / 2;
  ctx.clearRect(0, 0, width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const newX = (x - offsetX) / scale;
      const newY = (y - offsetY) / scale;
      const rotatedX = newX * Math.cos(angle) - newY * Math.sin(angle);
      const rotatedY = newX * Math.sin(angle) + newY * Math.cos(angle);
      const color = mandelbrot(rotatedX, rotatedY);
      ctx.fillStyle = color === 0 ? 'black' : `hsl(${360 * color}, 100%, 50%)`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

let scale = 200;
let angle = 0;
function animate() {
  draw(scale, angle);
  scale *= 1.01;
  angle += 0.01;
  requestAnimationFrame(animate);
}

animate();
