// ==========================================================================
// PORTFOLIO JS - SUSEJ GONZALEZ
// Liquid Glass UI, Atlas 3D Coverflow & 3D Contact Dock Animation
// ==========================================================================

// Initialize Lucide Icons
lucide.createIcons();

// --- TACTILE AUDIO FEEDBACK ---
let hoverSound, clickSound;
try {
    hoverSound = new Audio('js/sounds/button_hover.mp3');
    hoverSound.volume = 0.12;
    clickSound = new Audio('js/sounds/button_click.mp3');
    clickSound.volume = 0.22;
} catch (e) {
    console.warn("Audio not supported or disabled:", e);
}

let lastSoundTime = 0;
const playHover = () => {
    if (!hoverSound) return;
    const now = Date.now();
    if (now - lastSoundTime < 70) return;
    lastSoundTime = now;
    try {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {});
    } catch (e) {}
};

const playClick = () => {
    if (!clickSound) return;
    try {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    } catch (e) {}
};

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
    const dockCvLink = document.getElementById('dock-cv-link');
    if (langData.cvPath) {
        if (cvLink) cvLink.href = langData.cvPath;
        if (cvLinkMobile) cvLinkMobile.href = langData.cvPath;
        if (dockCvLink) dockCvLink.href = langData.cvPath;
    }

    localStorage.setItem('language', currentLang);
    if (languageSelector) languageSelector.value = currentLang;

    // Re-render icons if any were replaced
    lucide.createIcons();
};

if (languageSelector) {
    languageSelector.addEventListener('change', (event) => {
        playClick();
        setLanguage(event.target.value);
    });
}

