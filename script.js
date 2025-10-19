// Smooth scroll for navigation links
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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(29, 36, 40, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(29, 36, 40, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateElements = document.querySelectorAll('.feature, .problem-card, .stat-card, .step');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Track CTA clicks (you can integrate with analytics)
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Add analytics tracking here if needed
        console.log('CTA clicked:', button.textContent);
        
        // Optional: Add a visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Initialize hero text animations
document.addEventListener('DOMContentLoaded', () => {
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Mobile menu toggle (if needed in future)
// You can add a hamburger menu for mobile navigation here

// Performance: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// FAQ Toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});

// Player/Coach selector functionality
document.addEventListener('DOMContentLoaded', () => {
    const selectorCards = document.querySelectorAll('.selector-card');
    
    selectorCards.forEach(card => {
        card.addEventListener('click', () => {
            const role = card.dataset.role;
            
            // Remove selected class from all cards
            selectorCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            card.classList.add('selected');
            
            // Scroll to appropriate section
            setTimeout(() => {
                if (role === 'player') {
                    // Scroll to features section (Find Walls and Nets Anywhere)
                    document.getElementById('features').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else if (role === 'coach') {
                    // Scroll to coach section (Track Your Team's Progress)
                    document.getElementById('coach-section').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300);
        });
    });
});

// Email form handling
const emailForm = document.getElementById('emailForm');
if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = emailForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Here you would normally send this to your backend/email service
        // For now, we'll just show a success message
        console.log('Email submitted:', email);
        
        // Show success feedback
        const button = emailForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = '✓ Subscribed!';
        button.style.background = 'var(--primary-volt)';
        button.style.color = 'var(--secondary-gray)';
        
        // Reset form
        emailInput.value = '';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 3000);
        
        // TODO: Integrate with your email service (Mailchimp, ConvertKit, etc.)
        // Example:
        // fetch('YOUR_EMAIL_SERVICE_ENDPOINT', {
        //     method: 'POST',
        //     body: JSON.stringify({ email }),
        //     headers: { 'Content-Type': 'application/json' }
        // });
    });
}

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        }
    }, 16);
};

// Observe stats section and trigger counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    const text = stat.textContent.replace(/[^0-9]/g, '');
                    const target = parseInt(text);
                    stat.textContent = '0';
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.social-proof');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Slideshow functionality
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.slide-nav.prev');
    const nextButton = document.querySelector('.slide-nav.next');
    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Show slide function
    function showSlide(index) {
        // Wrap around
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    // Next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners for buttons
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }

    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Touch/swipe support
    const slideshowWrapper = document.querySelector('.slideshow-wrapper');
    if (slideshowWrapper) {
        slideshowWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slideshowWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50; // minimum distance for a swipe
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - show next
                nextSlide();
            } else {
                // Swiped right - show previous
                prevSlide();
            }
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Optional: Auto-play (uncomment to enable)
    const autoPlayInterval = 4000; // 4 seconds
    let autoPlay = setInterval(nextSlide, autoPlayInterval);
    
    // Pause auto-play on hover
    if (slideshowWrapper) {
        slideshowWrapper.addEventListener('mouseenter', () => {
             clearInterval(autoPlay);
         });
         
         slideshowWrapper.addEventListener('mouseleave', () => {
             autoPlay = setInterval(nextSlide, autoPlayInterval);
         });
     }
});

