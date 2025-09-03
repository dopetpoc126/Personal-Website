document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // --- Hero Text Animation Setup ---
    function setupHeroTextAnimation() {
        const heroLines = document.querySelectorAll('.hero-line');
        if (!heroLines.length) return;

        let charIndex = 0;

        heroLines.forEach(line => {
            const text = line.textContent;
            line.innerHTML = '';

            text.split('').forEach((char) => {
                const span = document.createElement('span');
                span.className = 'hero-char';
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.transitionDelay = `${charIndex * 40}ms`;
                line.appendChild(span);
                charIndex++;
            });
        });
    }

    // --- SPLASH SCREEN LOGIC ---
    function runSplashScreen() {
        const splashScreen = document.getElementById('splash-screen');
        if (!splashScreen) return;

        const SPLASH_ANIMATION_DURATION = 1200;
        const FADE_OUT_DURATION = 500;

        setTimeout(() => {
            splashScreen.classList.add('hidden');
            body.classList.add('loaded');
        }, SPLASH_ANIMATION_DURATION);

        setTimeout(() => {
            splashScreen.remove();
        }, SPLASH_ANIMATION_DURATION + FADE_OUT_DURATION);
    }
    
    // --- Clock Widget Logic ---
    function setupClockWidget() {
        const timeEl = document.getElementById('clock-time');
        const dateEl = document.getElementById('clock-date');
        
        if (!timeEl || !dateEl) return;

        function updateClock() {
            const now = new Date();
            
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            timeEl.textContent = `${hours}:${minutes}:${seconds}`;

            const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
            dateEl.textContent = now.toLocaleDateString(undefined, dateOptions);
        }

        updateClock();
        setInterval(updateClock, 1000);
    }

    // --- Generate animated placeholder backgrounds ---
    function createAnimatedPlaceholders() {
        const placeholders = document.querySelectorAll('.project-image-placeholder');
        if (!placeholders.length) return;

        const style = getComputedStyle(document.documentElement);
        const c1 = style.getPropertyValue('--secondary-color').trim();
        const c2 = style.getPropertyValue('--primary-color').trim();
        const c3 = style.getPropertyValue('--accent-color').trim();
        
        const svgContent = `
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'>
                <defs>
                    <style>
                        .c1, .c2, .c3, .c4 { 
                            animation-duration: 6s; 
                            animation-timing-function: ease-in-out; 
                            animation-iteration-count: infinite; 
                            transform-origin: center; 
                        }
                        .c1 { animation-name: a1; }
                        .c2 { animation-name: a2; animation-delay: -1.5s; }
                        .c3 { animation-name: a3; animation-delay: -3s; }
                        .c4 { animation-name: a4; animation-delay: -4.5s; }
                        @keyframes a1 { 0%,100% { transform: scale(1) translateX(0); opacity: 0.6; } 50% { transform: scale(1.3) translateX(5px); opacity: 1; } }
                        @keyframes a2 { 0%,100% { transform: scale(1.2) translateY(0); opacity: 0.5; } 50% { transform: scale(0.8) translateY(-5px); opacity: 0.9; } }
                        @keyframes a3 { 0%,100% { transform: scale(0.9) translateX(0); opacity: 0.7; } 50% { transform: scale(1.2) translateX(-5px); opacity: 1; } }
                        @keyframes a4 { 0%,100% { transform: scale(1) translateY(0); opacity: 0.6; } 50% { transform: scale(1.4) translateY(5px); opacity: 1; } }
                    </style>
                    <filter id='f1' x='-50%' y='-50%' width='200%' height='200%'>
                        <feGaussianBlur in='SourceGraphic' stdDeviation='4'/>
                    </filter>
                </defs>
                <circle class='c1' cx='30' cy='65' r='12' fill='${c1}' filter='url(#f1)'/>
                <circle class='c2' cx='80' cy='25' r='8' fill='${c2}' filter='url(#f1)'/>
                <circle class='c3' cx='130' cy='75' r='10' fill='${c3}' filter='url(#f1)'/>
                <circle class='c4' cx='170' cy='35' r='9' fill='${c1}' filter='url(#f1)'/>
            </svg>
        `;

        const dataUri = `url("data:image/svg+xml,${encodeURIComponent(svgContent)}")`;

        placeholders.forEach(p => {
            p.style.backgroundImage = dataUri;
        });
    }

    // --- DYNAMIC CURSOR INTERACTION FOR HERO TEXT ---
    function setupDynamicCursorInteraction() {
        const heroChars = document.querySelectorAll('.hero-char');
        const heroContent = document.querySelector('.hero-content');
        
        if (!heroChars.length || !heroContent) return;

        // Mouse enter hero section
        heroContent.addEventListener('mouseenter', () => {
            // Hero section entered
        });

        // Mouse leave hero section
        heroContent.addEventListener('mouseleave', () => {
            // Remove all cursor effect classes
            heroChars.forEach(char => {
                char.classList.remove('cursor-near', 'cursor-far', 'magnetic');
            });
        });

        // Mouse move within hero section
        heroContent.addEventListener('mousemove', (e) => {
            const rect = heroContent.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            heroChars.forEach((char, index) => {
                const charRect = char.getBoundingClientRect();
                const charCenterX = charRect.left + charRect.width / 2;
                const charCenterY = charRect.top + charRect.height / 2;
                
                // Calculate distance from cursor to character
                const distance = Math.sqrt(
                    Math.pow(e.clientX - charCenterX, 2) + 
                    Math.pow(e.clientY - charCenterY, 2)
                );
                
                // Remove previous classes
                char.classList.remove('cursor-near', 'cursor-far', 'magnetic');
                
                // Apply effects based on distance
                if (distance < 50) {
                    char.classList.add('cursor-near');
                    // Magnetic effect - pull character towards cursor with rotation
                    const pullX = (e.clientX - charCenterX) * 0.15;
                    const pullY = (e.clientY - charCenterY) * 0.15;
                    const rotation = (pullX * 0.1) + (pullY * 0.05);
                    char.style.transform = `translateY(-12px) scale(1.15) rotate(${rotation}deg) translate(${pullX}px, ${pullY}px)`;
                } else if (distance < 100) {
                    char.classList.add('cursor-far');
                    const pullX = (e.clientX - charCenterX) * 0.05;
                    const pullY = (e.clientY - charCenterY) * 0.05;
                    const rotation = (pullX * 0.05) + (pullY * 0.02);
                    char.style.transform = `translateY(-6px) scale(1.08) rotate(${rotation}deg) translate(${pullX}px, ${pullY}px)`;
                } else {
                    char.style.transform = '';
                }
            });
        });

        // Add magnetic effect on mouse down
        document.addEventListener('mousedown', () => {
            heroChars.forEach(char => char.classList.add('magnetic'));
        });

        // Remove magnetic effect on mouse up
        document.addEventListener('mouseup', () => {
            heroChars.forEach(char => char.classList.remove('magnetic'));
        });

        // Touch support for mobile devices
        let touchActive = false;
        
        heroContent.addEventListener('touchstart', (e) => {
            touchActive = true;
            const touch = e.touches[0];
            const rect = heroContent.getBoundingClientRect();
            const touchX = touch.clientX;
            const touchY = touch.clientY;
            
            heroChars.forEach((char, index) => {
                const charRect = char.getBoundingClientRect();
                const charCenterX = charRect.left + charRect.width / 2;
                const charCenterY = charRect.top + charRect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(touchX - charCenterX, 2) + 
                    Math.pow(touchY - charCenterY, 2)
                );
                
                if (distance < 80) {
                    char.classList.add('cursor-near');
                    const pullX = (touchX - charCenterX) * 0.1;
                    const pullY = (touchY - charCenterY) * 0.1;
                    const rotation = (pullX * 0.08) + (pullY * 0.04);
                    char.style.transform = `translateY(-12px) scale(1.15) rotate(${rotation}deg) translate(${pullX}px, ${pullY}px)`;
                }
            });
        });

        heroContent.addEventListener('touchend', () => {
            touchActive = false;
            heroChars.forEach(char => {
                char.classList.remove('cursor-near', 'cursor-far');
                char.style.transform = '';
            });
        });
    }

    // --- INITIALIZE ALL SCRIPTS ---
    setupHeroTextAnimation();
    setupDynamicCursorInteraction();
    runSplashScreen();
    createAnimatedPlaceholders();
    setupClockWidget(); 

    const themeToggle = document.getElementById("theme-toggle");
    const header = document.querySelector('.site-header');

    // Header auto-hide logic
    let lastScrollTop = 0;
    let isHoveringHeader = false;

    header.addEventListener('mouseenter', () => { isHoveringHeader = true; });
    header.addEventListener('mouseleave', () => {
        isHoveringHeader = false;
        if (window.scrollY > lastScrollTop) {
            header.classList.add('header-hidden');
        }
    });

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (!body.classList.contains("expanded-mode") && !isHoveringHeader) {
            header.classList.toggle('header-hidden', scrollTop > lastScrollTop);
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Theme management
    let currentTheme = body.getAttribute('data-theme') || 'light';

    if (themeToggle) {
        themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    if (themeToggle) {
        // START: Modified Theme Toggle Logic for Hero Text Re-animation
        const heroChars = document.querySelectorAll('.hero-char');

        themeToggle.addEventListener("click", () => {
            // 1. Add classes to instantly hide the characters without a transition
            heroChars.forEach(char => {
                char.classList.add('no-transition');
                body.classList.remove('loaded'); // This sends them to their 'out' state
            });

            // 2. Change the theme while characters are hidden
            currentTheme = body.getAttribute("data-theme") === "light" ? "dark" : "light";
            body.setAttribute("data-theme", currentTheme);
            createAnimatedPlaceholders();
            themeToggle.innerHTML = currentTheme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // 3. Force a browser reflow and then re-enable transitions to play the 'in' animation
            // A tiny timeout is a reliable way to ensure the browser registers the state change.
            setTimeout(() => {
                heroChars.forEach(char => char.classList.remove('no-transition'));
                body.classList.add('loaded'); // This triggers the staggered 'in' animation
            }, 20);
        });
        // END: Modified Theme Toggle Logic
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Card Expansion Logic
    let hoverTimer = null;
    let activeCard = null;
    let isExpanding = false;
    const HOVER_DELAY = 1000;

    const expandCard = (card) => {
        if (activeCard === card || isExpanding) return;
        closeCard();
        isExpanding = true;
        activeCard = card;
        const rect = card.getBoundingClientRect();
        Object.assign(card.style, { position: 'fixed', top: `${rect.top}px`, left: `${rect.left}px`, width: `${rect.width}px`, height: `${rect.height}px`, zIndex: '10000' });
        card.offsetHeight; // Force reflow
        card.classList.add("focused");
        body.classList.add("expanded-mode");
        setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "center" }), 500);
        setTimeout(() => isExpanding = false, 500);
    };

    const closeCard = () => {
        clearTimeout(hoverTimer);
        hoverTimer = null;
        if (activeCard) {
            activeCard.classList.remove("focused");
            body.classList.remove("expanded-mode");
            Object.assign(activeCard.style, { position: '', top: '', left: '', width: '', height: '', zIndex: '' });
            activeCard = null;
        }
        isExpanding = false;
    };

    const startHoverTimer = (card) => {
        clearTimeout(hoverTimer);
        if (card.classList.contains("focused")) return;
        hoverTimer = setTimeout(() => expandCard(card), HOVER_DELAY);
    };

    const cancelHoverTimer = () => {
        if (hoverTimer) {
            clearTimeout(hoverTimer);
            hoverTimer = null;
        }
    };

    document.addEventListener("mouseenter", (e) => {
        const card = e.target.closest(".project-card");
        if (card && !card.classList.contains("focused")) startHoverTimer(card);
    }, true);

    document.addEventListener("mouseleave", (e) => {
        const card = e.target.closest(".project-card");
        if (card && !card.classList.contains("focused")) cancelHoverTimer();
    }, true);

    document.addEventListener("click", (e) => {
        if (e.target.closest('.card-action-button')) return;
        if (activeCard && !activeCard.contains(e.target)) closeCard();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && activeCard) closeCard();
    });

    let touchTimer = null;
    document.addEventListener("touchstart", (e) => {
        const card = e.target.closest(".project-card");
        if (card && !card.classList.contains("focused")) {
            touchTimer = setTimeout(() => expandCard(card), HOVER_DELAY);
        }
    }, { passive: true });

    document.addEventListener("touchend", () => {
        if (touchTimer) { clearTimeout(touchTimer); touchTimer = null; }
    }, { passive: true });

    document.addEventListener("touchmove", () => {
        if (touchTimer) { clearTimeout(touchTimer); touchTimer = null; }
    }, { passive: true });

    // Initialize animations for content sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.anim-fade-in, .anim-slide-in').forEach(el => observer.observe(el));
});

