// Vehicle Details Page Functionality

class VehicleDetails {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.animateProductionChart();
        this.setupSmoothScrolling();
        this.highlightCurrentSection();
    }

    bindEvents() {
        // Toggle advanced specifications
        const toggleSpecs = document.getElementById('toggleSpecs');
        if (toggleSpecs) {
            toggleSpecs.addEventListener('click', () => {
                this.toggleAdvancedSpecs();
            });
        }

        // Sidebar navigation
        const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    toggleAdvancedSpecs() {
        const advancedSpecs = document.querySelector('.advanced-specs');
        const toggleButton = document.getElementById('toggleSpecs');
        const toggleText = toggleButton.querySelector('span:first-child');
        const toggleIcon = toggleButton.querySelector('.toggle-icon');

        if (advancedSpecs.classList.contains('active')) {
            advancedSpecs.classList.remove('active');
            toggleText.textContent = 'Показать все характеристики';
            toggleIcon.style.transform = 'rotate(0deg)';
        } else {
            advancedSpecs.classList.add('active');
            toggleText.textContent = 'Скрыть детальные характеристики';
            toggleIcon.style.transform = 'rotate(180deg)';
        }
    }

    animateProductionChart() {
        const chartBars = document.querySelectorAll('.chart-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const value = parseInt(bar.getAttribute('data-value'));
                    const maxValue = 300; // Maximum value for scaling
                    const percentage = (value / maxValue) * 100;
                    
                    const barFill = bar.querySelector('.bar-fill');
                    barFill.style.height = `${percentage}%`;
                    
                    // Animate value counter
                    this.animateValue(bar.querySelector('.bar-value'), 0, value, 1500);
                    
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        chartBars.forEach(bar => observer.observe(bar));
    }

    animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    setupSmoothScrolling() {
        // This is handled by CSS scroll-behavior: smooth
        // Additional smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    highlightCurrentSection() {
        const sections = document.querySelectorAll('.content-section');
        const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '-100px 0px -50% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    // Utility method for loading modification data
    loadModificationData(modificationId) {
        // This would typically fetch data from an API
        // For now, it's a placeholder for future functionality
        console.log('Loading data for modification:', modificationId);
    }

    // Method to handle image gallery
    setupImageGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                // This would open a lightbox/modal with the full image
                // Placeholder for future gallery functionality
                console.log('Open image gallery');
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.vehicleDetails = new VehicleDetails();
});

// Additional utility functions
function formatNumber(number) {
    return new Intl.NumberFormat('ru-RU').format(number);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('ru-RU');
}

// Export for global access if needed
window.VehicleDetailsUtils = {
    formatNumber,
    formatDate
};
