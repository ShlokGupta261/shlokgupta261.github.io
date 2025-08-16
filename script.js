document.addEventListener('DOMContentLoaded', () => {

    // --- CURSOR FOLLOWER ---
    const cursorFollower = document.querySelector('.cursor-follower');
    window.addEventListener('mousemove', e => {
        cursorFollower.style.top = e.pageY + 'px';
        cursorFollower.style.left = e.pageX + 'px';
    });

    // --- ANIMATED CANVAS BACKGROUND ---
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 5) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(0, 174, 239, 0.3)';
            if(Math.random() > 0.5) color = 'rgba(157, 206, 0, 0.3)';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }
    
    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    });

    // --- TYPING EFFECT ---
    const roles = ["Information Security Analyst...", "Security Compliance Expert...", "Risk Management Consultant...", "Cybersecurity Engineer..."];
    let roleIndex = 0;
    let charIndex = 0;
    const typingElement = document.getElementById('typing-effect');
    
    function type() {
        if (!typingElement) return;
        let currentRole = roles[roleIndex];
        let typeSpeed = 100;
        
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentRole.length) {
             setTimeout(() => {
                let eraseInterval = setInterval(() => {
                    typingElement.textContent = currentRole.substring(0, charIndex - 1);
                    charIndex--;
                    if(charIndex === 0) {
                        clearInterval(eraseInterval);
                        roleIndex = (roleIndex + 1) % roles.length;
                        setTimeout(type, 500);
                    }
                }, 50);
            }, 2000);
        } else {
             setTimeout(type, typeSpeed);
        }
    }
    setTimeout(type, 500);

    // --- EXPERIENCE ACCORDION ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            header.parentElement.classList.toggle('active');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- INTERSECTION OBSERVER ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('skill-bar')) {
                    const barFill = entry.target.querySelector('.bar-fill');
                    if(barFill) barFill.style.width = barFill.dataset.percent + '%';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll, .skill-bar').forEach(el => observer.observe(el));
});
