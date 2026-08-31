<div align="center">

  <!-- TYPEWRITER BANNER -->
  <a href="https://susejgo89.github.io/portafolio-personal/">
    <img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=26&duration=3000&pause=1000&color=A855F7&center=true&vCenter=true&multiline=false&width=700&height=70&lines=Susej+Gonzalez+%E2%80%A2+Portf%C3%B3lio+Profissional;Desenvolvedora+Front-End+%26+Agentes+de+IA;React.js+%E2%80%A2+Firebase+%E2%80%A2+Tailwind+%E2%80%A2+Python;Explore+meus+projetos+em+produ%C3%A7%C3%A3o!" alt="Susej Gonzalez Portfolio" />
  </a>

  <p align="center">
    <strong>Portafolio Web Personal & Hub de Proyectos de Software</strong><br>
    Construido con una arquitectura moderna en <em>Vanilla JavaScript</em>, <em>Tailwind CSS</em> y diseño <em>Dark Glassmorphism</em>, integrando soporte multi-idioma (ES / PT / EN) y un asistente virtual interactivo.
  </p>

  <!-- LIVE STATUS BADGES -->
  <p align="center">
    <a href="https://susejgo89.github.io/portafolio-personal/" target="_blank">
      <img src="https://img.shields.io/badge/Demo_en_Vivo-GitHub_Pages-22c55e?style=for-the-badge&logo=github&logoColor=white" alt="Live Demo" />
    </a>
    <a href="https://linkedin.com/in/susejgo" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
    </a>
    <a href="https://wa.me/5548991242305" target="_blank">
      <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp" />
    </a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Versión-2.0.0-8B5CF6?style=flat-square" alt="Version" />
    <img src="https://img.shields.io/badge/Licencia-MIT-38bdf8?style=flat-square" alt="License" />
    <img src="https://img.shields.io/badge/Diseño-Dark_Glassmorphism-a855f7?style=flat-square" alt="Design" />
    <img src="https://img.shields.io/badge/Idiomas-ES_|_PT_|_EN-10b981?style=flat-square" alt="Languages" />
  </p>

</div>

---

## 🌟 Características Principales del Portafolio

* 🌐 **Soporte Multi-idioma Dinámico (i18n):** Cambio instantáneo en caliente entre **Español**, **Portugués** e **Inglés** sin recargar la página, sincronizando descargas de CVs específicas para cada idioma.
* 🤖 **Asistente Virtual / Chatbot Interactivo:** Chatbot integrado en Vanilla JS con procesamiento de intenciones (*keywords matching*) para responder preguntas sobre proyectos, cursos de IA en SENAI/SC y tecnologías.
* 🖼️ **Visores Interactivos & Sliders:** Carruseles táctiles y soporte para visualización de capturas en alta resolución con modal Lightbox.
* 🎨 **Estética Visual Dark Glassmorphism:** Paleta de colores curada neón/violeta/cian, bordes translúcidos con `backdrop-blur` y animaciones fluidas con micro-interacciones.
* 📱 **Arquitectura 100% Responsiva:** Adaptado fluidamente a dispositivos móviles, tablets y monitores ultra-wide.
* ⚡ **Rendimiento & Cero Dependencias Pesadas:** Carga ultra rápida sin frameworks invasivos, utilizando Tailwind CSS optimizado e iconos SVG oficiales.

---

## 🏛️ Diagrama de Arquitectura

```mermaid
graph TD
    A[Usuario / Navegador] --> B[index.html - Estructura Semántica]
    B --> C[Tailwind CSS & style.css - Glassmorphism & Neon UI]
    B --> D[js/translations.js - Diccionario i18n ES / PT / EN]
    B --> E[js/main.js - Controlador Principal]
    
    E --> F[Language Switcher & CV Selector]
    E --> G[Chatbot Virtual Asistente]
    E --> H[Sliders de Proyectos & Lightbox Modal]
    E --> I[Mobile Menu & Scroll Reveal Animations]
    
    D -->|Inyecta textos & rutas de CV| B
    G -->|Responde dudas sobre proyectos| A
```

---

## 🚀 Proyectos en Producción & Repositorios

