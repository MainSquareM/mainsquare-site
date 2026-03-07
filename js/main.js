/* ==============================================
   Main Square — Main JavaScript
   ============================================== */

// --- Language System ---
let currentLang = 'en';

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('msq-lang', lang);

    // Update active button
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-pt').classList.toggle('active', lang === 'pt');

    // Update html lang attribute
    document.documentElement.lang = lang === 'pt' ? 'pt' : 'en';

    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            el.innerHTML = text;
        }
    });
}

// Initialize language
function initLang() {
    const saved = localStorage.getItem('msq-lang');
    if (saved) {
        setLang(saved);
    } else {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang && browserLang.startsWith('pt')) {
            setLang('pt');
        } else {
            setLang('en');
        }
    }
}

// --- Navbar ---
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navMenuBtn = document.getElementById('navMenuBtn');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navMenuBtn) {
        navMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navMenuBtn.classList.toggle('active');
        });

        // Close mobile menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navMenuBtn.classList.remove('active');
            });
        });
    }
}

// --- Scroll Animations ---
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.feature-card, .tech-item, .coming-soon-card, .app-showcase'
    );

    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// --- Contact Form ---
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) return;

        // Create mailto link as fallback
        const subject = encodeURIComponent(`Contact from ${name} via mainsquare.pt`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:geral@mainsquare.pt?subject=${subject}&body=${body}`;
    });
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initNavbar();
    initScrollAnimations();
    initContactForm();
});
