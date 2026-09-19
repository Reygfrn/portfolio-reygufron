/* ─────────────────────────────────────────
   script.js  –  Portfolio Rey Gufron
   Modern Animation System
───────────────────────────────────────── */

/* ══════════════════════════════
   1. WELCOME SCREEN
══════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const ws = document.getElementById('welcome-screen');
    if (ws) {
      ws.classList.add('wl-exit');
      setTimeout(() => ws.remove(), 900);
    }
    startTyping();
  }, 2000);

  // Loading screen hilang setelah welcome selesai
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hide');
      setTimeout(() => loader.remove(), 700);
    }
    startTyping();
  }, 2800);
});

/* ══════════════════════════════
   2. HERO TYPING EFFECT
══════════════════════════════ */
function startTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const words = ['Web Developer', 'UI Designer', 'Laravel Developer', 'Problem Solver'];
  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();
}

/* ══════════════════════════════
   3. CURSOR GLOW
══════════════════════════════ */
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

/* ══════════════════════════════
   4. NAVBAR — scroll shrink & active
══════════════════════════════ */
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Shrink navbar on scroll
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Active link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

/* ══════════════════════════════
   5. SCROLL FADE-UP (stagger)
══════════════════════════════ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ══════════════════════════════
   6. HAMBURGER MENU
══════════════════════════════ */
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

/* ══════════════════════════════
   7. MODAL OPEN / CLOSE
══════════════════════════════ */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeModal(el) {
  el.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m));
  }
});

/* ══════════════════════════════
   8. SMOOTH SCROLL for nav links
══════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ══════════════════════════════
   9. CARD TILT EFFECT (subtle)
══════════════════════════════ */
document.querySelectorAll('.card, .project-card, .cert-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});