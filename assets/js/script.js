/* ============================================
   JENCY B - PORTFOLIO JAVASCRIPT
   Complete Interactivity Engine
   ============================================ */

'use strict';

/* ============================================
   1. LOADING SCREEN
   ============================================ */
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    document.body.style.overflow = '';
    // Trigger hero animations after load
    initTypingAnimation();
    animateHeroEntrance();
  }, 2200);
  document.body.style.overflow = 'hidden';
});

/* ============================================
   2. CUSTOM CURSOR
   ============================================ */
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

let cursorX = 0, cursorY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursorDot.style.left = `${cursorX}px`;
  cursorDot.style.top = `${cursorY}px`;
});

// Smooth cursor outline with lerp
function animateCursor() {
  outlineX += (cursorX - outlineX) * 0.12;
  outlineY += (cursorY - outlineY) * 0.12;
  cursorOutline.style.left = `${outlineX}px`;
  cursorOutline.style.top = `${outlineY}px`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
document.querySelectorAll('a, button, .skill-card, .project-card, .gallery-item, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.style.width = '14px';
    cursorDot.style.height = '14px';
    cursorDot.style.background = '#ec4899';
    cursorOutline.style.width = '55px';
    cursorOutline.style.height = '55px';
    cursorOutline.style.borderColor = 'rgba(236, 72, 153, 0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.style.width = '8px';
    cursorDot.style.height = '8px';
    cursorDot.style.background = '';
    cursorOutline.style.width = '35px';
    cursorOutline.style.height = '35px';
    cursorOutline.style.borderColor = '';
  });
});

// Hide cursor on mobile
if ('ontouchstart' in window) {
  cursorDot.style.display = 'none';
  cursorOutline.style.display = 'none';
}

/* ============================================
   3. NAVBAR
   ============================================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

// Scroll event for navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileNav.setAttribute('aria-hidden', !isOpen);
});

// Close mobile nav on link click
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  }
});

// Active section highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ============================================
   4. DARK / LIGHT MODE
   ============================================ */
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-mode');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* ============================================
   5. PARTICLE SYSTEM
   ============================================ */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.getElementById('hero').addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
document.getElementById('hero').addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = (Math.random() - 0.5) * 0.8;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '124, 58, 237' : '6, 182, 212';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Mouse repulsion
    if (mouse.x && mouse.y) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        this.x -= dx * 0.03;
        this.y -= dy * 0.03;
      }
    }

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

// Initialize particles
for (let i = 0; i < 80; i++) {
  particles.push(new Particle());
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124, 58, 237, ${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ============================================
   6. TYPING ANIMATION
   ============================================ */
const typingTexts = [
  'Python Full Stack Developer',
  'Django & Flask Expert',
  'REST API Architect',
  'React Developer',
  'Database Engineer',
  'Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function initTypingAnimation() {
  const typingEl = document.getElementById('typingText');
  if (!typingEl) return;

  function type() {
    const currentText = typingTexts[textIndex];
    if (isDeleting) {
      typingEl.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 90;

    if (!isDeleting && charIndex === currentText.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      delay = 400;
    }

    typingTimeout = setTimeout(type, delay);
  }
  type();
}

/* ============================================
   7. HERO ENTRANCE ANIMATION
   ============================================ */
function animateHeroEntrance() {
  const heroElements = document.querySelectorAll('.hero-text > *');
  heroElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  });

  const heroImg = document.querySelector('.hero-img-wrapper');
  if (heroImg) {
    heroImg.style.opacity = '0';
    heroImg.style.transform = 'scale(0.85)';
    heroImg.style.transition = 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s';
    setTimeout(() => {
      heroImg.style.opacity = '1';
      heroImg.style.transform = 'scale(1)';
    }, 100);
  }
}

/* ============================================
   8. SCROLL REVEAL ANIMATIONS
   ============================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

// Apply staggered delays to grid children
function applyStaggeredDelays(selector, delayIncrement = 100) {
  const containers = document.querySelectorAll(selector);
  containers.forEach(container => {
    const children = container.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    children.forEach((child, i) => {
      child.dataset.delay = i * delayIncrement;
    });
  });
}

applyStaggeredDelays('.skills-grid', 80);
applyStaggeredDelays('.projects-grid', 120);
applyStaggeredDelays('.achievements-grid', 80);
applyStaggeredDelays('.services-grid', 100);
applyStaggeredDelays('.certs-grid', 80);
applyStaggeredDelays('.blog-grid', 100);
applyStaggeredDelays('.gallery-grid', 70);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ============================================
   9. ANIMATED COUNTERS
   ============================================ */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targets = entry.target.querySelectorAll('[data-target]');
      targets.forEach(el => animateCounter(el));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.getElementById('stats');
if (statsSection) counterObserver.observe(statsSection);

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = target >= 1000
      ? (current >= 1000 ? Math.floor(current / 1000) + 'K+' : Math.floor(current))
      : (target > 10 ? Math.floor(current) + '+' : Math.floor(current));
  }, 16);
}

