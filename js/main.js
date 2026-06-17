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

        const placeholderKey = element.getAttribute('data-key-placeholder');
        if (placeholderKey && translations[currentLang][placeholderKey]) {
            element.placeholder = translations[currentLang][placeholderKey];
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
    const initSliders = () => {
        const sliders = document.querySelectorAll('[id$="-slider"]'); // Selecciona todos los IDs que terminan en -slider
        if (sliders.length === 0) return;

        sliders.forEach(slider => {
            const track = slider.querySelector('.slider-track');
            const slides = Array.from(track.children);
            const nextButton = slider.querySelector('.slider-button.next');
            const prevButton = slider.querySelector('.slider-button.prev');
            
            let currentIndex = 0;
            let slideWidth = slider.offsetWidth; // Usamos el ancho del contenedor, es más fiable.

            const updateButtons = () => {
                prevButton.classList.toggle('hidden', currentIndex === 0);
                nextButton.classList.toggle('hidden', currentIndex === slides.length - 1);
            };

            const moveToSlide = (index, smooth = true) => {
                if (smooth) {
                    track.style.transition = 'transform 0.5s ease-in-out';
                } else {
                    track.style.transition = 'none';
                }
                track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
                currentIndex = index;
                updateButtons();
            };

            // Recalcular el ancho y reajustar el slider si la ventana cambia de tamaño
            const handleResize = () => {
                slideWidth = slider.offsetWidth;
                moveToSlide(currentIndex, false); // Mueve al slide actual sin animación
            };

            nextButton.addEventListener('click', () => moveToSlide(currentIndex + 1));
            prevButton.addEventListener('click', () => moveToSlide(currentIndex - 1));

            updateButtons(); // Inicializa el estado de los botones

            window.addEventListener('resize', handleResize);
        });
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

            // Sonido de hover
            el.addEventListener('mouseenter', () => {
                const hoverSound = new Audio('js/sounds/button_hover.mp3');
                hoverSound.play();
            });
            // Sonido de click
             el.addEventListener('click', () => {
                const clickSound = new Audio('js/sounds/button_click.mp3');
                clickSound.play();
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
        const titleElement = document.getElementById('hero-title');
        if (!titleElement) return;

        const originalText = translations[initialLang].heroTitle;
        let i = 0;
        titleElement.innerHTML = ''; // Limpia el texto inicial

         // Carga el sonido de la máquina de escribir
        const typeSound = new Audio('js/sounds/typewriter.mp3');
        typeSound.volume = 0.5; // Ajusta el volumen como desees

        function type() {
            if (i < originalText.length) {
                titleElement.innerHTML += originalText.charAt(i);
                i++;
                typeSound.play().catch(() => {}); // Reproduce el sonido en cada carácter
                setTimeout(type, 100); // Velocidad de escritura
            } else {
                typeSound.pause(); // Pausa el sonido al finalizar
                typeSound.currentTime = 0; // Reinicia el sonido al principio
            }
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(type, 500); // Pequeño retraso antes de empezar
                observer.unobserve(titleElement); // Unobserve the element instead of disconnecting entirely
            }
        }, { threshold: 0.5 });


        observer.observe(titleElement);
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

    // --- LIGHTBOX (ZOOM DE IMÁGENES) ---
    const initLightbox = () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.lightbox-close');

        if (!lightbox) return;

        // Abrir lightbox al hacer clic en imágenes del slider
        document.querySelectorAll('.slider-track img').forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        // Cerrar lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => { lightboxImg.src = ''; }, 300); // Limpiar src después de la transición
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    };

    // --- LÓGICA DE ACORDEONES (DESPLEGABLES) ---
    const initAccordions = () => {
        const triggers = document.querySelectorAll('.accordion-trigger');
        
        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const item = trigger.closest('.accordion-item');
                // Toggle la clase activa
                item.classList.toggle('active');
            });
        });
    };

    // --- LÓGICA DEL CHATBOT ---
    const initChatbot = () => {
        const toggle = document.getElementById('chat-toggle');
        const window = document.getElementById('chat-window');
        const close = document.getElementById('chat-close');
        const input = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-message');
        const messagesContainer = document.getElementById('chat-messages');

        const addMessage = (text, sender) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-msg ${sender === 'ai' ? 'msg-ai' : 'msg-user'}`;
            msgDiv.innerText = text;
            messagesContainer.appendChild(msgDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };

        const getAIResponse = (userText) => {
            const text = userText.toLowerCase();
            const lang = localStorage.getItem('language') || 'es';

            // Helper para detectar palabras clave
            const contains = (words) => words.some(word => text.includes(word));

            // 1. Proyectos Específicos (Prioridad máxima)
            if (contains(["nexus", "replay"])) {
                if (lang === 'es') return "Nexus RePlay es un SaaS de Digital Signage para gestión remota de pantallas corporativas. Incluye playlists, programación de contenido e integración con la API de Google Gemini para IA generativa. Usa Firebase Cloud Functions y Firestore.";
                if (lang === 'pt') return "O Nexus RePlay é um SaaS de Digital Signage para gestão remota de TVs corporativas. Inclui playlists, agendamento de conteúdo e integração com a Google Gemini API para IA generativa. Usa Firebase Cloud Functions e Firestore.";
                return "Nexus RePlay is a Digital Signage SaaS for remote management of corporate TVs. It features playlists, content scheduling, and Google Gemini API integration for generative AI. Built with Firebase Cloud Functions and Firestore.";
            }
            if (contains(["domino"])) {
                if (lang === 'es') return "Domino Pro es una plataforma para torneos de dominó que implementa el Sistema Suizo automático, ranking en tiempo real y persistencia con Firebase. Desarrollada con React.js y Tailwind CSS.";
                if (lang === 'pt') return "O Domino Pro é uma plataforma para torneios de dominó que implementa o Sistema Suíço automático, ranking em tempo real e persistência com Firebase. Desenvolvida com React.js e Tailwind CSS.";
                return "Domino Pro is a platform for domino tournaments implementing an automatic Swiss System, real-time ranking, and Firebase persistence. Developed with React.js and Tailwind CSS.";
            }
            if (contains(["borderless"])) {
                if (lang === 'es') return "Borderless es un sitio de portafolio para una empresa de diseño de eventos. Se enfoca en una presentación visual elegante, SEO y conversión de clientes. Susej diseñó la arquitectura frontend y optimización de medios.";
                if (lang === 'pt') return "Borderless é um site de portfólio para uma empresa de design de eventos. Foca em uma apresentação visual elegante, SEO e conversão de clientes. Susej desenhou a arquitetura frontend e otimização de mídia.";
                return "Borderless is a portfolio site for an event design company. It focuses on elegant visual presentation, SEO, and client conversion. Susej designed the frontend architecture and media optimization.";
            }

            // 2. Información General de Proyectos
            if (contains(["proyecto", "project", "projeto", "trabalho"])) {
                if (lang === 'es') return "Susej ha desarrollado Domino Pro, Nexus RePlay y Borderless. ¿Te interesa conocer los detalles técnicos o funcionalidades de alguno en específico?";
                if (lang === 'pt') return "A Susej desenvolveu o Domino Pro, o Nexus RePlay e o Borderless. Gostaria de conhecer os detalhes técnicos ou funcionalidades de algum deles?";
                return "Susej has developed Domino Pro, Nexus RePlay, and Borderless. Would you like to know the technical or functional details of any specific one?";
            }

            // 3. Formación y Educación (Detallada según CV)
            if (contains(["estudio", "formación", "educación", "uni", "faculdade", "unifatecie", "estudando", "formação", "senai", "engenharia", "ingeniería"])) {
                if (lang === 'es') return "Susej estudia Sistemas para Internet y Pedagogía en UniFatecie. Cursó 6 semestres de Ingeniería de Sistemas en Venezuela y actualmente cursa la Trilha de IA en SENAI/SC.";
                if (lang === 'pt') return "Susej estuda Sistemas para Internet e Pedagogia na UniFatecie. Cursou 6 semestres de Engenharia de Sistemas na Venezuela e atualmente cursa a Trilha de IA no SENAI/SC.";
                return "Susej is studying Systems for Internet and Pedagogy at UniFatecie. She completed 6 semesters of Systems Engineering in Venezuela and is currently taking an AI track at SENAI/SC.";
            }

            // 4. Habilidades / Stack
            if (contains(["stack", "tecnolog", "habilidad", "habilidade", "tech", "react", "firebase", "js", "javascript", "tailwind", "api"])) {
                if (lang === 'es') return "Su stack principal es React.js, Firebase (Firestore, Functions, Auth) y Tailwind CSS. Domina la integración de APIs modernas como Google Gemini.";
                if (lang === 'pt') return "Sua stack principal é React.js, Firebase (Firestore, Functions, Auth) e Tailwind CSS. Domina a integração de APIs modernas como o Google Gemini.";
                return "Her main stack is React.js, Firebase (Firestore, Functions, Auth), and Tailwind CSS. She excels in integrating modern APIs like Google Gemini.";
            }

            // 5. Experiencia previa (Detallada según CV)
            if (contains(["experiencia", "experiência", "remotasks", "lidar", "social", "trabajó", "trabalhou", "profissão"])) {
                if (lang === 'es') return "Susej tiene experiencia como rotuladora de datos LiDAR para IA en Remotasks, Social Media Manager y Auxiliar de Sala. ¡Es una desarrolladora con visión multidisciplinar!";
                if (lang === 'pt') return "A Susej tem experiência como rotuladora de dados LiDAR para IA na Remotasks, Social Media Manager e Auxiliar de Sala. Ela é uma desenvolvedora com visão multidisciplinar!";
                return "Susej has experience as a LiDAR data labeler for AI at Remotasks, Social Media Manager, and Classroom Assistant. She is a developer with a multidisciplinary vision!";
            }

            // 6. Idiomas
            if (contains(["idioma", "habla", "lengua", "fala", "spanish", "portuguese", "english", "inglés", "português", "español"])) {
                if (lang === 'es') return "Es nativa en Español, fluida en Portugués y tiene un nivel básico de Inglés.";
                if (lang === 'pt') return "Susej é nativa em Espanhol, fluente em Português e tem inglês básico.";
                return "Susej is a native Spanish speaker, fluent in Portuguese, and has basic English.";
            }

            // 7. Contacto
            if (contains(["contacto", "contact", "contato", "whatsapp", "email", "correo", "teléfono", "telefone", "phone", "celular", "número"])) {
                if (lang === 'es') return "Puedes contactarla al +55 48 99124 2305 o por email en susejgo@gmail.com.";
                if (lang === 'pt') return "Você pode entrar em contato pelo +55 48 99124 2305 ou pelo e-mail susejgo@gmail.com.";
                return "You can reach her at +55 48 99124 2305 or via email at susejgo@gmail.com.";
            }

            // 8. Saludos
            if (contains(["hola", "hi", "oi", "saludos", "bom dia", "buenas"])) {
                return translations[lang].chatGreeting;
            }

            // 9. Manejo de confirmaciones
            if (contains(["si", "sim", "yes", "claro", "por favor"])) {
                if (lang === 'es') return "¿Qué te gustaría explorar ahora? ¿Sus proyectos detallados, su formación o su experiencia previa?";
                if (lang === 'pt') return "O que você gostaria de explorar agora? Os projetos detalhados, a formação ou a experiência anterior dela?";
                return "What would you like to explore now? Her detailed projects, education, or previous experience?";
            }

            // Fallback
            if (lang === 'es') return "Esa es una buena pregunta. Susej tiene experiencia sólida en React y Firebase. ¿Te gustaría saber sobre sus proyectos o formación?";
            if (lang === 'pt') return "Essa é uma boa pergunta. A Susej tem experiência sólida em React e Firebase. Quer saber sobre os projetos ou a formação dela?";
            return "That's a good question. Susej has solid experience in React and Firebase. Would you like to know about her projects or education?";
        };

        toggle.addEventListener('click', () => {
            window.classList.toggle('hidden');
            if (!window.classList.contains('hidden') && messagesContainer.children.length === 0) {
                setTimeout(() => addMessage(translations[localStorage.getItem('language') || 'es'].chatGreeting, 'ai'), 500);
            }
        });

        close.addEventListener('click', () => window.classList.add('hidden'));

        const handleSendMessage = () => {
            const val = input.value.trim();
            if (!val) return;
            addMessage(val, 'user');
            input.value = '';
            
            // Simular "escribiendo"
            setTimeout(() => {
                addMessage(getAIResponse(val), 'ai');
                const botSound = new Audio('js/sounds/button_hover.mp3'); // Reutilizando sonido
                botSound.play().catch(() => {});
            }, 1000);
        };

        sendBtn.addEventListener('click', handleSendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    };

    initSliders();
    initScrollAnimations();
    initCursorTrail();
    initMagneticElements();
    initSmoothScroll();
    initParallax();
    initTypewriter();
    initSpotlightCards();
    initLightbox();
    initAccordions();
    initChatbot();
});