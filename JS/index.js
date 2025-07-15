/*Background Symbols*/

const symbols = ['{', '}', '[', ']', '(', ')', '@', '<', '>', '/', 
            '"', '=', ':', ';', '|', '&', '#', '%', '$', '0', '1',
             '0', '1', 'if', 'else', '{}', '</>', '[]'];
const container = document.querySelector('.matrix-bg');

for (let i = 0; i < 150; i++) {
  const span = document.createElement('span');
  span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  span.style.left = Math.random() * 100 + 'vw';
  span.style.top = Math.random() * 100 - 120 + 'vh'; // starts above screen
  span.style.fontSize = Math.random() * 20 + 14 + 'px';
  span.style.animationDuration = (Math.random() * 4 + 6) + 's';
  container.appendChild(span);
}



/*Text typing*/

const text = "I am Stefan, a web developer...";
const typingElement = document.getElementById("typing");
let index = 0;

function type() {
  if (index < text.length) {
    typingElement.textContent += text.charAt(index);
    index++;
    setTimeout(type, 100); // Typing speed
  }
}

window.onload = type;





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