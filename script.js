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
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 50px rgba(255, 215, 0, 0.25)';
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
            hue = (hue + 0.3) % 360;
            nicknameElement.style.background = `linear-gradient(45deg, 
                hsl(${hue}, 100%, 50%), 
                hsl(${(hue + 20) % 360}, 100%, 50%), 
                hsl(${(hue + 40) % 360}, 100%, 50%),
                hsl(${hue}, 100%, 50%))`;
            nicknameElement.style.backgroundSize = '200% 200%';
            nicknameElement.style.webkitBackgroundClip = 'text';
            nicknameElement.style.webkitTextFillColor = 'transparent';
            requestAnimationFrame(updateGradient);
        }
        
        // Запуск анимации только если пользователь не использует экономный режим
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            updateGradient();
        }
    }
    
    // Добавляем частицы на фон
    createParticles();
    
    function createParticles() {
        const animatedBg = document.querySelector('.animated-bg');
        if (!animatedBg) return;
        
        // Создаем 25 частиц
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Случайные параметры
            const size = Math.random() * 5 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 7;
            const duration = Math.random() * 15 + 15;
            const opacity = Math.random() * 0.4 + 0.1;
            
            // Цвет частицы (золотые оттенки)
            const hue = Math.random() * 20 + 40; // 40-60 золотой диапазон
            const color = `hsla(${hue}, 100%, 50%, ${opacity})`;
            
            // Устанавливаем стили
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.zIndex = '-1';
            particle.style.boxShadow = `0 0 ${size*3}px ${color}`;
            particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
            
            // Добавляем частицу
            animatedBg.appendChild(particle);
        }
        
        // Добавляем звезды (мелкие статические точки)
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Случайные параметры
            const size = Math.random() * 2 + 0.5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = Math.random() * 4 + 2;
            const opacity = Math.random() * 0.7 + 0.3;
            
            // Устанавливаем стили
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${posX}%`;
            star.style.top = `${posY}%`;
            star.style.background = 'white';
            star.style.borderRadius = '50%';
            star.style.position = 'absolute';
            star.style.zIndex = '-1';
            star.style.opacity = opacity;
            star.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite`;
            
            // Добавляем звезду
            animatedBg.appendChild(star);
        }
        
        // Добавляем стили для анимации частиц
        const style = document.createElement('style');
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
            
            @keyframes twinkle {
                0%, 100% {
                    opacity: 0.3;
                    transform: scale(1);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.2);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Имитация загрузки новых проектов
    setTimeout(() => {
        const dots = document.querySelectorAll('.pulse-dots span');
        dots.forEach(dot => {
            dot.style.animation = 'pulse 1.5s infinite';
        });
    }, 1000);
    
    // Добавляем эффект параллакса для фона при скролле
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const bg = document.querySelector('.animated-bg');
        if (bg) {
            bg.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        }
    });
});
