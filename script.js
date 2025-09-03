// ===== HANDBALL HUB — interactions (minimal, clean) =====

// --- Responsive nav (mobile) ---
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle && navList) {
  // toggle menu
  navToggle.addEventListener('click', () => {
    const show = navList.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', show ? 'true' : 'false');
  });

  // close menu after clicking a link (on mobile)
  navList.addEventListener('click', (e) => {
    if (e.target.matches('a')) {
      navList.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // press Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navList.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// --- Smooth in-page scrolling (respects reduced-motion) ---
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;

  e.preventDefault();
  target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
  // move focus for a11y
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  setTimeout(() => target.removeAttribute('tabindex'), 500);
});

// --- Lazy “reveal” effect for skill images (optional polish) ---
const skillImgs = document.querySelectorAll('#skills img');
if ('IntersectionObserver' in window && skillImgs.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('img-loaded');
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: '150px 0px' });
  skillImgs.forEach(img => io.observe(img));
}

// --- Small a11y helper for screen-reader-only text (if ever used) ---
(function addSROnly(){
  const s = document.createElement('style');
  s.textContent = `.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`;
  document.head.appendChild(s);
})();
