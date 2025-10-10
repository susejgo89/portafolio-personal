// Inicia Lucide Icons
lucide.createIcons();

// --- LÓGICA DE TRADUCCIÓN ---

// El objeto 'translations' se carga desde js/translations.js

const languageSelector = document.getElementById('language-selector');

const setLanguage = (lang) => {
    // Asegurarse de que el idioma solicitado existe, si no, usar 'es' por defecto.
    const currentLang = translations[lang] ? lang : 'es';
    const langTranslations = translations[currentLang];

    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLang][key]) {
            element.innerHTML = translations[currentLang][key];
        }
    });
    document.title = langTranslations.pageTitle;
    document.documentElement.lang = currentLang;

    // Actualizar el enlace de descarga del CV
    const cvLink = document.getElementById('cv-download-link');
    if (cvLink && langTranslations.cvPath) {
        cvLink.href = langTranslations.cvPath;
    }

    localStorage.setItem('language', currentLang);
    languageSelector.value = currentLang;
};

languageSelector.addEventListener('change', (event) => {
    setLanguage(event.target.value);
});

// Detectar idioma del navegador o usar el guardado al cargar la página
const userLang = localStorage.getItem('language') || navigator.language.split('-')[0];
const initialLang = ['es', 'en', 'pt'].includes(userLang) ? userLang : 'es';
setLanguage(initialLang);


document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DEL SLIDER DE PROYECTOS ---
    const initSlider = () => {
        const slider = document.getElementById('domino-slider');
        if (!slider) return;

        const track = slider.querySelector('.slider-track');
        const slides = Array.from(track.children);
        const nextButton = slider.querySelector('.slider-button.next');
        const prevButton = slider.querySelector('.slider-button.prev');
        const slideWidth = slides[0].getBoundingClientRect().width;

        let currentIndex = 0;

        const updateButtons = () => {
            prevButton.classList.toggle('hidden', currentIndex === 0);
            nextButton.classList.toggle('hidden', currentIndex === slides.length - 1);
        };

        const moveToSlide = (index) => {
            track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
            currentIndex = index;
            updateButtons();
        };

        nextButton.addEventListener('click', () => moveToSlide(currentIndex + 1));
        prevButton.addEventListener('click', () => moveToSlide(currentIndex - 1));

        updateButtons(); // Inicializa el estado de los botones
    };

    // --- LÓGICA DE ANIMACIÓN AL HACER SCROLL ---
    const initScrollAnimations = () => {
        const sections = document.querySelectorAll('.fade-in-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => observer.observe(section));
    };

    // --- LÓGICA DEL CURSOR TRAIL ---
    const initCursorTrail = () => {
        const cursor = document.getElementById('cursor-glow');
        if (!cursor) return;

        window.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            });
        });

        // Efecto de hover en elementos interactivos
        document.querySelectorAll('a, button, .card-lift, select').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '60px';
                cursor.style.height = '60px';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '30px';
                cursor.style.height = '30px';
            });
        });
    };

    // --- LÓGICA DE BOTONES MAGNÉTICOS ---
    const initMagneticElements = () => {
        const magnets = document.querySelectorAll('.magnetic-effect');
        const strength = 40; // Fuerza de la atracción

        magnets.forEach(magnet => {
            magnet.addEventListener('mousemove', (e) => {
                const rect = magnet.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Mueve el elemento hacia el cursor
                requestAnimationFrame(() => {
                    magnet.style.transform = `translate(${x / rect.width * strength}px, ${y / rect.height * strength}px)`;
                });
            });

            // Resetea la posición cuando el cursor sale
            magnet.addEventListener('mouseleave', () => {
                magnet.style.transform = 'translate(0, 0)';
            });
        });
    };

    // --- LÓGICA DE SCROLL SUAVE ---
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // --- EFECTO PARALLAX EN EL FONDO ---
    const initParallax = () => {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            document.body.style.backgroundPosition = `0px ${scrollY * 0.5}px`;
        });
    };

    // --- ANIMACIÓN DE MÁQUINA DE ESCRIBIR ---
    const initTypewriter = () => {
        const subtitle = document.getElementById('hero-subtitle');
        if (!subtitle) return;

        const originalText = translations[initialLang].heroSubtitle;
        let i = 0;
        subtitle.innerHTML = ''; // Limpia el texto inicial

        function type() {
            if (i < originalText.length) {
                subtitle.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(type, 20); // Velocidad de escritura
            }
        }
        // Inicia la animación solo cuando la sección es visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(type, 500); // Pequeño retraso antes de empezar
                observer.disconnect(); // Para que no se repita
            }
        }, { threshold: 0.5 });
        observer.observe(subtitle);
    };

    // --- EFECTO SPOTLIGHT EN TARJETAS ---
    const initSpotlightCards = () => {
        const cards = document.querySelectorAll('.card-lift');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            });
        });
    };

    initSlider();
    initScrollAnimations();
    initCursorTrail();
    initMagneticElements();
    initSmoothScroll();
    initParallax();
    initTypewriter();
    initSpotlightCards();
});