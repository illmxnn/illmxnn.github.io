const root = document.documentElement;
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const themeButton = document.querySelector('.theme');
const themeIcon = themeButton.querySelector('.theme-icon');
const progress = document.querySelector('.progress span');

function updateThemeLabel() {
  const label = root.dataset.theme === 'light' ? themeButton.dataset.dark : themeButton.dataset.light;
  themeButton.setAttribute('aria-label', label);
  themeButton.title = label;
}

updateThemeLabel();
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = theme;
  try {
    localStorage.setItem('illmxnn-theme', theme);
  } catch {}
  updateThemeLabel();
  themeIcon.getAnimations().forEach(animation => animation.cancel());
  if (!motion.matches) {
    themeIcon.animate(
      [{ opacity: 0, transform: 'rotate(-80deg) scale(.6)' }, { opacity: 1, transform: 'none' }],
      { duration: 500, easing: 'cubic-bezier(.16, 1, .3, 1)' }
    );
  }
});

const menuButton = document.querySelector('.menu-trigger');
const menu = document.querySelector('.mobile-menu');
if (typeof menu.showModal === 'function') {
  menuButton.hidden = false;
  menuButton.addEventListener('click', () => {
    menu.showModal();
    menuButton.setAttribute('aria-expanded', 'true');
  });
  menu.querySelector('.menu-close').addEventListener('click', () => menu.close());
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.close()));
  menu.addEventListener('close', () => menuButton.setAttribute('aria-expanded', 'false'));
  window.matchMedia('(max-width: 760px)').addEventListener('change', event => {
    if (!event.matches && menu.open) menu.close();
  });
}

const previousAnchors = new Map([['projects', 'automations'], ['work', 'automations'], ['contacts', 'contact']]);
const languageLinks = document.querySelectorAll('.languages a');

function openLinkedAutomation() {
  const hash = window.location.hash.slice(1);
  const target = document.getElementById(previousAnchors.get(hash) ?? hash);
  if (target?.matches('.work-item summary')) target.parentElement.open = true;
  if (previousAnchors.has(hash)) target.scrollIntoView();
  for (const link of languageLinks) link.hash = window.location.hash;
}

function updateProgress() {
  const height = root.scrollHeight - root.clientHeight;
  const fraction = height > 0 ? window.scrollY / height : 0;
  progress.style.transform = 'scaleY(' + Math.min(1, Math.max(0, fraction)) + ')';
}

openLinkedAutomation();
updateProgress();
window.addEventListener('hashchange', openLinkedAutomation);
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
document.addEventListener('toggle', updateProgress, true);
document.fonts?.ready.then(updateProgress);

function splitHeroTitle() {
  const title = document.querySelector('.title-first');
  title.replaceChildren(...Array.from(title.textContent, (letter, index) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = letter;
    span.style.setProperty('--order', index);
    return span;
  }));
}

function startIntro() {
  let visited = false;
  try {
    visited = sessionStorage.getItem('illmxnn-glitch-intro') === 'seen';
    sessionStorage.setItem('illmxnn-glitch-intro', 'seen');
  } catch {}

  if (window.location.hash && window.location.hash !== '#top') return;
  if (motion.matches) return;

  splitHeroTitle();
  if (visited) {
    root.classList.add('hero-enter');
    return;
  }

  const boot = document.querySelector('.boot');
  const label = boot.querySelector('.boot-label');
  const count = boot.querySelector('.boot-count');
  const bar = boot.querySelector('.boot-track span');
  const text = label.textContent;
  const glyphs = text + '0123456789#/';
  const start = performance.now();
  const events = new AbortController();
  let frame;
  let closing = false;

  function hide() {
    boot.hidden = true;
    events.abort();
  }

  function dismiss(instant = false) {
    if (closing) {
      if (instant) hide();
      return;
    }
    closing = true;
    cancelAnimationFrame(frame);
    label.textContent = text;
    count.textContent = '100%';
    bar.style.transform = 'scaleX(1)';
    root.classList.add('hero-enter');
    if (instant || motion.matches) {
      hide();
      return;
    }
    boot.animate(
      [{ transform: 'translateY(0)' }, { transform: 'translateY(-101%)' }],
      { duration: 600, easing: 'cubic-bezier(.7, 0, .25, 1)' }
    ).finished.then(hide, hide);
  }

  function tick(now) {
    const elapsed = Math.min(1, (now - start) / 920);
    const resolved = Math.floor(elapsed * (text.length + 3));
    const eased = elapsed * elapsed * (3 - 2 * elapsed);
    label.textContent = Array.from(text, (letter, index) => index < resolved ? letter : glyphs[Math.floor(Math.random() * glyphs.length)]).join('');
    count.textContent = Math.floor(eased * 100) + '%';
    bar.style.transform = 'scaleX(' + eased + ')';
    if (elapsed < 1) frame = requestAnimationFrame(tick);
    else dismiss();
  }

  boot.hidden = false;
  frame = requestAnimationFrame(tick);
  const options = { signal: events.signal };
  boot.addEventListener('pointerdown', () => dismiss(true), options);
  document.addEventListener('focusin', () => dismiss(true), options);
  window.addEventListener('wheel', () => dismiss(true), { ...options, passive: true });
  motion.addEventListener('change', () => dismiss(true), options);
}