// Detect initial language
const userLang = localStorage.getItem('language') || navigator.language.split('-')[0];
const initialLang = ['es', 'en', 'pt'].includes(userLang) ? userLang : 'es';
setLanguage(initialLang);

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LIQUID GLASS THEME ENGINE (DARK / LIGHT) ---
    const initThemeEngine = () => {
        const themeToggleBtn = document.getElementById('theme-toggle');
        const sunIcon = document.getElementById('theme-icon-sun');
        const moonIcon = document.getElementById('theme-icon-moon');

        const applyTheme = (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('portfolio-theme', theme);
            if (theme === 'light') {
                if (sunIcon) sunIcon.classList.add('hidden');
                if (moonIcon) moonIcon.classList.remove('hidden');
            } else {
                if (sunIcon) sunIcon.classList.remove('hidden');
                if (moonIcon) moonIcon.classList.add('hidden');
            }
        };

        const savedTheme = localStorage.getItem('portfolio-theme') || 
            (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        applyTheme(savedTheme);

        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                playClick();
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
                const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
                applyTheme(nextTheme);
            });
        }
    };

    // --- 2. FLOATING LIQUID GLASS DOCK PILL TRACKER ---
    const initDockPill = () => {
        const navContainer = document.getElementById('nav-pill-track');
        const indicator = document.getElementById('nav-pill-indicator');
        const navLinks = document.querySelectorAll('.nav-pill-link');
        if (!navContainer || !indicator || navLinks.length === 0) return;

        const movePillTo = (targetLink) => {
            if (!targetLink) return;
            const containerRect = navContainer.getBoundingClientRect();
            const targetRect = targetLink.getBoundingClientRect();
            const leftOffset = targetRect.left - containerRect.left;
            
            indicator.style.transform = `translateX(${leftOffset - 3}px)`;
            indicator.style.width = `${targetRect.width}px`;

            navLinks.forEach(l => l.classList.remove('active'));
            targetLink.classList.add('active');
        };

        // Initialize to first active link
        const currentActive = document.querySelector('.nav-pill-link.active') || navLinks[0];
        setTimeout(() => movePillTo(currentActive), 150);

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => playHover());
            link.addEventListener('click', (e) => {
                playClick();
                movePillTo(link);
            });
        });

        // Track active section via IntersectionObserver
        const sections = document.querySelectorAll('section[id]');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const matchingLink = document.querySelector(`.nav-pill-link[href="#${id}"]`);
                    if (matchingLink) {
                        movePillTo(matchingLink);
                    }
                }
            });
        }, { threshold: 0.35, rootMargin: "-80px 0px -40% 0px" });

        sections.forEach(sec => sectionObserver.observe(sec));
        window.addEventListener('resize', () => {
            const active = document.querySelector('.nav-pill-link.active');
            if (active) movePillTo(active);
        });
    };

    // --- 3. MOBILE MENU ---
    const initMobileMenu = () => {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                playClick();
                mobileMenu.classList.toggle('hidden');
            });

            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    playClick();
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    };

    // --- 4. ATLAS 3D COVERFLOW ENGINE ---
    const initCoverflow = () => {
        const container = document.getElementById('coverflow-container');
        const stage = document.getElementById('coverflow-stage');
        if (!container || !stage) return;

        const cards = Array.from(stage.querySelectorAll('.coverflow-card'));
        const total = cards.length;
        if (total === 0) return;

        let currentIndex = 0;
        const currentNumEl = document.getElementById('coverflow-current-num');
        const totalNumEl = document.getElementById('coverflow-total-num');
        const prevBtn = document.getElementById('coverflow-prev-btn');
        const nextBtn = document.getElementById('coverflow-next-btn');
        const indicators = document.querySelectorAll('.coverflow-dot');

        if (totalNumEl) totalNumEl.textContent = String(total).padStart(2, '0');

        const updateCoverflowState = (newIndex) => {
            if (newIndex < 0 || newIndex >= total) return;
            currentIndex = newIndex;

            cards.forEach((card, i) => {
                card.classList.remove('is-active', 'is-prev', 'is-next', 'is-far-prev', 'is-far-next', 'is-hidden');
                
                const diff = i - currentIndex;
                if (diff === 0) {
                    card.classList.add('is-active');
                } else if (diff === -1) {
                    card.classList.add('is-prev');
                } else if (diff === 1) {
                    card.classList.add('is-next');
                } else if (diff < -1) {
                    card.classList.add(diff === -2 ? 'is-far-prev' : 'is-hidden');
                } else if (diff > 1) {
                    card.classList.add(diff === 2 ? 'is-far-next' : 'is-hidden');
                }
            });

            // Update counter
            if (currentNumEl) {
                currentNumEl.textContent = String(currentIndex + 1).padStart(2, '0');
            }

            // Update indicators
            indicators.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        };

        // Setup click on side cards to focus
        cards.forEach((card, idx) => {
            card.addEventListener('click', (e) => {
                // If not active card, activate it
                if (idx !== currentIndex) {
                    e.preventDefault();
                    playClick();
                    updateCoverflowState(idx);
                }
            });
        });

        // Setup indicators click
        indicators.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                playClick();
                updateCoverflowState(idx);
            });
        });

        // Prev & Next Buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                playClick();
                if (currentIndex > 0) updateCoverflowState(currentIndex - 1);
                else updateCoverflowState(total - 1); // loop
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                playClick();
                if (currentIndex < total - 1) updateCoverflowState(currentIndex + 1);
                else updateCoverflowState(0); // loop
            });
        }

        // Pointer Drag & Swipe Handling
        let startX = 0;
        let isDragging = false;

        stage.addEventListener('pointerdown', (e) => {
            // Ignore if clicking on buttons or links
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.thumb-btn')) return;
            startX = e.clientX;
            isDragging = true;
            stage.setPointerCapture(e.pointerId);
        });

        stage.addEventListener('pointerup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            try { stage.releasePointerCapture(e.pointerId); } catch(err) {}

            const deltaX = e.clientX - startX;
            if (Math.abs(deltaX) > 40) {
                playClick();
                if (deltaX < 0 && currentIndex < total - 1) {
                    updateCoverflowState(currentIndex + 1);
                } else if (deltaX > 0 && currentIndex > 0) {
                    updateCoverflowState(currentIndex - 1);
                }
            }
        });

        stage.addEventListener('pointercancel', (e) => {
            isDragging = false;
            try { stage.releasePointerCapture(e.pointerId); } catch(err) {}
        });

        // Keyboard arrows navigation when section is in view
        document.addEventListener('keydown', (e) => {
            const rect = container.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (!inView) return;

            if (e.key === 'ArrowRight') {
                if (currentIndex < total - 1) {
                    playClick();
                    updateCoverflowState(currentIndex + 1);
                }
            } else if (e.key === 'ArrowLeft') {
                if (currentIndex > 0) {
                    playClick();
                    updateCoverflowState(currentIndex - 1);
                }
            }
        });

        // Thumbnail image swap inside cards
        cards.forEach(card => {
            const mainImg = card.querySelector('.coverflow-main-img');
            const thumbs = card.querySelectorAll('.thumb-btn');
            if (!mainImg || thumbs.length === 0) return;

            thumbs.forEach(thumb => {
                thumb.addEventListener('click', (e) => {
                    e.stopPropagation();
                    playHover();
                    mainImg.src = thumb.src;
                    thumbs.forEach(t => {
                        t.classList.remove('border-violet-500/50', 'border-cyan-500/50', 'active');
                        t.classList.add('opacity-60');
                    });
                    thumb.classList.add('border-violet-500/50', 'active');
                    thumb.classList.remove('opacity-60');
                });
            });
        });

        updateCoverflowState(0);
    };

    // --- 5. 3D CONTACT DOCK ANIMATION ---
    const initContactDock = () => {
        const dockKeys = document.querySelectorAll('.dock-key');
        if (dockKeys.length === 0) return;

        dockKeys.forEach((key, index) => {
            key.addEventListener('mouseenter', () => playHover());
            
            const hit = key.querySelector('.dock-key__hit');
            if (hit) {
                hit.addEventListener('click', () => playClick());
            }

            // Neighbor scaling effect (macOS Dock curve)
            key.addEventListener('mouseenter', () => {
                const prev = dockKeys[index - 1];
                const next = dockKeys[index + 1];
                if (prev) {
                    const cap = prev.querySelector('.dock-key__cap');
                    if (cap) cap.style.transform = 'translate3d(0, -4px, 10px) scale(1.06)';
                }
                if (next) {
                    const cap = next.querySelector('.dock-key__cap');
                    if (cap) cap.style.transform = 'translate3d(0, -4px, 10px) scale(1.06)';
                }
            });

            key.addEventListener('mouseleave', () => {
                const prev = dockKeys[index - 1];
                const next = dockKeys[index + 1];
                if (prev) {
                    const cap = prev.querySelector('.dock-key__cap');
                    if (cap) cap.style.transform = '';
                }
                if (next) {
                    const cap = next.querySelector('.dock-key__cap');
                    if (cap) cap.style.transform = '';
                }
            });

            // Mobile touch: toggle flip
            key.addEventListener('touchstart', () => {
                playHover();
                dockKeys.forEach(k => {
                    if (k !== key) k.classList.remove('active-touch');
                });
                key.classList.toggle('active-touch');
            }, { passive: true });
        });

        // AI Chat trigger key
        const chatKeyTrigger = document.getElementById('dock-chat-trigger');
        const chatWindow = document.getElementById('chat-window');
        if (chatKeyTrigger && chatWindow) {
            chatKeyTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                playClick();
                chatWindow.classList.remove('hidden');
                chatWindow.classList.add('flex');
                const messagesContainer = document.getElementById('chat-messages');
                if (messagesContainer && messagesContainer.children.length === 0) {
                    const currentLang = localStorage.getItem('language') || 'es';
                    setTimeout(() => {
                        const msg = document.createElement('div');
                        msg.className = 'chat-msg msg-ai';
                        msg.innerHTML = translations[currentLang].chatGreeting;
                        messagesContainer.appendChild(msg);
                    }, 250);
                }
            });
        }
    };

    // --- 6. SCROLL ANIMATIONS ---
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

    // --- 7. SMOOTH SCROLL ---
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#' || !targetId || targetId.startsWith('#ai-chat')) return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    playClick();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // --- 8. LIGHTBOX MODAL ---
    const initLightbox = () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.lightbox-close');

        if (!lightbox || !lightboxImg) return;

        // Coverflow images & other gallery images
        document.addEventListener('click', (e) => {
            const zoomTarget = e.target.closest('.coverflow-zoom-target');
            if (zoomTarget) {
                const img = zoomTarget.querySelector('img');
                if (img) {
                    playClick();
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active');
                }
            }
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

    // --- 9. AI CHATBOT ASSISTANT ---
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
            playClick();
            chatWindow.classList.toggle('hidden');
            chatWindow.classList.toggle('flex');
            if (!chatWindow.classList.contains('hidden') && messagesContainer.children.length === 0) {
                const currentLang = localStorage.getItem('language') || 'es';
                setTimeout(() => addMessage(translations[currentLang].chatGreeting, 'ai'), 300);
            }
        });

        if (close) {
            close.addEventListener('click', () => {
                playClick();
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

        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                playClick();
                const query = chip.getAttribute('data-query');
                processUserQuery(query);
            });
        });
    };

    // Initialize all modules
    initThemeEngine();
    initDockPill();
    initMobileMenu();
    initCoverflow();
    initContactDock();
    initScrollAnimations();
    initSmoothScroll();
    initLightbox();
    initChatbot();
});