/* ============================================
   10. SKILL BAR ANIMATIONS
   ============================================ */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      setTimeout(() => {
        fills.forEach(fill => fill.classList.add('animated'));
      }, 300);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

/* ============================================
   11. SKILLS TABS FILTER
   ============================================ */
const skillTabs = document.querySelectorAll('.skill-tab');
const skillCards = document.querySelectorAll('.skill-card');

skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    skillTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    const filter = tab.dataset.filter;

    skillCards.forEach((card, i) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      card.style.transition = `opacity 0.3s ease ${i * 0.05}s, transform 0.3s ease ${i * 0.05}s`;

      if (show) {
        card.style.display = '';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 50 + i * 40);
      } else {
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

/* ============================================
   12. PROJECTS FILTER
   ============================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach((card, i) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.transition = `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`;

      if (show) {
        card.style.display = '';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => { card.style.display = 'none'; }, 400);
      }
    });
  });
});

/* ============================================
   13. TESTIMONIALS SLIDER
   ============================================ */
const track = document.getElementById('testimonialsTrack');
const dots = document.querySelectorAll('.slider-dot');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
let currentSlide = 0;
let totalSlides = 2; // 4 cards, 2 at a time
let autoSlideTimer;

function getSlideWidth() {
  const card = track?.querySelector('.testimonial-card');
  return card ? card.offsetWidth + 32 : 0; // 32 = gap
}

function goToSlide(index) {
  if (!track) return;
  currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
  const offset = currentSlide * (getSlideWidth() * 2);
  track.style.transform = `translateX(-${offset}px)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

prevBtn?.addEventListener('click', () => {
  const prev = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
  goToSlide(prev);
  resetAutoSlide();
});

nextBtn?.addEventListener('click', () => {
  const next = (currentSlide + 1) % totalSlides;
  goToSlide(next);
  resetAutoSlide();
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(parseInt(dot.dataset.index));
    resetAutoSlide();
  });
});

function startAutoSlide() {
  autoSlideTimer = setInterval(() => {
    goToSlide((currentSlide + 1) % totalSlides);
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

// Touch/swipe for slider
let touchStartX = 0;
track?.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
track?.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) goToSlide((currentSlide + 1) % totalSlides);
    else goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
    resetAutoSlide();
  }
});

window.addEventListener('load', () => {
  setTimeout(() => { startAutoSlide(); }, 2500);
});

// Update slider on resize
window.addEventListener('resize', () => { goToSlide(currentSlide); });

/* ============================================
   14. GALLERY LIGHTBOX
   ============================================ */
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.getElementById('lightboxClose');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const emoji = item.dataset.emoji || '🖼️';
    // Find or create the emoji display
    let emojiEl = lightboxContent.querySelector('.lightbox-emoji');
    if (!emojiEl) {
      emojiEl = document.createElement('div');
      emojiEl.className = 'lightbox-emoji';
      emojiEl.style.fontSize = '8rem';
      lightboxContent.appendChild(emojiEl);
    }
    emojiEl.textContent = emoji;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  });

  // Keyboard support
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

/* ============================================
   15. CONTACT FORM
   ============================================ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

function validateField(id, errorId, rule, msg) {
  const field = document.getElementById(id);
  const error = document.getElementById(errorId);
  if (!field || !error) return true;

  if (!rule(field.value.trim())) {
    field.classList.add('error');
    error.textContent = msg;
    return false;
  }
  field.classList.remove('error');
  error.textContent = '';
  return true;
}

const validators = {
  name: { rule: v => v.length >= 2, msg: 'Please enter your full name (min 2 characters).' },
  email: { rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address.' },
  subject: { rule: v => v.length >= 3, msg: 'Please enter a subject (min 3 characters).' },
  message: { rule: v => v.length >= 20, msg: 'Please enter a message (min 20 characters).' }
};

// Real-time validation
Object.keys(validators).forEach(id => {
  const field = document.getElementById(id);
  if (!field) return;
  field.addEventListener('input', () => {
    const { rule, msg } = validators[id];
    validateField(id, `${id}Error`, rule, msg);
  });
  field.addEventListener('blur', () => {
    const { rule, msg } = validators[id];
    validateField(id, `${id}Error`, rule, msg);
  });
});

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;
  Object.keys(validators).forEach(id => {
    const { rule, msg } = validators[id];
    if (!validateField(id, `${id}Error`, rule, msg)) isValid = false;
  });

  if (!isValid) return;

  // Simulate form submission
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> <span>Sending...</span>';

  setTimeout(() => {
    formSuccess.classList.add('show');
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa fa-paper-plane" aria-hidden="true"></i> <span>Send Message</span>';
    setTimeout(() => { formSuccess.classList.remove('show'); }, 6000);
  }, 1800);
});

/* ============================================
   16. SMOOTH SCROLLING
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================
   17. BACK TO TOP
   ============================================ */
document.getElementById('back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   18. FLOATING ACTION BUTTON
   ============================================ */
document.getElementById('fabMain')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   19. PWA SUPPORT
   ============================================ */
let deferredPrompt;
const pwaBanner = document.getElementById('pwa-banner');
const pwaInstallBtn = document.getElementById('pwa-install-btn');
const pwaDismissBtn = document.getElementById('pwa-dismiss-btn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  setTimeout(() => { pwaBanner?.classList.add('show'); }, 5000);
});

pwaInstallBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  pwaBanner?.classList.remove('show');
});

pwaDismissBtn?.addEventListener('click', () => {
  pwaBanner?.classList.remove('show');
});

window.addEventListener('appinstalled', () => {
  pwaBanner?.classList.remove('show');
  deferredPrompt = null;
});

/* ============================================
   20. SERVICE WORKER REGISTRATION
   ============================================ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

/* ============================================
   21. PERFORMANCE: LAZY LOADING
   ============================================ */
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));
}

/* ============================================
   22. TILT EFFECT ON PROJECT CARDS
   ============================================ */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
  });
});

/* ============================================
   23. ANIMATED GRADIENT BG ON HERO
   ============================================ */
let gradientAngle = 135;
function animateGradient() {
  gradientAngle = (gradientAngle + 0.15) % 360;
  const hero = document.querySelector('.hero-bg-gradient');
  if (hero) {
    hero.style.background = `linear-gradient(${gradientAngle}deg, #0f0c29, #302b63, #24243e)`;
  }
  requestAnimationFrame(animateGradient);
}

// Only animate in dark mode to save battery
function checkGradientAnimation() {
  if (!document.body.classList.contains('light-mode')) {
    animateGradient();
  }
}
setTimeout(checkGradientAnimation, 2500);

/* ============================================
   24. KEYBOARD NAVIGATION
   ============================================ */
document.addEventListener('keydown', (e) => {
  // Tab trap for lightbox
  if (lightbox.classList.contains('open') && e.key === 'Tab') {
    e.preventDefault();
    lightboxClose.focus();
  }
});

/* ============================================
   25. SKILL CARD TOOLTIPS
   ============================================ */
skillCards.forEach(card => {
  const name = card.querySelector('.skill-name')?.textContent;
  const percent = card.querySelector('.skill-percent')?.textContent;
  if (name && percent) {
    card.setAttribute('title', `${name}: ${percent} proficiency`);
  }
});

/* ============================================
   26. DYNAMIC YEAR IN FOOTER
   ============================================ */
const yearEl = document.querySelector('.footer-copy span:first-child');
// Keep static 2024 from HTML, but update if needed
// If you want to always show current year:
// if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================
   27. SCROLL PROGRESS INDICATOR
   ============================================ */
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 3px; width: 0%;
  background: linear-gradient(90deg, #7c3aed, #06b6d4);
  z-index: 10001; transition: width 0.1s linear; border-radius: 0 2px 2px 0;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / total) * 100;
  progressBar.style.width = `${progress}%`;
});

/* ============================================
   28. SECTION ENTRANCE GLOW
   ============================================ */
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'box-shadow 0.6s ease';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(s => sectionObserver.observe(s));

/* ============================================
   29. CONSOLE EASTER EGG
   ============================================ */
console.log('%c👋 Hey there, fellow developer!', 'color: #7c3aed; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with 💜 by Jency B — Python Full Stack Developer', 'color: #06b6d4; font-size: 14px;');
console.log('%cInterested in collaborating? Reach out at jency@example.com', 'color: #f59e0b; font-size: 12px;');

/* ============================================
   30. ACCESSIBILITY: FOCUS MANAGEMENT
   ============================================ */
// Skip to content
const skipLink = document.createElement('a');
skipLink.href = '#about';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'sr-only';
skipLink.style.cssText = `
  position: fixed; top: 10px; left: 10px; z-index: 99999;
  padding: 0.5rem 1rem; background: var(--primary);
  color: white; border-radius: 8px; font-weight: 600;
`;
skipLink.addEventListener('focus', () => { skipLink.classList.remove('sr-only'); });
skipLink.addEventListener('blur', () => { skipLink.classList.add('sr-only'); });
document.body.prepend(skipLink);
