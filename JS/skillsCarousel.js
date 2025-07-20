// Initialize Swiper
const swiper = new Swiper('.mySwiper', {
    slidesPerView: 7, // Adjust based on design
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: true,
});

// Digital Rain Effect
const canvases = document.querySelectorAll('.matrix-canvas');
canvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match slide
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    // Initialize drops
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
    
    // Animate rain
    const animate = () => {
        draw();
        if (canvas.style.opacity > 0) {
            canvas.style.opacity = (canvas.style.opacity || 1) - 0.01;
        } else {
            canvas.style.display = 'none'; // Hide canvas
            const img = canvas.parentElement.querySelector('.skill-img');
            if (img) img.classList.add('visible'); // Reveal icon
            clearInterval(animationInterval);
        }
    };
    
    canvas.style.opacity = 1;
    const animationInterval = setInterval(animate, 50);
});

// Resize canvases on window resize
window.addEventListener('resize', () => {
    canvases.forEach(canvas => {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    });
});