function revealOnScroll() {
  if (motion.matches || !('IntersectionObserver' in window)) return;

  for (const paragraph of document.querySelectorAll('[data-words]')) {
    const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let order = 0;
    for (const node of nodes) {
      const words = document.createDocumentFragment();
      for (const part of node.textContent.split(/(\s+)/)) {
        if (!part) continue;
        if (!part.trim()) {
          words.append(part);
        } else {
          const word = document.createElement('span');
          word.className = 'word';
          word.textContent = part;
          word.style.setProperty('--order', order++);
          words.append(word);
        }
      }
      node.replaceWith(words);
    }
  }

  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      target.classList.add('revealed');
      observer.unobserve(target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: .05 });

  for (const section of document.querySelectorAll('.chapter')) {
    section.dataset.animate = '';
    for (const target of section.querySelectorAll('[data-reveal]')) observer.observe(target);
  }
}

function bindMagneticButtons() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  for (const button of document.querySelectorAll('.magnet')) {
    let rect;
    button.addEventListener('pointerenter', () => {
      rect = button.getBoundingClientRect();
    });
    button.addEventListener('pointermove', event => {
      if (motion.matches || !rect) return;
      const x = (event.clientX - rect.left - rect.width / 2) * .18;
      const y = (event.clientY - rect.top - rect.height / 2) * .27;
      button.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    });
    button.addEventListener('pointerleave', () => {
      rect = null;
      button.style.transform = '';
    });
    motion.addEventListener('change', () => { button.style.transform = ''; });
  }
}

function drawPortrait() {
  const canvas = document.querySelector('.portrait canvas');
  const context = canvas.getContext('2d');
  if (!context) return;

  const size = canvas.width;
  const center = size / 2;
  const tau = Math.PI * 2;
  const segments = 76;
  const rings = 23;
  const shadeCount = 10;
  const coordinates = new Float32Array(rings * segments * 3);
  let frame = 0;
  let lastDraw = 0;
  let inView = true;
  let cursorX = 0;
  let cursorY = 0;
  let tiltX = 0;
  let tiltY = 0;

  function render(time) {
    const phase = time * .00028;
    tiltX += (cursorX - tiltX) * .16;
    tiltY += (cursorY - tiltY) * .16;
    const pitch = .94 + Math.sin(phase) * .13 + tiltY * .23;
    const roll = -.36 + Math.sin(phase * .7) * .24 + tiltX * .29;
    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch);
    const cosRoll = Math.cos(roll);
    const sinRoll = Math.sin(roll);
    context.clearRect(0, 0, size, size);

    for (let ring = 0; ring < rings; ring++) {
      const v = ring / rings * tau;
      const tube = 42 + Math.sin(v * 3 + phase) * 4;
      for (let step = 0; step < segments; step++) {
        const u = step / segments * tau;
        const ripple = Math.sin(u * 3 + phase * 2) * 15 + Math.cos(u * 6 - v + phase * 2) * 8;
        const radius = 113 + tube * Math.cos(v + u * 2) + ripple;
        const x = Math.cos(u) * radius;
        const y = Math.sin(u) * radius;
        const z = tube * Math.sin(v + u * 2) + Math.sin(u * 3 - phase * 2) * 20;
        const vertical = y * cosPitch - z * sinPitch;
        const depth = y * sinPitch + z * cosPitch;
        const perspective = 455 / (455 - depth);
        const index = (ring * segments + step) * 3;
        coordinates[index] = center + (x * cosRoll - vertical * sinRoll) * perspective;
        coordinates[index + 1] = center + (x * sinRoll + vertical * cosRoll) * perspective;
        coordinates[index + 2] = depth;
      }
    }

    const paths = Array.from({ length: shadeCount * 2 }, () => new Path2D());
    for (let ring = 0; ring < rings; ring++) {
      for (let step = 0; step < segments; step++) {
        const index = (ring * segments + step) * 3;
        const next = (ring * segments + (step + 1) % segments) * 3;
        const depth = coordinates[index + 2];
        const shade = Math.min(shadeCount - 1, Math.max(0, Math.floor((depth + 190) / 38)));
        const path = paths[shade * 2 + Number(ring % 5 === 0)];
        path.moveTo(coordinates[index], coordinates[index + 1]);
        path.lineTo(coordinates[next], coordinates[next + 1]);
      }
    }

    for (let shade = 0; shade < shadeCount; shade++) {
      context.strokeStyle = 'rgba(225,230,236,' + (.24 + shade * .073) + ')';
      context.lineWidth = 1;
      context.stroke(paths[shade * 2]);
      context.lineWidth = 1.7;
      context.stroke(paths[shade * 2 + 1]);
    }
  }

  function tick(time) {
    if (time - lastDraw >= 32) {
      render(time);
      lastDraw = time;
    }
    frame = requestAnimationFrame(tick);
  }

  function updatePlayback() {
    cancelAnimationFrame(frame);
    if (inView && !motion.matches && !document.hidden) frame = requestAnimationFrame(tick);
    else if (motion.matches) render(0);
  }

  canvas.parentElement.addEventListener('pointermove', event => {
    if (motion.matches || event.pointerType === 'touch') return;
    const rect = canvas.getBoundingClientRect();
    cursorX = (event.clientX - rect.left) / rect.width * 2 - 1;
    cursorY = (event.clientY - rect.top) / rect.height * 2 - 1;
  });
  canvas.parentElement.addEventListener('pointerleave', () => {
    cursorX = 0;
    cursorY = 0;
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(canvas);
  }
  document.addEventListener('visibilitychange', updatePlayback);
  motion.addEventListener('change', updatePlayback);
  render(0);
  updatePlayback();
}

startIntro();
revealOnScroll();
bindMagneticButtons();
drawPortrait();
