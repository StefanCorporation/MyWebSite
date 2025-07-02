
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

