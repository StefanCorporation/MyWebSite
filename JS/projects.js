document.querySelectorAll('.project-row').forEach(project => {
    const wrapper = project.querySelector('.project-image-wrapper');
    const canvas = wrapper.querySelector('.project-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawRain() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    let interval;

    function typeText(container, text, i = 0) {
        const typed = container.querySelector('.typed-text');
        if (i < text.length) {
            typed.textContent += text.charAt(i);
            setTimeout(() => typeText(container, text, i + 1), 30);
        }
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                interval = setInterval(drawRain, 50);
                setTimeout(() => {
                    clearInterval(interval);
                    canvas.style.display = 'none';

                    const img = project.querySelector('.project-img');
                    const textBlock = project.querySelector('.project-text');
                    const src = textBlock.getAttribute('data-src');

                    img.classList.add('visible');
                    textBlock.classList.add('visible');

                    if (src) {
                        // Fetch text from external .txt file
                        fetch(src)
                            .then(response => response.text())
                            .then(fullText => {
                                typeText(textBlock, fullText);
                            })
                            .catch(error => {
                                console.error('Failed to load description:', error);
                                typeText(textBlock, 'Description failed to load.');
                            });
                    } else {
                        // Fallback: use inline data-text if available
                        const fallbackText = textBlock.getAttribute('data-text') || 'No description available.';
                        typeText(textBlock, fallbackText);
                    }

                }, 3000);
                observer.unobserve(project);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(project);
});
