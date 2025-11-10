/* Enhanced Notification Styles */
.enhanced-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-card);
    border: 1px solid rgba(220, 38, 38, 0.3);
    border-radius: var(--border-radius);
    padding: 0;
    z-index: 10000;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    transform: translateX(400px);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 320px;
    backdrop-filter: blur(10px);
}

.enhanced-notification.show {
    transform: translateX(0);
}

.notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: rgba(220, 38, 38, 0.1);
    border-bottom: 1px solid rgba(220, 38, 38, 0.2);
}

.notification-badge {
    background: var(--accent-primary);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
}

.notification-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1.5rem;
    cursor: pointer;
    transition: var(--transition);
}

.notification-close:hover {
    color: var(--accent-primary);
}

.notification-body {
    padding: 1.5rem;
}

.notification-body h3 {
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.notification-stats {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.notification-stats span {
    background: rgba(255, 255, 255, 0.05);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.notification-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-small {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
}

/* Button Particles */
.btn-particles {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
}

.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--accent-primary);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    animation: particleMove 1s ease-out forwards;
}

@keyframes particleMove {
    0% {
        transform: translate(0, 0);
        opacity: 1;
    }
    100% {
        transform: translate(var(--x), var(--y));
        opacity: 0;
    }
}

/* Timeline Animations */
.timeline-item-pre-animate {
    opacity: 0;
    transform: translateX(50px);
    transition: all 0.6s ease;
}

.timeline-item:nth-child(odd).timeline-item-pre-animate {
    transform: translateX(-50px);
}

.timeline-item.animated {
    opacity: 1;
    transform: translateX(0);
}

/* Loading State */
body:not(.loaded) {
    opacity: 0;
}

body.loaded {
    opacity: 1;
    transition: opacity 0.3s ease;
}

/* Floating Elements Animations */
.floating-element {
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { 
        transform: translateY(0px) rotate(0deg); 
    }
    50% { 
        transform: translateY(-20px) rotate(5deg); 
    }
}

/* Ensure all elements are visible */
.floating-elements,
.grid-overlay,
.hero-badge,
.scroll-indicator,
.scan-line,
.timeline::before,
.timeline-dot,
.card-glow,
.card-pattern,
.vehicle-badge,
.image-overlay,
.cta-background {
    display: block;
}

/* Fix for potential z-index issues */
.hero-content,
.navbar {
    position: relative;
    z-index: 10;
}

.floating-elements,
.grid-overlay {
    z-index: 1;
}
