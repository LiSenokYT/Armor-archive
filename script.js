class ArmorArchive {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupInteractiveElements();
        this.setupNavigation();
    }

    setupNavigation() {
        // Smooth scroll to sections
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.category-card, .stat-card, .filter-group').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    setupInteractiveElements() {
        // Tech preview interactions
        document.querySelectorAll('.preview-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.preview-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Explore buttons
        document.querySelectorAll('.explore-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const categoryCard = btn.closest('.category-card');
                const categoryName = categoryCard.querySelector('h3').textContent;
                alert(`Переход к категории: ${categoryName}\n\nЭто демо - в реальном сайте здесь будет переход к фильтрации по категории.`);
            });
        });

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.classList.add('focused');
        });

        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.classList.remove('focused');
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(searchInput.value);
            }
        });
    }

    performSearch(query) {
        if (query.trim()) {
            alert(`Поиск: "${query}"\n\nВ реальном сайте здесь будет поиск по базе данных техники.`);
        }
    }
}

// Global function for CTA button
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new ArmorArchive();
});

// Console welcome message
console.log(`
%cARMOR ARCHIVE v2.0 🚀
%cЭнциклопедия военной техники | Система инициализирована
`, 'color: #00f0ff; font-family: "Orbitron", monospace; font-size: 18px; font-weight: bold;', 
   'color: #00ff88; font-family: monospace; font-size: 12px;');