<table>
  <thead>
    <tr>
      <th>Proyecto</th>
      <th>Tipo / Estado</th>
      <th>Stack Tecnológico</th>
      <th>Enlaces</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>🏆 DominoPro</strong></td>
      <td><img src="https://img.shields.io/badge/En_Producción-22c55e?style=flat-square" alt="Producción" /></td>
      <td><code>React.js</code> <code>Tailwind CSS</code> <code>Firebase Firestore</code> <code>Auth</code></td>
      <td>
        <a href="https://dominopro1.com/" target="_blank">🌐 Demo</a> • 
        <a href="https://github.com/susejgo89/domino-pro-app" target="_blank">💻 Código</a>
      </td>
    </tr>
    <tr>
      <td><strong>📺 NexusRePlay</strong></td>
      <td><img src="https://img.shields.io/badge/En_Producción-22c55e?style=flat-square" alt="Producción" /></td>
      <td><code>JavaScript ES6+</code> <code>Tailwind</code> <code>Cloud Functions</code> <code>Gemini API</code></td>
      <td>
        <a href="https://sutechtvcorporativa.web.app/" target="_blank">🌐 Demo</a> • 
        <a href="https://github.com/susejgo89/sync-cast-app" target="_blank">💻 Código</a>
      </td>
    </tr>
    <tr>
      <td><strong>🤖 Agente IA de Prospección B2B</strong></td>
      <td><img src="https://img.shields.io/badge/Agente_Autónomo-8B5CF6?style=flat-square" alt="Agente" /></td>
      <td><code>Python 3</code> <code>Streamlit</code> <code>Google Gemini</code> <code>Places & Sheets API</code></td>
      <td>
        <a href="https://github.com/susejgo89/agente_prospeccion_maps_sheets" target="_blank">💻 Código en GitHub</a>
      </td>
    </tr>
    <tr>
      <td><strong>✨ Borderless Design & Party</strong></td>
      <td><img src="https://img.shields.io/badge/Web_Activa-22c55e?style=flat-square" alt="Web" /></td>
      <td><code>HTML5</code> <code>CSS3</code> <code>JavaScript</code> <code>SEO</code></td>
      <td>
        <a href="https://borderlessdesignandparty.com/" target="_blank">🌐 Demo</a>
      </td>
    </tr>
  </tbody>
</table>

---

## 🛠️ Stack Tecnológico

<div align="center">

  <!-- TECNOLOGÍAS FRONTEND -->
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />

  <br />

  <!-- BACKEND & IA -->
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/Google_Gemini_AI-8E75C2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white" alt="Streamlit" />

</div>

---

## 📂 Estructura del Repositorio

```bash
portafolio/
├── css/
│   └── style.css            # Clases utilitarias, animaciones glow y glassmorphism
├── js/
│   ├── main.js             # Controlador de eventos, chatbot, lightbox y sliders
│   └── translations.js     # Diccionario de textos en Español, Portugués e Inglés
├── images/
│   ├── borderless/         # Capturas de Borderless Design & Party
│   ├── dominopro*.png      # Capturas de DominoPro en producción
│   ├── nexusplay*.png      # Capturas de NexusRePlay Digital Signage
│   ├── prospector.png      # Mockup visual del Agente IA de Prospección
│   ├── logo_icon.png       # Isotipo optimizado de alta resolución
│   └── *.pdf               # Currículums oficiales en ES, PT y EN
├── index.html              # Estructura semántica principal y marcado i18n
├── GITHUB_PROFILE_README.md# Plantilla animada para el perfil principal de GitHub
└── README.md               # Documentación completa del proyecto
```

---

## 💻 Ejecución Local

Para clonar y visualizar este portafolio en tu entorno local:

```bash
# 1. Clonar el repositorio
git clone https://github.com/susejgo89/portafolio-personal.git

# 2. Entrar a la carpeta
cd portafolio-personal

# 3. Abrir con cualquier servidor local (ej. Live Server en VS Code o Python)
python3 -m http.server 8000
```

Abre en tu navegador: `http://localhost:8000`

---

## 📬 Contacto

<div align="center">
  <p><strong>Susej Gonzalez</strong> — Desenvolvedora Front-End & Agentes de IA</p>
  <p>
    <a href="https://linkedin.com/in/susejgo" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
    </a>
    <a href="https://wa.me/5548991242305" target="_blank">
      <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp" />
    </a>
    <a href="mailto:susejgo@gmail.com">
      <img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
    </a>
  </p>
</div>