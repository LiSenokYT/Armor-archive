// Main JavaScript for Archive Broni website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initCounterAnimation();
    initDomainCards();
    initFeaturedCards();
    initSearch();
});

// Navigation functionality
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Smooth scrolling for navigation links
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinksItems.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                }
            }
        });
    });
    
    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Scroll animations and effects
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.domain-card, .featured-card, .stat-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add visible class handler
    const visibleHandler = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    elementsToAnimate.forEach(el => visibleHandler.observe(el));
    
    // Add CSS for visible state
    const style = document.createElement('style');
    style.textContent = `
        .domain-card.visible,
        .featured-card.visible,
        .stat-item.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Animated counter for statistics
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(function() {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current).toLocaleString();
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Domain cards interaction
function initDomainCards() {
    const domainCards = document.querySelectorAll('.domain-card');
    
    domainCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
        
        // Click handler for domain cards
        card.addEventListener('click', function() {
            const domain = this.getAttribute('data-domain');
            // Redirect to catalog page with filter (to be implemented)
            window.location.href = `/catalog?domain=${domain}`;
        });
    });
}

// Featured cards interaction
function initFeaturedCards() {
    const featuredCards = document.querySelectorAll('.featured-card');
    
    featuredCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('card-btn')) {
                const vehicleName = this.querySelector('.card-title').textContent;
                // Redirect to vehicle detail page (to be implemented)
                window.location.href = `/vehicle/${encodeURIComponent(vehicleName.toLowerCase())}`;
            }
        });
        
        // Button click handler
        const button = card.querySelector('.card-btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const vehicleName = card.querySelector('.card-title').textContent;
                window.location.href = `/vehicle/${encodeURIComponent(vehicleName.toLowerCase())}`;
            });
        }
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                // Redirect to search results (to be implemented)
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Utility function for loading states
function setLoadingState(element, isLoading) {
    if (isLoading) {
        element.classList.add('loading');
        element.disabled = true;
    } else {
        element.classList.remove('loading');
        element.disabled = false;
    }
}

// Export functions for global access (if needed)
window.ArchiveBroni = {
    initNavigation,
    initScrollEffects,
    initCounterAnimation,
    initDomainCards,
    initFeaturedCards,
    initSearch
};
