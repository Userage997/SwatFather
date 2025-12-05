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
            document.getElementById('projects').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Простые частицы для фона
    function createSimpleParticles() {
        const bg = document.querySelector('.bg-details');
        if (!bg) return;
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(255, 215, 0, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.zIndex = '-1';
            particle.style.animation = `floatSimple ${Math.random() * 20 + 10}s linear infinite`;
            bg.appendChild(particle);
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatSimple {
                0% { transform: translateY(0) translateX(0); opacity: 0; }
                10% { opacity: 0.5; }
                90% { opacity: 0.5; }
                100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    createSimpleParticles();
});
