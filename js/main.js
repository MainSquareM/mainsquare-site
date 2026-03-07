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

// Initialize language from localStorage or browser preference
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

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = navLinks.querySelector(`a[href="#${id}"]`);

            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });
}

// --- Scroll Animations ---
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.value-card, .service-card, .process-step, .portfolio-item, .contact-grid'
    );

    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
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

        // Create mailto link as fallback (no backend)
        const subject = encodeURIComponent(`Contact from ${name} via mainsquare.pt`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:geral@mainsquare.pt?subject=${subject}&body=${body}`;
    });
}

// --- Smooth scroll for anchor links ---
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initNavbar();
    initScrollAnimations();
    initContactForm();
    initSmoothScroll();
});
