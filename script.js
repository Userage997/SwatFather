// Оптимизированная версия скрипта для плавной работы
document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса
    const screens = document.querySelectorAll('.screen');
    const buttons = document.querySelectorAll('[data-target]');
    const backButtons = document.querySelectorAll('.back-button');
    
    // Переключение экранов (оптимизировано)
    function switchScreen(screenId) {
        // Скрыть все экраны
        screens.forEach(screen => {
            screen.style.display = 'none';
            screen.classList.remove('active');
        });
        
        // Показать целевой экран
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.style.display = 'flex';
            // Небольшая задержка для плавности
            requestAnimationFrame(() => {
                targetScreen.classList.add('active');
            });
            
            // Плавная прокрутка к верху
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
    
    // Плавный скролл для подсказки
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
        scrollHint.addEventListener('click', function() {
            const projectsScreen = document.getElementById('projects');
            if (projectsScreen) {
                projectsScreen.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Анимация текста с градиентом (упрощенная)
    const nicknameElement = document.querySelector('.nickname');
    if (nicknameElement) {
        // Используем CSS анимацию вместо requestAnimationFrame для производительности
        nicknameElement.style.animation = 'gradientText 6s ease infinite';
    }
    
    // Простая оптимизация - отключаем тяжелые анимации при потере фокуса
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // При скрытии вкладки можно приостановить анимации
            document.body.style.animationPlayState = 'paused';
        } else {
            document.body.style.animationPlayState = 'running';
        }
    });
    
    // Оптимизация для мобильных устройств
    function optimizeForMobile() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Упрощаем анимации на мобильных
            const animatedElements = document.querySelectorAll('*[style*="animation"], *[style*="transition"]');
            animatedElements.forEach(el => {
                // Сохраняем только важные анимации
                if (!el.classList.contains('btn') && 
                    !el.classList.contains('link-card') && 
                    !el.classList.contains('christ-figure')) {
                    el.style.animation = 'none';
                    el.style.transition = 'none';
                }
            });
        }
    }
    
    // Вызываем оптимизацию при загрузке и ресайзе
    optimizeForMobile();
    window.addEventListener('resize', optimizeForMobile);
    
    // Простая проверка производительности
    let lastTime = 0;
    function checkPerformance() {
        const now = performance.now();
        const delta = now - lastTime;
        
        if (delta > 100) { // Если кадры идут медленнее 10fps
            console.log('Производительность низкая, упрощаем анимации');
            // Можно отключить некоторые эффекты
        }
        
        lastTime = now;
        if (document.hasFocus()) {
            requestAnimationFrame(checkPerformance);
        }
    }
    
    // Запускаем проверку производительности только если страница видима
    if (!document.hidden) {
        requestAnimationFrame(checkPerformance);
    }
});
