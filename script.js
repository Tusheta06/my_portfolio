/* ===================================================
   TUSHETA RAMAN — Personal Portfolio
   script.js — Interactions & Animations
   =================================================== */

/* ====================================================
   1. NAVBAR — Scroll & Hamburger
   ==================================================== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// Active nav link highlight on scroll
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--primary-light)';
    }
  });
}

/* ====================================================
   2. TYPED TEXT ANIMATION
   ==================================================== */
const typedEl = document.getElementById('typed-text');
const phrases = [
  'ECE Engineer 🔧',
  'Embedded Systems Dev 💡',
  'IoT Enthusiast 🌐',
  'AI/ML Explorer 🤖',
  'Creative Thinker 🎨',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 100;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeDelay = 50;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeDelay = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeDelay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeDelay = 400;
  }

  setTimeout(typeEffect, typeDelay);
}

setTimeout(typeEffect, 600);

/* ====================================================
   3. PARTICLE SYSTEM
   ==================================================== */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = [
    'rgba(124, 58, 237, 0.6)',
    'rgba(6, 182, 212, 0.6)',
    'rgba(167, 139, 250, 0.5)',
    'rgba(103, 232, 249, 0.5)',
    'rgba(245, 158, 11, 0.4)',
  ];

  const count = window.innerWidth < 768 ? 20 : 40;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 4 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      bottom: -10px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 3}px ${color};
    `;

    container.appendChild(particle);
  }
}

createParticles();

/* ====================================================
   4. SCROLL REVEAL ANIMATION
   ==================================================== */
function addRevealClasses() {
  // Section headers
  document.querySelectorAll('.section-header').forEach(el => el.classList.add('reveal'));

  // About
  document.querySelectorAll('.about-text').forEach(el => el.classList.add('reveal-left'));
  document.querySelectorAll('.about-details').forEach(el => el.classList.add('reveal-right'));
  document.querySelectorAll('.stat-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.detail-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
  });

  // Skills
  document.querySelectorAll('.skill-category').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.08}s`;
  });

  // Timeline
  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.classList.add('reveal-left');
    el.style.transitionDelay = `${i * 0.15}s`;
  });

  // Education
  document.querySelectorAll('.edu-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.12}s`;
  });

  // Projects
  document.querySelectorAll('.project-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
  });

  // Certs
  document.querySelectorAll('.cert-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.12}s`;
  });

  // Contact
  document.querySelectorAll('.contact-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.contact-form').forEach(el => el.classList.add('reveal-right'));
}

function revealOnScroll() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const windowHeight = window.innerHeight;

  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 80) {
      el.classList.add('visible');
    }
  });
}

addRevealClasses();
window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
setTimeout(revealOnScroll, 100);

/* ====================================================
   5. COUNTER ANIMATION (Stats)
   ==================================================== */
function animateCounter(el, target, decimals = 0, suffix = '') {
  const duration = 1800;
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

    const value = eased * target;
    el.textContent = decimals > 0
      ? value.toFixed(decimals) + suffix
      : Math.floor(value) + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(el => {
        const text = el.textContent.trim();
        const hasPlus = text.includes('+');
        const num = parseFloat(text);
        if (!isNaN(num)) {
          animateCounter(el, num, num % 1 !== 0 ? 2 : 0, hasPlus ? '+' : '');
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) statsObserver.observe(aboutStats);

/* ====================================================
   6. CONTACT FORM HANDLER
   ==================================================== */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  const successMsg = document.getElementById('form-success');

  // Animate button
  btn.innerHTML = '<span>Sending...</span>';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  // Simulate send (replace with real backend/emailJS integration)
  setTimeout(() => {
    btn.innerHTML = '<span>✓ Sent!</span>';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    successMsg.style.display = 'block';
    e.target.reset();

    setTimeout(() => {
      btn.innerHTML = '<span>Send Message</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg>';
      btn.style.background = '';
      btn.style.opacity = '';
      btn.disabled = false;
      successMsg.style.display = 'none';
    }, 4000);
  }, 1200);
}

/* ====================================================
   7. SMOOTH HOVER TILT on Project Cards
   ==================================================== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

/* ====================================================
   8. SKILL TAG HOVER SPARKLE
   ==================================================== */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.boxShadow = '0 0 12px rgba(124, 58, 237, 0.5)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.boxShadow = '';
  });
});

/* ====================================================
   9. PAGE LOAD HERO ANIMATION
   ==================================================== */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});

/* ====================================================
   10. ACTIVE SECTION HIGHLIGHT IN NAV
   ==================================================== */
const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--primary-light)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => navObserver.observe(section));

/* ====================================================
   11. CURSOR GLOW EFFECT (Desktop only)
   ==================================================== */
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: left 0.1s ease, top 0.1s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

console.log('%c✨ Tusheta Raman | Portfolio', 'color: #a78bfa; font-size: 18px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS & JavaScript', 'color: #67e8f9; font-size: 12px;');
