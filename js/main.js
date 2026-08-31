// Initialize Lucide Icons
lucide.createIcons();

// --- MULTI-LANGUAGE TRANSLATION LOGIC ---
const languageSelector = document.getElementById('language-selector');

const setLanguage = (lang) => {
    const currentLang = translations[lang] ? lang : 'es';
    const langData = translations[currentLang];

    // Translate elements with [data-key]
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (langData[key]) {
            element.innerHTML = langData[key];
        }
    });

    // Translate placeholders
    const placeholders = document.querySelectorAll('[data-key-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-key-placeholder');
        if (langData[key]) {
            element.placeholder = langData[key];
        }
    });

    document.title = langData.pageTitle;
    document.documentElement.lang = currentLang;

    // Update CV download links
    const cvLink = document.getElementById('cv-download-link');
    const cvLinkMobile = document.getElementById('cv-download-link-mobile');
    if (langData.cvPath) {
        if (cvLink) cvLink.href = langData.cvPath;
        if (cvLinkMobile) cvLinkMobile.href = langData.cvPath;
    }

    localStorage.setItem('language', currentLang);
    if (languageSelector) languageSelector.value = currentLang;

    // Re-render icons if any were replaced
    lucide.createIcons();
};

if (languageSelector) {
    languageSelector.addEventListener('change', (event) => {
        setLanguage(event.target.value);
    });
}

// Detect initial language
const userLang = localStorage.getItem('language') || navigator.language.split('-')[0];
const initialLang = ['es', 'en', 'pt'].includes(userLang) ? userLang : 'es';
setLanguage(initialLang);

