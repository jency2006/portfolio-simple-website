// ===================================
// INITIALIZATION & DOM READY
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initializeParticles();
    initializeNavigation();
    initializeScrollAnimations();
    initializeFormValidation();
    initializeBackToTop();
    initializeTypingAnimation();
    hideLoadingSpinner();
});

// ===================================
// THEME TOGGLE (Dark/Light Mode)
// ===================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';

    // Set initial theme
    document.body.classList.add(savedTheme);

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-mode');

        if (isDarkMode) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });
}

// ===================================
// PARTICLE BACKGROUND
// ===================================
function initializeParticles() {
    const particleContainer = document.getElementById('particleContainer');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }

    // Create new particles periodically
    setInterval(() => {
        if (particleContainer.children.length < particleCount) {
            createParticle(particleContainer);
        }
    }, 1000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.animation = `float ${duration}s linear ${delay}s infinite`;

    container.appendChild(particle);

    // Remove particle after animation completes
    setTimeout(() => {
        particle.remove();
    }, (duration + delay) * 1000);
}

// ===================================
// NAVIGATION & SMOOTH SCROLLING
// ===================================
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling and active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            // Smooth scroll
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';

                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-bar')) {
                    entry.target.style.animation = 'skillFill 1s ease-out forwards';
                }

                // Trigger fade-in animations
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const elementsToAnimate = document.querySelectorAll('.about-card, .skill-card, .project-card, .fade-in');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// ===================================
// TYPING ANIMATION
// ===================================
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingElement.textContent;
    const speed = 100; // ms per character

    typingElement.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    // Start typing after page loads
    setTimeout(type, 500);
}

// ===================================
// FORM VALIDATION
// ===================================
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous messages
        const formMessage = document.getElementById('formMessage');
        formMessage.className = '';
        formMessage.textContent = '';

        // Validate form
        if (validateForm()) {
            // Show success message (in real app, send to server)
            showFormMessage('Message sent successfully! Thank you for reaching out.', 'success');
            form.reset();

            // Clear form fields
            clearFormErrors();
        }
    });

    // Real-time validation on input
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('focus', () => {
            clearFieldError(input);
        });
    });
}

function validateForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    let isValid = true;

    if (!validateField(nameInput)) isValid = false;
    if (!validateField(emailInput)) isValid = false;
    if (!validateField(subjectInput)) isValid = false;
    if (!validateField(messageInput)) isValid = false;

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.id;
    const errorElement = document.getElementById(`${fieldName}Error`);

    if (!value) {
        showFieldError(field, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
        return false;
    }

    if (fieldName === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }

    if (fieldName === 'name' && value.length < 2) {
        showFieldError(field, 'Name must be at least 2 characters');
        return false;
    }

    if (fieldName === 'subject' && value.length < 5) {
        showFieldError(field, 'Subject must be at least 5 characters');
        return false;
    }

    if (fieldName === 'message' && value.length < 10) {
        showFieldError(field, 'Message must be at least 10 characters');
        return false;
    }

    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.id}Error`);
    if (errorElement) {
        errorElement.textContent = message;
        field.style.borderColor = '#ef4444';
    }
}

function clearFieldError(field) {
    const errorElement = document.getElementById(`${field.id}Error`);
    if (errorElement) {
        errorElement.textContent = '';
        field.style.borderColor = '';
    }
}

function clearFormErrors() {
    const form = document.getElementById('contactForm');
    const errorElements = form.querySelectorAll('.form-error');
    errorElements.forEach(el => el.textContent = '');
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.className = '';
        formMessage.textContent = '';
    }, 5000);
}

// ===================================
// BACK TO TOP BUTTON
// ===================================
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// LOADING SPINNER
// ===================================
function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    setTimeout(() => {
        spinner.classList.add('hidden');
    }, 1500);
}

// ===================================
// ENHANCED ANIMATIONS ON SCROLL
// ===================================
window.addEventListener('scroll', () => {
    // Add scroll-based animations if needed
    updateScrollProgress();
});

function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // You can use this for a progress bar or other scroll-based effects
    // Example: Update a progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// ===================================
// PROJECT BUTTON HANDLERS
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const demoBtns = document.querySelectorAll('.btn-demo');
    const githubBtns = document.querySelectorAll('.btn-github');

    demoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Demo link would go here!');
        });
    });

    githubBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('GitHub link would go here!');
        });
    });
});

// ===================================
// SMOOTH PAGE TRANSITIONS
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===================================
// ACCESSIBILITY - KEYBOARD NAVIGATION
// ===================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ===================================
// WINDOW RESIZE HANDLER
// ===================================
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Lazy load images (if images are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// SKILL BAR ANIMATION TRIGGER
// ===================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                bar.style.animation = 'skillFill 1s ease-out forwards';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// ===================================
// PROJECT CARD ENHANCED INTERACTION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');

        // Add click interaction
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// ===================================
// TIMELINE ANIMATION
// ===================================
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const timelineItems = entry.target.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }, index * 100);
            });
            timelineObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

const journeySection = document.getElementById('journey');
if (journeySection) {
    timelineObserver.observe(journeySection);
}

// ===================================
// CONTACT FORM - ENHANCED UX
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const submitBtn = contactForm.querySelector('.btn-submit');

    // Add loading state
    contactForm.addEventListener('submit', function(e) {
        if (validateForm()) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
}

// ===================================
// SCROLL REVEAL FOR ELEMENTS
// ===================================
const revealElements = () => {
    const elements = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
};

revealElements();

// ===================================
// CURSOR POSITION TRACKING (Optional Enhancement)
// ===================================
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Can be used for parallax effects or cursor-following animations
    // Example: Update particle positions based on cursor
});

// ===================================
// UTILITY FUNCTIONS
// ===================================
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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// ENHANCED FOOTER INTERACTION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const footerLinks = document.querySelectorAll('footer a');

    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent default if href is #
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });
});

// ===================================
// EXPORT FOR TESTING (Optional)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        validateField,
        initTheme,
        initializeParticles,
        initializeNavigation
    };
}
