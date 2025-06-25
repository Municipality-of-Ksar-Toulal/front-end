// Global variables
let currentLanguage = 'en';
let translations = {};
let isLoading = true;

// Language flags mapping
const languageFlags = {
    'en': 'EN',
    'ar': 'AR',
    'fr': 'FR',
    'tz': 'ⵜⵣ'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

async function initializeApp() {
    try {
        // Show loading screen
        showLoading();

        // Load initial translations
        await loadTranslations(currentLanguage);

        // Initialize event listeners
        initializeEventListeners();

        // Initialize scroll animations
        initializeScrollAnimations();

        // Update UI with translations
        updateUI();

        // Hide loading screen
        hideLoading();

    } catch (error) {
        console.error('Error initializing app:', error);
        hideLoading();
    }
}

// Loading functions
function showLoading() {
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
}

function hideLoading() {
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    }
}

// Translation functions
async function loadTranslations(lang) {
    try {
        const response = await fetch(`translations/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load translations for ${lang}`);
        }
        translations = await response.json();
        return translations;
    } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to English if translation fails
        if (lang !== 'en') {
            return await loadTranslations('en');
        }
        throw error;
    }
}

function updateUI() {
    // Update all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(translations, key);
        if (translation) {
            element.textContent = translation;
        }
    });

    // Update language switcher
    updateLanguageSwitcher();

    // Update document direction and language
    updateDocumentDirection();
}

function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] ? current[key] : null;
    }, obj);
}

function updateLanguageSwitcher() {
    const currentLangElement = document.querySelector('.current-lang');
    if (currentLangElement) {
        currentLangElement.textContent = languageFlags[currentLanguage];
    }

    // Update active language option
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        const lang = option.getAttribute('data-lang');
        if (lang === currentLanguage) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function updateDocumentDirection() {
    const isRTL = currentLanguage === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;

    // Update body class for Arabic font
    // if (isRTL) {
    //     document.body.classList.add('font-arabic');
    // } else {
    //     document.body.classList.remove('font-arabic');
    // }
}

// Event listeners
function initializeEventListeners() {
    // Language switcher
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', async (e) => {
            const newLang = e.target.getAttribute('data-lang');
            if (newLang && newLang !== currentLanguage) {
                await changeLanguage(newLang);
            }
        });
    });

    // Navigation links
    const navLinks = document.querySelectorAll('[data-section]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = e.target.getAttribute('data-section');
            scrollToSection(sectionId);
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.nav-mobile');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Close mobile menu when clicking nav links
    const mobileNavLinks = document.querySelectorAll('.nav-mobile .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuBtn && mobileNav) {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);

    // Close language dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const languageSwitcher = document.querySelector('.language-switcher');
        if (languageSwitcher && !languageSwitcher.contains(e.target)) {
            // Language dropdown will close automatically due to CSS hover
        }
    });
}

// Language change function
async function changeLanguage(newLang) {
    if (newLang === currentLanguage) return;

    try {
        showLoading();
        currentLanguage = newLang;
        await loadTranslations(newLang);
        updateUI();
        hideLoading();

        // Store language preference
        localStorage.setItem('preferredLanguage', newLang);

    } catch (error) {
        console.error('Error changing language:', error);
        hideLoading();
    }
}

// Navigation functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;

        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
}

// Contact form handler
function handleContactForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    // Simulate form submission
    console.log('Form submitted:', data);

    // Show success message (you can customize this)
    alert(getNestedTranslation(translations, 'contact.success') || 'Message sent successfully!');

    // Reset form
    e.target.reset();
}

// Scroll animations
function initializeScrollAnimations() {
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

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.service-card, .news-card, .stat-card, .feature');
    animatedElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize preferred language from localStorage
function initializePreferredLanguage() {
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage && ['en', 'ar', 'fr', 'tz'].includes(preferredLanguage)) {
        currentLanguage = preferredLanguage;
    }
}

// Call this before initializing the app
initializePreferredLanguage();

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = () => {
        const links = document.querySelectorAll('[data-section]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = e.target.getAttribute('data-section');
                const element = document.getElementById(sectionId);
                if (element) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const elementPosition = element.offsetTop - headerHeight;

                    // Smooth scroll animation
                    const startPosition = window.pageYOffset;
                    const distance = elementPosition - startPosition;
                    const duration = 800;
                    let start = null;

                    function animation(currentTime) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = ease(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                    }

                    function ease(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t + b;
                        t--;
                        return -c / 2 * (t * (t - 2) - 1) + b;
                    }

                    requestAnimationFrame(animation);
                }
            });
        });
    };

    smoothScrollPolyfill();
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Performance optimization
const debouncedScrollHandler = debounce(handleHeaderScroll, 10);
window.removeEventListener('scroll', handleHeaderScroll);
window.addEventListener('scroll', debouncedScrollHandler);

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.nav-mobile');

        if (mobileMenuBtn && mobileNav && mobileNav.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    }
});

// Preload next language translations for better UX
function preloadTranslations() {
    const languages = ['en', 'ar', 'fr', 'tz'];
    languages.forEach(lang => {
        if (lang !== currentLanguage) {
            fetch(`translations/${lang}.json`)
                .then(response => response.json())
                .catch(error => console.log(`Preload failed for ${lang}:`, error));
        }
    });
}

// Preload translations after initial load
setTimeout(preloadTranslations, 2000);


const lat = 33.88911;
const lon = -5.59577;

// Create map, center and zoom
const map = L.map('map').setView([lat, lon], 16);

// Download a map layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker to the site
L.marker([lat, lon]).addTo(map)
  .bindPopup("Municipaliti Toulal")
  .openPopup();