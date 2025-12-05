document.addEventListener('DOMContentLoaded', function() {
    const screens = document.querySelectorAll('.screen');
    const buttons = document.querySelectorAll('[data-target]');
    const backButtons = document.querySelectorAll('.back-button');
    
    function switchScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            switchScreen(target);
        });
    });
    
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            switchScreen('main');
        });
    });
    

    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
        scrollHint.addEventListener('click', function() {
            switchScreen('projects');
        });
    }
    
    function createParticles() {
        const bg = document.querySelector('.bg-details');
        if (!bg) return;
        
        const oldParticles = document.querySelectorAll('.particle');
        oldParticles.forEach(p => p.remove());
        
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 20 + 15;
            
            const types = ['gold', 'white', 'blue'];
            const type = types[Math.floor(Math.random() * types.length)];
            
            let color;
            switch(type) {
                case 'gold':
                    color = `rgba(255, 215, 0, ${Math.random() * 0.3 + 0.1})`;
                    break;
                case 'white':
                    color = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`;
                    break;
                case 'blue':
                    color = `rgba(100, 149, 237, ${Math.random() * 0.2 + 0.05})`;
                    break;
            }
            
            particle.style.position = 'absolute';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
            particle.style.zIndex = '-1';
            particle.style.pointerEvents = 'none';
            
            particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
            
            bg.appendChild(particle);
        }
        
        if (!document.querySelector('#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes floatParticle {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.8;
                    }
                    90% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(${Math.random() * 100 - 50}px, -100vh) scale(0.5);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    createParticles();
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            createParticles();
        }, 250);
    });
    
    if (window.innerWidth <= 768) {
        const particles = document.querySelectorAll('.particle');
        for (let i = 20; i < particles.length; i++) {
            if (particles[i]) {
                particles[i].style.display = 'none';
            }
        }
    }
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
