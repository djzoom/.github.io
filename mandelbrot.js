const canvas = document.getElementById('mandelbrotCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const maxIterations = 1000;
const zoomFactor = 1.01;

let offsetX = canvas.width / 2;
let offsetY = canvas.height / 2;
let zoom = 200;

function mandelbrot(x, y) {
    let real = x;
    let imaginary = y;
    let n = 0;

    for (let i = 0; i < maxIterations; i++) {
        let r2 = real * real;
        let i2 = imaginary * imaginary;
        if (r2 + i2 > 4) break;

        imaginary = 2 * real * imaginary + y;
        real = r2 - i2 + x;

        n++;
    }

    return n;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            let a = (x - offsetX) / zoom;
            let b = (y - offsetY) / zoom;

            let m = mandelbrot(a, b);
            let color = m === maxIterations ? 'black' : 'white';

            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        }
    }

    zoom *= zoomFactor;
    requestAnimationFrame(draw);
}

draw();
