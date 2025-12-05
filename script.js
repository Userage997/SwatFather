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
            this.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.6), 0 0 70px rgba(255, 215, 0, 0.3)';
            this.style.transform = 'translateY(-20px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.transform = '';
        });
    });
    
    // Анимация текста с градиентом
    const nicknameElement = document.querySelector('.nickname');
    if (nicknameElement) {
        let hue = 45; // Начальный оттенок золотого
        
        function updateGradient() {
            hue = (hue + 0.2) % 360;
            nicknameElement.style.background = `linear-gradient(45deg, 
                hsl(${hue}, 100%, 60%), 
                hsl(${(hue + 15) % 360}, 100%, 60%), 
                hsl(${(hue + 30) % 360}, 100%, 60%),
                hsl(${(hue + 15) % 360}, 100%, 60%),
                hsl(${hue}, 100%, 60%))`;
            nicknameElement.style.backgroundSize = '300% 300%';
            nicknameElement.style.webkitBackgroundClip = 'text';
            nicknameElement.style.webkitTextFillColor = 'transparent';
            requestAnimationFrame(updateGradient);
        }
        
        // Запуск анимации только если пользователь не использует экономный режим
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            updateGradient();
        }
    }
    
    // Добавляем частицы на фон - ЕЩЕ БОЛЬШЕ ЧАСТИЦ
    createParticles();
    
    function createParticles() {
        const animatedBg = document.querySelector('.animated-bg');
        if (!animatedBg) return;
        
        // Создаем 40 частиц
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Случайные параметры
            const size = Math.random() * 6 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 20 + 20;
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Цвет частицы (золотые оттенки)
            const hue = Math.random() * 30 + 35; // 35-65 золотой диапазон
            const color = `hsla(${hue}, 100%, 60%, ${opacity})`;
            
            // Устанавливаем стили
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.zIndex = '-1';
            particle.style.boxShadow = `0 0 ${size*4}px ${color}`;
            particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
            
            // Добавляем частицу
            animatedBg.appendChild(particle);
        }
        
        // Добавляем звезды (мелкие статические точки) - БОЛЬШЕ ЗВЕЗД
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Случайные параметры
            const size = Math.random() * 3 + 0.5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 6 + 3;
            const opacity = Math.random() * 0.8 + 0.2;
            
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
        
        // Добавляем пыль/туман
        for (let i = 0; i < 30; i++) {
            const dust = document.createElement('div');
            dust.className = 'dust';
            
            // Случайные параметры
            const size = Math.random() * 100 + 50;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 40 + 30;
            const opacity = Math.random() * 0.03 + 0.01;
            
            // Устанавливаем стили
            dust.style.width = `${size}px`;
            dust.style.height = `${size}px`;
            dust.style.left = `${posX}%`;
            dust.style.top = `${posY}%`;
            dust.style.background = `radial-gradient(circle, rgba(255,255,255,${opacity}) 0%, transparent 70%)`;
            dust.style.borderRadius = '50%';
            dust.style.position = 'absolute';
            dust.style.zIndex = '-1';
            dust.style.filter = 'blur(20px)';
            dust.style.animation = `dustFloat ${duration}s ease-in-out ${delay}s infinite`;
            
            // Добавляем пыль
            animatedBg.appendChild(dust);
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
                    opacity: 0.9;
                }
                90% {
                    opacity: 0.9;
                }
                100% {
                    transform: translate(${Math.random() * 200 - 100}px, -120vh) scale(0.3);
                    opacity: 0;
                }
            }
            
            @keyframes twinkle {
                0%, 100% {
                    opacity: 0.2;
                    transform: scale(1);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.5);
                }
            }
            
            @keyframes dustFloat {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.01;
                }
                25% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
                    opacity: 0.03;
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8);
                    opacity: 0.02;
                }
                75% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
                    opacity: 0.04;
                }
                100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.01;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Имитация загрузки новых проектов
    setTimeout(() => {
        const dots = document.querySelectorAll('.pulse-dots span');
        dots.forEach(dot => {
            dot.style.animation = 'pulse 2s infinite';
        });
    }, 1000);
    
    // Добавляем эффект параллакса для фона при движении мыши
    let mouseX = 0, mouseY = 0;
    let rafId = null;
    
    function updateParallax() {
        const bg = document.querySelector('.animated-bg');
        const floatElements = document.querySelectorAll('.floating-element, .cross, .holy-symbol');
        
        if (bg) {
            const moveX = mouseX * 0.5;
            const moveY = mouseY * 0.5;
            bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        
        floatElements.forEach((el, index) => {
            const depth = 0.1 + (index % 10) * 0.05;
            const moveX = mouseX * depth * 0.5;
            const moveY = mouseY * depth * 0.5;
            el.style.transform = `translate(${moveX}px, ${moveY}px) ${el.style.transform ? el.style.transform.split(' ').slice(2).join(' ') : ''}`;
        });
        
        rafId = requestAnimationFrame(updateParallax);
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 40;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 40;
        
        if (!rafId) {
            updateParallax();
        }
    });
    
    // Запускаем параллакс даже без движения мыши
    updateParallax();
    
    // Добавляем интерактивность при наведении на фигуру
    const christFigure = document.querySelector('.christ-figure');
    if (christFigure) {
        christFigure.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2)';
            this.style.transform = 'scale(2.2)';
        });
        
        christFigure.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
            this.style.transform = 'scale(2.1)';
        });
    }
    
    // Добавляем звуковой эффект при нажатии на кнопки (опционально, можно закомментировать)
    const buttonsAll = document.querySelectorAll('.btn, .back-button, .link-card, .project-link');
    buttonsAll.forEach(button => {
        button.addEventListener('click', function() {
            // Создаем элемент аудио для звукового эффекта
            const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
            // Просто заглушка, в реальном проекте можно добавить реальный звук
        });
    });
});
