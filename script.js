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
    
    // --- Animated Placeholder Backgrounds ---
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

    setupHeroTextAnimation();
    runSplashScreen();
    createAnimatedPlaceholders();

    const themeToggle = document.getElementById("theme-toggle");
    const header = document.querySelector('.site-header');
    const blurOverlay = document.querySelector(".blur-overlay");

    // Header auto-hide logic
    let lastScrollTop = 0;
    let isHoveringHeader = false;

    header.addEventListener('mouseenter', () => {
        isHoveringHeader = true;
    });

    header.addEventListener('mouseleave', () => {
        isHoveringHeader = false;
        if (window.scrollY > lastScrollTop) {
            header.classList.add('header-hidden');
        }
    });

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (!body.classList.contains("expanded-mode")) {
            if (!isHoveringHeader) {
                if (scrollTop > lastScrollTop) {
                    header.classList.add('header-hidden');
                } else {
                    header.classList.remove('header-hidden');
                }
            }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Theme management
    let currentTheme = body.getAttribute('data-theme') || 'light';

    if (themeToggle) {
        themeToggle.innerHTML = currentTheme === 'dark'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            currentTheme = body.getAttribute("data-theme") === "light" ? "dark" : "light";
            body.setAttribute("data-theme", currentTheme);
            createAnimatedPlaceholders();
            
            themeToggle.innerHTML = currentTheme === "dark"
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        });
    }

    // --- NEW: Mobile Navigation Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuToggle && menuClose && mobileNav) {
        menuToggle.addEventListener('click', () => {
            body.classList.add('nav-open');
        });

        menuClose.addEventListener('click', () => {
            body.classList.remove('nav-open');
        });
        
        // Close nav when a link is clicked
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                body.classList.remove('nav-open');
            });
        });
    }

    // Card Expansion Logic
    let hoverTimer = null;
    let activeCard = null;
    let isExpanding = false;
    const HOVER_DELAY = 1000;

    const expandCard = (card) => {
        if (activeCard === card || isExpanding) return;
        
        window.scrollTo(0, 0);

        closeCard();
        
        isExpanding = true;
        activeCard = card;
        
        const rect = card.getBoundingClientRect();
        card.style.position = 'fixed';
        card.style.top = `${rect.top}px`;
        card.style.left = `${rect.left}px`;
        card.style.width = `${rect.width}px`;
        card.style.height = `${rect.height}px`;
        card.style.zIndex = '10000';
        
        card.offsetHeight;
        
        card.classList.add("focused");
        body.classList.add("expanded-mode");
        
        blurOverlay.classList.add("overlay-active");

        setTimeout(() => {
            isExpanding = false;
        }, 500);
    };

    const closeCard = () => {
        clearTimeout(hoverTimer);
        hoverTimer = null;
        
        if (activeCard) {
            activeCard.classList.remove("focused");
            body.classList.remove("expanded-mode");
            blurOverlay.classList.remove("overlay-active");

            activeCard.style.position = '';
            activeCard.style.top = '';
            activeCard.style.left = '';
            activeCard.style.width = '';
            active-card.style.height = '';
            activeCard.style.zIndex = '';
            
            activeCard = null;
        }
        isExpanding = false;
    };

    // --- REFACTORED: Card Interaction Logic for Mobile and Desktop ---
    const isTouchDevice = 'ontouchstart' in window;
    
    document.querySelectorAll('.project-card').forEach(card => {
        // Click to expand is the primary interaction for all devices
        card.addEventListener('click', (e) => {
            if (e.target.closest('.card-action-button')) {
                return; // Don't expand if the 'Learn More' button was clicked
            }
            if (!card.classList.contains('focused')) {
                clearTimeout(hoverTimer); // Cancel any pending hover-expand
                expandCard(card);
            }
        });

        // Add hover-to-expand only for non-touch devices (desktops)
        if (!isTouchDevice) {
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('focused')) {
                     hoverTimer = setTimeout(() => expandCard(card), HOVER_DELAY);
                }
            });

            card.addEventListener('mouseleave', () => {
                clearTimeout(hoverTimer);
            });
        }
    });

    // Global listener to close the card
    document.addEventListener('click', (e) => {
        if (activeCard && !activeCard.contains(e.target)) {
            closeCard();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && activeCard) {
            closeCard();
        }
    });

    // Initialize animations for content sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.anim-fade-in, .anim-slide-in').forEach(el => {
        observer.observe(el);
    });
});
