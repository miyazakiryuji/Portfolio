// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Active nav link on scroll
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// Fade-in on scroll
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Skill bar animation
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-item__fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 120);
      });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-list').forEach(l => barObserver.observe(l));

// Terminal typing animation
(function initTerminal() {
  const el = document.getElementById('termBody');
  if (!el) return;

  // Structured lines — type is used to build HTML spans
  const lines = [
    { html: `<span class="t-prompt">$ </span><span class="t-cmd">cat</span> <span class="t-string">profile.json</span>` },
    { blank: true },
    { html: `<span class="t-bracket">{</span>` },
    { html: `  <span class="t-key">"name"</span><span class="t-punct">: </span><span class="t-val">"宮﨑 竜治"</span><span class="t-punct">,</span>` },
    { html: `  <span class="t-key">"role"</span><span class="t-punct">: </span><span class="t-val">"Hybrid Software Engineer"</span><span class="t-punct">,</span>` },
    { html: `  <span class="t-key">"location"</span><span class="t-punct">: </span><span class="t-val">"Tokyo, Japan"</span><span class="t-punct">,</span>` },
    { html: `  <span class="t-key">"stack"</span><span class="t-punct">: [</span><span class="t-val">"Swift"</span><span class="t-punct">, </span><span class="t-val">"Flutter"</span><span class="t-punct">, </span><span class="t-val">"Go"</span><span class="t-punct">, </span><span class="t-val">"Python"</span><span class="t-punct">],</span>` },
    { html: `  <span class="t-key">"apps_released"</span><span class="t-punct">: </span><span class="t-number">3</span><span class="t-punct">,</span>` },
    { html: `  <span class="t-key">"sales_achievement"</span><span class="t-punct">: </span><span class="t-val">"150%"</span><span class="t-punct">,</span>` },
    { html: `  <span class="t-key">"currently"</span><span class="t-punct">: </span><span class="t-val">"富士ソフト + AI講師・副業"</span><span class="t-punct">,</span>` },
    { html: `  <span class="t-comment">// ビジネスと技術の両面を持つエンジニア</span>` },
    { html: `<span class="t-bracket">}</span>` },
    { blank: true },
    { cursor: true },
  ];

  // Respect reduced-motion: render all at once
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function appendLine(line) {
    const div = document.createElement('div');
    if (line.blank) {
      div.className = 't-blank';
    } else if (line.cursor) {
      div.innerHTML = `<span class="t-prompt">$ </span><span class="t-cursor"></span>`;
    } else {
      div.innerHTML = line.html;
    }
    el.appendChild(div);
  }

  if (reduced) {
    lines.forEach(appendLine);
    return;
  }

  // Animate: line by line with delay
  const delay = 60; // ms between lines
  lines.forEach((line, i) => {
    setTimeout(() => appendLine(line), i * delay + 400);
  });
})();
