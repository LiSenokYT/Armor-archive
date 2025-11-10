// Main Application Class
class ArmorArchiveApp {
    constructor() {
        this.components = [];
        this.init();
    }

    init() {
        this.registerComponents();
        this.setupEventListeners();
        this.setupIntersectionObserver();
    }

    registerComponents() {
        this.components = [
            new HeroSlider(),
            new EnhancedFeaturedSlider(),
            new AnimatedCounter(),
            new TimelineAnimator(),
            new NavigationManager(),
            new ParticleSystem(),
            new CardAnimator(),
            new NotificationSystem()
        ];
    }

    setupEventListeners() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Prevent smooth scroll on resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            document.body.classList.add('resize-animation-stopper');
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                document.body.classList.remove('resize-animation-stopper');
            }, 400);
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Stagger children animations
                    const children = entry.target.querySelectorAll('[data-animate]');
                    children.forEach((child, index) => {
                        child.style.setProperty('--animation-delay', `${index * 100}ms`);
                        child.classList.add('animate-in');
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fade-up');
            observer.observe(section);
        });
    }

    closeAllModals() {
        document.querySelectorAll('.modal, .enhanced-notification').forEach(modal => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
    }
}

// Hero Background Slider
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.background-slide');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.isPaused = false;
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        
        this.startSlider();
        this.setupEventListeners();
        this.preloadImages();
    }

    preloadImages() {
        this.slides.forEach(slide => {
            const img = new Image();
            img.src = slide.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
        });
    }

    startSlider() {
        this.slideInterval = setInterval(() => {
            if (!this.isPaused) this.nextSlide();
        }, 5000);
    }

    nextSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }

    pauseSlider() {
        this.isPaused = true;
        clearInterval(this.slideInterval);
    }

    resumeSlider() {
        this.isPaused = false;
        this.startSlider();
    }

    setupEventListeners() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        hero.addEventListener('mouseenter', () => this.pauseSlider());
        hero.addEventListener('mouseleave', () => this.resumeSlider());

        // Touch events for mobile
        let touchStartX = 0;
        hero.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.pauseSlider();
        });

        hero.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) this.nextSlide();
                else this.prevSlide();
            }
            
            setTimeout(() => this.resumeSlider(), 3000);
        });
    }

    prevSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }
}

// Enhanced Featured Slider with Dots and Auto-play
class EnhancedFeaturedSlider {
    constructor() {
        this.track = document.querySelector('.slider-track');
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        this.isPaused = false;
        
        if (this.slides.length > 0) this.init();
    }

    init() {
        this.createDots();
        this.setupEventListeners();
        this.startAutoPlay();
        this.updateSlider();
    }

    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('div');
            dot.className = `slider-dot ${i === this.currentIndex ? 'active' : ''}`;
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    setupEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;
            
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Pause auto-play on hover
        const slider = document.querySelector('.featured-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => this.pauseAutoPlay());
            slider.addEventListener('mouseleave', () => this.resumeAutoPlay());
        }

        // Touch support
        let touchStartX = 0;
        if (this.track) {
            this.track.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                this.pauseAutoPlay();
            });

            this.track.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0) this.nextSlide();
                    else this.prevSlide();
                }
                
                setTimeout(() => this.resumeAutoPlay(), 3000);
            });
        }
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.updateSlider();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.updateSlider();
    }

    updateSlider() {
        if (this.track) {
            this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }
        this.updateDots();
        this.animateSlide();
    }

    updateDots() {
        if (!this.dotsContainer) return;
        
        const dots = this.dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    animateSlide() {
        this.slides.forEach((slide, index) => {
            slide.style.opacity = index === this.currentIndex ? '1' : '0.5';
            slide.style.transform = index === this.currentIndex ? 'scale(1)' : 'scale(0.95)';
        });
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (!this.isPaused) this.nextSlide();
        }, 6000);
    }

    pauseAutoPlay() {
        this.isPaused = true;
    }

    resumeAutoPlay() {
        this.isPaused = false;
    }
}

// Animated Counter with Performance Optimization
class AnimatedCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.hasAnimated = new Set();
        this.init();
    }

    init() {
        if (this.counters.length === 0) return;
        this.setupObserver();
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated.has(entry.target)) {
                    this.animateCounter(entry.target);
                    this.hasAnimated.add(entry.target);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '50px'
        });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

            counter.textContent = this.formatNumber(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = this.formatNumber(target);
            }
        };

        requestAnimationFrame(animate);
    }

    formatNumber(number) {
        return number.toLocaleString();
    }
}

// Timeline Animator with Stagger Effects
class TimelineAnimator {
    constructor() {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.init();
    }

    init() {
        if (this.timelineItems.length === 0) return;
        this.setupObserver();
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, delay);
                }
            });
        }, { threshold: 0.3 });

        this.timelineItems.forEach((item, index) => {
            item.setAttribute('data-delay', index * 200);
            item.classList.add('timeline-item-pre-animate');
            observer.observe(item);
        });
    }
}

// Navigation Manager with Smooth Scroll and Active States
class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupScrollSpy();
        this.setupNavScroll();
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.scrollToElement(target);
                }
            });
        });
    }

    scrollToElement(element) {
        const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = element.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    setupScrollSpy() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.setActiveNavLink(id);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '-20% 0px -20% 0px'
        });

        this.sections.forEach(section => observer.observe(section));
    }

    setActiveNavLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    setupNavScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(26, 26, 26, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'rgba(26, 26, 26, 0.9)';
            }

            // Hide/show navbar on scroll
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = window.scrollY;
        });
    }
}

