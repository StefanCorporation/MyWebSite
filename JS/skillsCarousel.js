// Initialize Swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
    1500: {
        slidesPerView: 6
    }
  }
});


function startDigitalRain() {
    const canvases = document.querySelectorAll('.matrix-canvas');
    canvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');

        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        const animate = () => {
            draw();
            const currentOpacity = parseFloat(canvas.style.opacity || 1);
            if (currentOpacity > 0) {
                canvas.style.opacity = currentOpacity - 0.01;
            } else {
                canvas.style.display = 'none';
                const img = canvas.parentElement.querySelector('.skill-img');
                if (img) img.classList.add('visible');
                clearInterval(animationInterval);
            }
        };

        canvas.style.opacity = 1;
        const animationInterval = setInterval(animate, 50);
    });
}

// Delay rain effect until 6 seconds after page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(startDigitalRain, 6000);
    });
} else {
    setTimeout(startDigitalRain, 6000);
}



// Resize canvases on window resize
window.addEventListener('resize', () => {
    canvases.forEach(canvas => {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    });
});