// --- EASTER EGG: Console Message ---
console.log(
  `%cHello, curious developer! Thanks for checking out my portfolio's code.`,
  "color: #6A38C2; font-size: 16px; font-family: sans-serif; font-weight: bold;"
);
console.log("Try entering the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) or typing 'matrix' for a surprise!");


document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // --- Hero Text Animation Setup ---
    function setupHeroTextAnimation() {
        const heroLines = document.querySelectorAll('.hero-line');
        if (!heroLines.length) return;

        heroLines.forEach(line => {
            const text = line.textContent;
            line.innerHTML = '';
            let charIndex = 0;

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
    
    // --- 3D TILT INTERACTION FOR HERO TEXT ---
    function setup3dTiltInteraction() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;
        
        const heroTitle = heroContent.querySelector('.display-large');
        
        heroContent.addEventListener('mousemove', (e) => {
            if (body.classList.contains('intro-animating')) return;

            const rect = heroContent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            heroTitle.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            const heroChars = heroContent.querySelectorAll('.hero-char');
            heroChars.forEach(char => {
                const charRect = char.getBoundingClientRect();
                const charCenterX = charRect.left + charRect.width / 2;
                const charCenterY = charRect.top + charRect.height / 2;
                const distance = Math.sqrt(Math.pow(e.clientX - charCenterX, 2) + Math.pow(e.clientY - charCenterY, 2));
                
                const maxEffectDistance = 150;
                if (distance < maxEffectDistance) {
                    const push = (1 - (distance / maxEffectDistance)) * 40;
                    char.style.setProperty('--char-translate-z', `${push}px`);
                } else {
                    char.style.setProperty('--char-translate-z', '0px');
                }
            });
        });
        
        heroContent.addEventListener('mouseleave', () => {
            if (body.classList.contains('intro-animating')) return;
            
            heroTitle.style.transform = 'rotateX(0deg) rotateY(0deg)';
            const heroChars = heroContent.querySelectorAll('.hero-char');
            heroChars.forEach(char => {
                 char.style.setProperty('--char-translate-z', '0px');
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
            
            body.classList.add('intro-animating');
            setTimeout(() => {
                body.classList.remove('intro-animating');
            }, 1500);

            checkTimeForThemeSuggestion();
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

    // --- EASTER EGG SETUP ---
    function setupEasterEggs() {
        const sequences = {
            konami: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
            matrix: ['m', 'a', 't', 'r', 'i', 'x']
        };
        let sequencePositions = { konami: 0, matrix: 0 };

        document.addEventListener('keydown', (e) => {
            // FIX: Handle each sequence separately to avoid conflicts.

            // --- Konami Code Logic (case-sensitive for arrow keys) ---
            const konamiKey = e.key;
            if (konamiKey === sequences.konami[sequencePositions.konami]) {
                sequencePositions.konami++;
                if (sequencePositions.konami === sequences.konami.length) {
                    document.body.classList.toggle('party-mode');
                    sequencePositions.konami = 0;
                }
            } else {
                sequencePositions.konami = 0;
            }

            // --- Matrix Code Logic (case-insensitive) ---
            const matrixKey = e.key.toLowerCase();
            if (matrixKey === sequences.matrix[sequencePositions.matrix]) {
                sequencePositions.matrix++;
                if (sequencePositions.matrix === sequences.matrix.length) {
                    setTheme('matrix');
                    sequencePositions.matrix = 0;
                }
            } else {
                sequencePositions.matrix = 0;
            }
        });

        const logo = document.querySelector('.logo');
        if (logo) {
            let logoClicks = 0;
            let clickTimer = null;
            logo.addEventListener('click', () => {
                logoClicks++;
                clearTimeout(clickTimer);
                if (logoClicks === 5) {
                    logo.classList.add('barrel-roll');
                    logo.addEventListener('animationend', () => {
                        logo.classList.remove('barrel-roll');
                    }, { once: true });
                    logoClicks = 0;
                } else {
                    clickTimer = setTimeout(() => logoClicks = 0, 1000);
                }
            });
        }
        
        const pythonDoodle = document.getElementById('python-doodle');
        if (pythonDoodle) {
            pythonDoodle.addEventListener('click', (e) => {
                triggerConfetti(e.clientX, e.clientY);
            });
        }
    }
    
    // --- EASTER EGG: Confetti Effect ---
    function triggerConfetti(x, y) {
        const colors = [
            getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim(),
            getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim(),
            getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim()
        ];
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('confetti-particle');
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            const angle = Math.random() * 2 * Math.PI;
            const velocity = Math.random() * 150 + 50;
            
            particle.style.setProperty('--x-end', `${Math.cos(angle) * velocity}px`);
            particle.style.setProperty('--y-end', `${Math.sin(angle) * velocity}px`);

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
        }
    }
    
    // --- EASTER EGG: Time-based Theme Suggestion ---
    function checkTimeForThemeSuggestion() {
        if (sessionStorage.getItem('themeSuggestionShown')) return;
        
        const currentHour = new Date().getHours();
        const isNight = currentHour >= 20 || currentHour < 6;
        const isLightMode = body.getAttribute('data-theme') === 'light';

        if (isNight && isLightMode) {
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.innerHTML = `
                <p>It's getting late... Switch to dark mode?</p>
                <button>Switch</button>
            `;
            
            document.body.appendChild(toast);
            
            toast.querySelector('button').addEventListener('click', () => {
                document.getElementById('theme-toggle').click();
                toast.classList.add('out');
                setTimeout(() => toast.remove(), 500);
            });

            setTimeout(() => {
                toast.classList.add('out');
                setTimeout(() => toast.remove(), 500);
            }, 6000);

            sessionStorage.setItem('themeSuggestionShown', 'true');
        }
    }
    
    // --- EASTER EGG: Matrix Command Line Effect ---
    let commandLineInterval = null;
    function stopCommandLineEffect() {
        clearInterval(commandLineInterval);
        commandLineInterval = null;
        const container = document.getElementById('command-line-background');
        if (container) container.innerHTML = '';
    }

    function startCommandLineEffect() {
        stopCommandLineEffect();
        const container = document.getElementById('command-line-background');
        if (!container) return;

        const lines = [
            "CONNECTING TO NODE 2A5B-0F...",
            "CONNECTION ESTABLISHED.",
            "RUNNING DECRYPTION ALGORITHM V2.8...",
            "ACCESSING MAINFRAME: SHRIYAN.PORTFOLIO",
            "C:\\> list_projects",
            "> Optimus_Prime_Wallpaper.apk",
            "> Anadrome_Video_Wallpaper.apk",
            "> Emotional_Support_Chatbot.py",
            "C:\\> run about_me.txt",
            "> I'm a developer for Android and the web...",
            "> Obsessed with performance and clean code.",
            "SYSTEM READY."
        ];
        let currentLine = 0;
        let currentChar = 0;

        commandLineInterval = setInterval(() => {
            if (currentLine >= lines.length) {
                currentLine = 0;
                currentChar = 0;
                container.innerHTML = '';
            }
            
            const line = lines[currentLine];
            if (currentChar < line.length) {
                container.innerHTML += line.charAt(currentChar);
                currentChar++;
            } else {
                container.innerHTML += '<br>';
                currentLine++;
                currentChar = 0;
            }
        }, 50);
    }


    // --- THEME MANAGEMENT ---
    const themeToggle = document.getElementById("theme-toggle");
    
    function _updateTheme(theme) {
        body.classList.remove('loaded');
        body.classList.add('intro-animating');

        body.setAttribute("data-theme", theme);
        createAnimatedPlaceholders();

        if (theme === 'matrix') {
            themeToggle.innerHTML = '<i class="fas fa-terminal"></i>';
            startCommandLineEffect();
        } else {
            themeToggle.innerHTML = theme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            stopCommandLineEffect();
        }
        
        setTimeout(() => {
            body.classList.add('loaded');
            setTimeout(() => {
                body.classList.remove('intro-animating');
            }, 1500);
        }, 20);
    }
    
    function setTheme(theme) {
        const currentTheme = body.getAttribute('data-theme');
        if (theme === 'matrix' && currentTheme !== 'matrix') {
            body.classList.add('glitching');
            setTimeout(() => {
                body.classList.remove('glitching');
                _updateTheme(theme);
            }, 1000);
        } else {
            _updateTheme(theme);
        }
    }
    
    function toggleTheme() {
        const currentTheme = body.getAttribute("data-theme");
        let nextTheme = (currentTheme === 'light') ? 'dark' : 'light';
        setTheme(nextTheme);
    }

    if (themeToggle) {
        const initialTheme = body.getAttribute('data-theme') || 'light';
        if (initialTheme === 'matrix') {
             themeToggle.innerHTML = '<i class="fas fa-terminal"></i>';
        } else {
            themeToggle.innerHTML = initialTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
        themeToggle.addEventListener("click", toggleTheme);
    }


    // --- INITIALIZE ALL SCRIPTS ---
    setupHeroTextAnimation();
    setup3dTiltInteraction();
    runSplashScreen();
    createAnimatedPlaceholders();
    setupClockWidget(); 
    setupEasterEggs();


    // --- HEADER AUTO-HIDE ---
    const header = document.querySelector('.site-header');
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


    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- CARD EXPANSION LOGIC ---
    let hoverTimer = null;
    let activeCard = null;
    let isExpanding = false;
    const HOVER_DELAY = 1000;

    const expandCard = (card) => {
        if (window.matchMedia("(max-width: 768px)").matches) return;
        if (!card || activeCard === card || isExpanding) return;
        if (body.classList.contains("expanded-mode")) return;
        
        closeCard();
        isExpanding = true;
        activeCard = card;
        
        const rect = card.getBoundingClientRect();
        
        Object.assign(card.style, { 
            position: 'fixed', 
            top: `${rect.top}px`, 
            left: `${rect.left}px`, 
            width: `${rect.width}px`, 
            height: `${rect.height}px`, 
            zIndex: '10000' 
        });
        
        card.offsetHeight;
        card.classList.add("focused");
        body.classList.add("expanded-mode");
        cancelHoverTimer();
        body.setAttribute('data-no-hover', 'true');
        
        setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "center" }), 500);
        setTimeout(() => isExpanding = false, 500);
    };

    const closeCard = () => {
        clearTimeout(hoverTimer);
        hoverTimer = null;
        if (activeCard) {
            activeCard.classList.remove("focused");
            activeCard.style.position = '';
            activeCard.style.top = '';
            activeCard.style.left = '';
            activeCard.style.width = '';
            activeCard.style.height = '';
            activeCard.style.zIndex = '';
            activeCard = null;
        }
        body.classList.remove("expanded-mode");
        body.removeAttribute('data-no-hover');
        isExpanding = false;
        setTimeout(() => {}, 100);
    };

    const startHoverTimer = (card) => {
        if (!card || card.classList.contains("focused") || body.classList.contains("expanded-mode") || activeCard || isExpanding) {
            return;
        }
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => expandCard(card), HOVER_DELAY);
    };

    const cancelHoverTimer = () => {
        if (hoverTimer) {
            clearTimeout(hoverTimer);
            hoverTimer = null;
        }
    };

    document.addEventListener("mouseenter", (e) => {
        if (window.matchMedia("(max-width: 768px)").matches) return;
        if (body.classList.contains("expanded-mode") || activeCard || body.getAttribute('data-no-hover') === 'true' || isExpanding) {
            return;
        }
        const card = e.target.closest(".project-card");
        if (card && !card.classList.contains("focused")) {
            startHoverTimer(card);
        }
    }, true);

    document.addEventListener("mouseleave", (e) => {
        if (window.matchMedia("(max-width: 768px)").matches) return;
        if (body.classList.contains("expanded-mode") || activeCard || body.getAttribute('data-no-hover') === 'true' || isExpanding) {
            return;
        }
        const card = e.target.closest(".project-card");
        if (card && !card.classList.contains("focused")) {
            cancelHoverTimer();
        }
    }, true);

    document.addEventListener("click", (e) => {
        const card = e.target.closest(".project-card");
        const actionButton = e.target.closest('.card-action-button');
        if (actionButton) return;
        if (card) {
            if (card.classList.contains("focused")) {
                closeCard();
            } else {
                expandCard(card);
            }
            e.stopPropagation();
            return;
        }
        if (activeCard && !activeCard.contains(e.target)) {
            closeCard();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && activeCard) closeCard();
    });

    let touchTimer = null;
    let touchStartTime = 0;
    const TOUCH_DELAY = 300;

    document.addEventListener("touchstart", (e) => {
        const card = e.target.closest(".project-card");
        if (card && !card.classList.contains("focused")) {
            touchStartTime = Date.now();
            touchTimer = setTimeout(() => {
                if (!card.classList.contains("focused")) expandCard(card);
            }, TOUCH_DELAY);
        }
    }, { passive: true });

    document.addEventListener("touchend", (e) => {
        const card = e.target.closest(".project-card");
        const touchDuration = Date.now() - touchStartTime;
        if (touchTimer) clearTimeout(touchTimer);
        touchTimer = null;
        if (card && touchDuration < TOUCH_DELAY && !card.classList.contains("focused")) {
            expandCard(card);
        }
    }, { passive: true });

    document.addEventListener("touchmove", () => {
        if (touchTimer) clearTimeout(touchTimer);
        touchTimer = null;
    }, { passive: true });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.anim-fade-in, .anim-slide-in').forEach(el => observer.observe(el));
    
    document.addEventListener('mousemove', (e) => {
        if (body.classList.contains("expanded-mode") || body.getAttribute('data-no-hover') === 'true' || activeCard) {
            cancelHoverTimer();
            return;
        }
    }, { passive: true });
});