document.addEventListener('DOMContentLoaded', () => {

    // --- TYPING EFFECT ---
    const roles = ["Security Compliance Expert", "Risk Management Specialist", "Cybersecurity Specialist"];
    let roleIndex = 0;
    let charIndex = 0;
    let isErasing = false;
    const typingElement = document.getElementById('typing-effect');
    
    function type() {
        // Stop if element doesn't exist
        if (!typingElement) return;

        const currentRole = roles[roleIndex];
        if (isErasing) {
            // Erase text
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isErasing = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 500); // Pause before typing next role
                return;
            }
        } else {
            // Type text
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                isErasing = true;
                setTimeout(type, 2000); // Pause after typing role
                return;
            }
        }
        
        const typingSpeed = isErasing ? 50 : 100;
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(type, 500);
    

    // --- INTERSECTION OBSERVER for animations on scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars when they become visible
                if (entry.target.classList.contains('skill-bar')) {
                    const barFill = entry.target.querySelector('.bar-fill');
                    if(barFill) {
                       barFill.style.width = barFill.dataset.percent + '%';
                    }
                }
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1 
    });

    // Observe all elements that need animation
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll, .skill-bar');
    elementsToAnimate.forEach(el => observer.observe(el));
});