document.addEventListener('DOMContentLoaded', () => {
    // --- MOBILE MENU ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- PROJECT SLIDERS ---
    const initSliders = () => {
        const sliders = document.querySelectorAll('[id$="-slider"]');
        if (sliders.length === 0) return;

        sliders.forEach(slider => {
            const track = slider.querySelector('.slider-track');
            if (!track) return;
            const slides = Array.from(track.children);
            const nextButton = slider.querySelector('.slider-button.next');
            const prevButton = slider.querySelector('.slider-button.prev');
            
            let currentIndex = 0;
            let slideWidth = slider.offsetWidth;

            const updateButtons = () => {
                if (prevButton) prevButton.classList.toggle('hidden', currentIndex === 0);
                if (nextButton) nextButton.classList.toggle('hidden', currentIndex === slides.length - 1);
            };

            const moveToSlide = (index, smooth = true) => {
                track.style.transition = smooth ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
                track.style.transform = `translateX(-${slideWidth * index}px)`;
                currentIndex = index;
                updateButtons();
            };

            const handleResize = () => {
                slideWidth = slider.offsetWidth;
                moveToSlide(currentIndex, false);
            };

            if (nextButton) nextButton.addEventListener('click', (e) => {
                e.stopPropagation();
                if (currentIndex < slides.length - 1) moveToSlide(currentIndex + 1);
            });

            if (prevButton) prevButton.addEventListener('click', (e) => {
                e.stopPropagation();
                if (currentIndex > 0) moveToSlide(currentIndex - 1);
            });

            updateButtons();
            window.addEventListener('resize', handleResize);
        });
    };

    // --- SCROLL ANIMATIONS ---
    const initScrollAnimations = () => {
        const sections = document.querySelectorAll('.fade-in-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.08 });

        sections.forEach(section => observer.observe(section));
    };

    // --- SMOOTH SCROLL ---
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#' || !targetId) return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // --- LIGHTBOX (IMAGE ZOOM) ---
    const initLightbox = () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.lightbox-close');

        if (!lightbox || !lightboxImg) return;

        document.querySelectorAll('.slider-track img').forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => { lightboxImg.src = ''; }, 300);
        };

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    };

    // --- AI CHATBOT ASSISTANT ---
    const initChatbot = () => {
        const toggle = document.getElementById('chat-toggle');
        const chatWindow = document.getElementById('chat-window');
        const close = document.getElementById('chat-close');
        const input = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-message');
        const messagesContainer = document.getElementById('chat-messages');
        const chips = document.querySelectorAll('.chat-chip');

        if (!toggle || !chatWindow || !input || !sendBtn || !messagesContainer) return;

        const addMessage = (text, sender) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-msg ${sender === 'ai' ? 'msg-ai' : 'msg-user'}`;
            msgDiv.innerHTML = text;
            messagesContainer.appendChild(msgDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };

        const getAIResponse = (userText) => {
            const text = userText.toLowerCase();
            const lang = localStorage.getItem('language') || 'es';
            const contains = (words) => words.some(word => text.includes(word));

            const responseMap = [
                {
                    keys: ["senai", "curso", "ia", "inteligencia", "inteligência", "python", "predictiv", "preditiv", "machine learning"],
                    responses: {
                        es: "Susej cursa el <strong>Curso Profesionalizante en Desarrollo de IA para Análisis Predictivo con Python (320h)</strong> en SENAI/SC (Carreira Tech), especializándose en modelado de datos, machine learning y soluciones analíticas.",
                        pt: "Susej realiza o <strong>Curso Profissionalizante em Desenvolvimento de IA para Análise Preditiva com Python (320h)</strong> no SENAI/SC (Carreira Tech), especializando-se em modelagem preditiva e machine learning.",
                        en: "Susej is taking the <strong>Vocational Certification in AI Development for Predictive Analysis with Python (320h)</strong> at SENAI/SC (Carreira Tech), specializing in predictive data modeling and machine learning."
                    }
                },
                {
                    keys: ["estudio", "formación", "formação", "educación", "faculdade", "unifatecie", "universidad", "ingeniería", "engenharia"],
                    responses: {
                        es: "Formación académica de Susej: <br>• <strong>SENAI/SC:</strong> Curso Profesionalizante – Trilha IA: Desarrollo de IA para Análisis Predictivo con Python (320h, en curso).<br>• <strong>UniFatecie:</strong> Tecnólogo en Sistemas para Internet (en curso).<br>• <strong>UNA (Venezuela):</strong> Ingeniería de Sistemas (6 semestres, base en computación y algoritmos).",
                        pt: "Formação acadêmica da Susej: <br>• <strong>SENAI/SC:</strong> Curso Profissionalizante – Trilha IA: Desenvolvimento de IA para Análise Preditiva com Python (320h, em andamento).<br>• <strong>UniFatecie:</strong> Tecnólogo em Sistemas para Internet (em andamento).<br>• <strong>UNA (Venezuela):</strong> Engenharia de Sistemas (6 semestres, base em computação e algoritmos).",
                        en: "Susej's education: <br>• <strong>SENAI/SC:</strong> Vocational Certification – AI Track: AI Development for Predictive Analysis with Python (320h, in progress).<br>• <strong>UniFatecie:</strong> Internet Systems Degree (in progress).<br>• <strong>UNA (Venezuela):</strong> Systems Engineering (6 semesters, strong computing and algorithm foundation)."
                    }
                },
                {
                    keys: ["agente", "prospecc", "prospec", "sheets", "maps", "leads", "prospector"],
                    responses: {
                        es: "<strong>Agente IA de Prospección B2B:</strong> Aplicación desarrollada en Python y Streamlit que automatiza la búsqueda de empresas en Google Maps (Google Places API), cualifica leads con filtros estrictos, genera copy de prospección personalizado con Google Gemini AI y sincroniza con Google Sheets.",
                        pt: "<strong>Agente IA de Prospecção B2B:</strong> Aplicação desenvolvida em Python e Streamlit que automatiza a busca de empresas no Google Maps (Google Places API), qualifica leads com filtros estritos, gera copy de abordagem personalizada com Google Gemini AI e exporta para o Google Sheets.",
                        en: "<strong>B2B AI Prospecting Agent:</strong> Python and Streamlit application that automates company searches on Google Maps (Google Places API), qualifies leads with strict filtering, generates custom outreach copy with Google Gemini AI, and syncs directly to Google Sheets."
                    }
                },
                {
                    keys: ["nexus", "replay", "signage", "tv", "pantalla", "tela"],
                    responses: {
                        es: "<strong>NexusRePlay</strong> es una plataforma SaaS de Digital Signage en producción para gestión remota de pantallas corporativas. Desarrollada con JavaScript, Tailwind CSS, Firebase Cloud Functions y Google Gemini API.",
                        pt: "<strong>NexusRePlay</strong> é uma plataforma SaaS de Digital Signage em produção para gerenciamento remoto de TVs corporativas. Desenvolvida com JS, Tailwind, Firebase Cloud Functions e Google Gemini API.",
                        en: "<strong>NexusRePlay</strong> is a live Digital Signage SaaS for remote corporate screen management, built with JavaScript, Tailwind, Firebase Cloud Functions, and Google Gemini API."
                    }
                },
                {
                    keys: ["domino", "torneo", "torneio", "suizo", "suíço"],
                    responses: {
                        es: "<strong>DominoPro</strong> es una aplicación web en producción para gestión integral de torneos de dominó con Sistema Suizo automático, ranking en tiempo real y persistencia en Firebase Firestore.",
                        pt: "<strong>DominoPro</strong> é uma aplicação em produção para gestão de torneios com Sistema Suíço automático, ranking em tempo real e Firebase Firestore.",
                        en: "<strong>DominoPro</strong> is a live tournament platform featuring an automated Swiss Pairing System, real-time standings, and Firebase Firestore."
                    }
                },
                {
                    keys: ["stack", "tecnolog", "habilidad", "habilidades", "tech", "react", "firebase"],
                    responses: {
                        es: "Stack principal: <strong>React.js, JavaScript ES6+, Tailwind CSS, Firebase (Firestore, Auth, Storage, Cloud Functions)</strong>, además de <strong>Python para IA predictiva</strong>, Vite y Git/GitHub.",
                        pt: "Stack principal: <strong>React.js, JavaScript ES6+, Tailwind CSS, Firebase (Firestore, Auth, Storage, Cloud Functions)</strong>, além de <strong>Python para IA preditiva</strong>, Vite e Git/GitHub.",
                        en: "Core stack: <strong>React.js, JavaScript ES6+, Tailwind CSS, Firebase (Firestore, Auth, Storage, Cloud Functions)</strong>, plus <strong>Python for predictive AI</strong>, Vite, and Git/GitHub."
                    }
                },
                {
                    keys: ["contacto", "contato", "whatsapp", "email", "telefone", "telefono"],
                    responses: {
                        es: "Puedes contactar a Susej vía WhatsApp (+55 48 99124 2305), correo (susejgo@gmail.com) o a través de su LinkedIn (linkedin.com/in/susejgo).",
                        pt: "Você pode falar com a Susej via WhatsApp (+55 48 99124 2305), e-mail (susejgo@gmail.com) ou LinkedIn (linkedin.com/in/susejgo).",
                        en: "You can reach Susej via WhatsApp (+55 48 99124 2305), email (susejgo@gmail.com), or LinkedIn (linkedin.com/in/susejgo)."
                    }
                },
                {
                    keys: ["hola", "hi", "oi", "ola", "saludos", "hello"],
                    responses: {
                        es: translations.es.chatGreeting,
                        pt: translations.pt.chatGreeting,
                        en: translations.en.chatGreeting
                    }
                }
            ];

            const match = responseMap.find(item => contains(item.keys));
            if (match) return match.responses[lang] || match.responses['en'];

            // Fallback response
            if (lang === 'pt') return "A Susej é Desenvolvedora Front-End Jr. com produtos em produção (React, Firebase) e Curso Profissionalizante em IA Preditiva com Python no SENAI/SC. Deseja saber sobre os projetos ou a formação?";
            if (lang === 'en') return "Susej is a Junior Front-End Developer with production SaaS experience (React, Firebase) and vocational training in Predictive AI with Python at SENAI/SC. Would you like to know more about her projects or education?";
            return "Susej es Desarrolladora Front-End Jr. con experiencia en producción (React, Firebase) y Curso Profesionalizante en IA Predictiva con Python en SENAI/SC. ¿Te gustaría saber más sobre sus proyectos o formación?";
        };

        const processUserQuery = (val) => {
            if (!val) return;
            addMessage(val, 'user');
            setTimeout(() => {
                addMessage(getAIResponse(val), 'ai');
            }, 450);
        };

        toggle.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
            chatWindow.classList.toggle('flex');
            if (!chatWindow.classList.contains('hidden') && messagesContainer.children.length === 0) {
                const currentLang = localStorage.getItem('language') || 'es';
                setTimeout(() => addMessage(translations[currentLang].chatGreeting, 'ai'), 300);
            }
        });

        if (close) {
            close.addEventListener('click', () => {
                chatWindow.classList.add('hidden');
                chatWindow.classList.remove('flex');
            });
        }

        const handleSendMessage = () => {
            const val = input.value.trim();
            if (!val) return;
            input.value = '';
            processUserQuery(val);
        };

        sendBtn.addEventListener('click', handleSendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });

        // Click on suggestion chips
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const query = chip.getAttribute('data-query');
                processUserQuery(query);
            });
        });
    };

    // Initialize components
    initSliders();
    initScrollAnimations();
    initSmoothScroll();
    initLightbox();
    initChatbot();
});