// Particle System for Interactive Elements
class ParticleSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupButtonParticles();
        this.setupFloatingElements();
    }

    setupButtonParticles() {
        const buttons = document.querySelectorAll('.btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createButtonParticles(e, button);
            });
        });
    }

    createButtonParticles(event, button) {
        const rect = button.getBoundingClientRect();
        const particlesContainer = button.querySelector('.btn-particles') || this.createParticlesContainer(button);

        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const angle = Math.random() * Math.PI * 2;
                const distance = 20 + Math.random() * 30;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                particle.style.cssText = `
                    --x: ${x}px;
                    --y: ${y}px;
                `;

                particlesContainer.appendChild(particle);

                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 1000);
            }, i * 100);
        }
    }

    createParticlesContainer(button) {
        const container = document.createElement('div');
        container.className = 'btn-particles';
        button.appendChild(container);
        return container;
    }

    setupFloatingElements() {
        const elements = document.querySelectorAll('.floating-element');
        elements.forEach((element, index) => {
            element.style.setProperty('--float-delay', `${index * 0.5}s`);
        });
    }
}

// Card Animator with 3D Effects
class CardAnimator {
    constructor() {
        this.cards = document.querySelectorAll('.collection-card, .vehicle-card');
        this.init();
    }

    init() {
        this.setupCardHoverEffects();
        this.setupCardAnimations();
    }

    setupCardHoverEffects() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (window.innerWidth < 768) return;
                
                this.handleCardTilt(e, card);
            });

            card.addEventListener('mouseleave', () => {
                this.resetCardTilt(card);
            });
        });
    }

    handleCardTilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;

        card.style.transform = `
            perspective(1000px) 
            rotateX(${angleX}deg) 
            rotateY(${angleY}deg) 
            scale3d(1.02, 1.02, 1.02)
        `;

        // Parallax effect for inner elements
        const shine = card.querySelector('.card-glow');
        if (shine) {
            const posX = (x / rect.width) * 100;
            const posY = (y / rect.height) * 100;
            shine.style.background = `radial-gradient(circle at ${posX}% ${posY}%, rgba(220, 38, 38, 0.3), transparent)`;
        }
    }

    resetCardTilt(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        
        const shine = card.querySelector('.card-glow');
        if (shine) {
            shine.style.background = '';
        }
    }

    setupCardAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('card-visible');
                }
            });
        }, { threshold: 0.1 });

        this.cards.forEach(card => {
            card.classList.add('card-pre-animate');
            observer.observe(card);
        });
    }
}

// Notification System with Queue
class NotificationSystem {
    constructor() {
        this.queue = [];
        this.isShowing = false;
        this.init();
    }

    init() {
        // Global click handler for notification close buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('notification-close')) {
                this.closeNotification(e.target.closest('.enhanced-notification'));
            }
        });
    }

    showRandomVehicle() {
        const vehicles = [
            { 
                name: 'Т-14 "Армата"', 
                type: 'Основной боевой танк', 
                country: 'Россия', 
                year: '2015',
                description: 'Танк третьего поколения с необитаемой башней'
            },
            { 
                name: 'F-22 "Raptor"', 
                type: 'Истребитель', 
                country: 'США', 
                year: '2005',
                description: 'Стелс-истребитель пятого поколения'
            },
            { 
                name: 'Авианосец "Адмирал Кузнецов"', 
                type: 'Авианосец', 
                country: 'Россия', 
                year: '1990',
                description: 'Тяжёлый авианесущий крейсер'
            }
        ];
        
        const randomVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
        this.createNotification(randomVehicle);
    }

    createNotification(vehicle) {
        const notification = document.createElement('div');
        notification.className = 'enhanced-notification';
        notification.innerHTML = this.getNotificationHTML(vehicle);
        
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            this.closeNotification(notification);
        }, 5000);
    }

    getNotificationHTML(vehicle) {
        return `
            <div class="notification-content">
                <div class="notification-header">
                    <span class="notification-badge">СЛУЧАЙНАЯ ТЕХНИКА</span>
                    <button class="notification-close">×</button>
                </div>
                <div class="notification-body">
                    <h3>${vehicle.name}</h3>
                    <p class="notification-description">${vehicle.description}</p>
                    <div class="notification-stats">
                        <span>${vehicle.type}</span>
                        <span>${vehicle.country}</span>
                        <span>${vehicle.year}</span>
                    </div>
                </div>
                <div class="notification-footer">
                    <button class="btn btn-outline btn-small" onclick="app.components.find(c => c instanceof NavigationManager).scrollToElement(document.querySelector('#collections'))">
                        Изучить подробнее
                    </button>
                </div>
            </div>
        `;
    }

    closeNotification(notification) {
        if (!notification) return;
        
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Utility Functions
const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Global functions for HTML onclick attributes
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navManager = app.components.find(c => c instanceof NavigationManager);
        if (navManager) {
            navManager.scrollToElement(section);
        }
    }
}

function showRandomVehicle() {
    const notificationSystem = app.components.find(c => c instanceof NotificationSystem);
    if (notificationSystem) {
        notificationSystem.showRandomVehicle();
    }
}

// CSS for resize animation stopper
const resizeAnimationStopper = `
.resize-animation-stopper * {
    animation: none !important;
    transition: none !important;
}
`;

// Initialize application when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    // Add resize animation stopper styles
    const style = document.createElement('style');
    style.textContent = resizeAnimationStopper;
    document.head.appendChild(style);

    // Initialize main application
    app = new ArmorArchiveApp();

    // Add loaded class to body for initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ArmorArchiveApp };
}
