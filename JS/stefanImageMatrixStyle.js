/*Stefan Image Matrix-Style*/

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
const img = document.getElementById('stefanImg');

canvas.width = 300;
canvas.height = 500;

const symbols2 = '010アイウエカキクケコ';

const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

let revealTime = 3000;

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0f0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = symbols2[Math.floor(Math.random() * symbols2.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.5) drops[i] = 0;
    else drops[i]++;
  }
}

let interval = setInterval(drawMatrix, 50);

setTimeout(() => {
  clearInterval(interval);
  canvas.style.opacity = 0;
  img.style.opacity = 1; 
}, revealTime);