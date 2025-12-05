document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса
    const screens = document.querySelectorAll('.screen');
    const buttons = document.querySelectorAll('[data-target]');
    const backButtons = document.querySelectorAll('.back-button');
    
    // Инициализация
    let currentScreen = 'main';
    
    // Функция переключения экранов
    function switchScreen(screenId) {
        // Скрыть все экраны
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Показать целевой экран
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            currentScreen = screenId;
            
            // Плавная прокрутка к верху экрана
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    // Обработчики для кнопок навигации
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            switchScreen(target);
        });
    });
    
    // Обработчики для кнопок "Назад"
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            switchScreen('main');
        });
    });
    
    // Анимация появления элементов при загрузке
    const animatedElements = document.querySelectorAll('.nickname-card, .subtitle, .cta-buttons');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('animate-on-load');
    });
    
    // Плавный скролл для подсказки
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
        scrollHint.addEventListener('click', function() {
            document.getElementById('projects').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Добавление эффекта свечения при наведении на карточки
    const linkCards = document.querySelectorAll('.link-card:not(.coming-soon-link)');
    
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 215, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Анимация текста с градиентом
    const nicknameElement = document.querySelector('.nickname');
    if (nicknameElement) {
        let hue = 45; // Начальный оттенок золотого
        
        function updateGradient() {
            hue = (hue + 0.5) % 360;
            nicknameElement.style.background = `linear-gradient(45deg, 
                hsl(${hue}, 100%, 50%), 
                hsl(${(hue + 30) % 360}, 100%, 50%), 
                hsl(${(hue + 60) % 360}, 100%, 50%))`;
            nicknameElement.style.webkitBackgroundClip = 'text';
            nicknameElement.style.webkitTextFillColor = 'transparent';
            requestAnimationFrame(updateGradient);
        }
        
        // Запуск анимации только если пользователь не использует экономный режим
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            updateGradient();
        }
    }
    
    // Добавляем частицы на фон (опционально)
    createParticles();
    
    function createParticles() {
        const particlesContainer = document.querySelector('.animated-bg');
        if (!particlesContainer) return;
        
        // Создаем 15 частиц
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Случайные параметры
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            
            // Устанавливаем стили
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.background = 'rgba(255, 215, 0, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
            
            // Добавляем частицу
            particlesContainer.appendChild(particle);
        }
        
        // Добавляем стили для анимации частиц
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(20px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Имитация загрузки новых проектов (для демонстрации)
    setTimeout(() => {
        const dots = document.querySelectorAll('.pulse-dots span');
        dots.forEach(dot => {
            dot.style.animation = 'pulse 1.5s infinite';
        });
    }, 1000);
});
