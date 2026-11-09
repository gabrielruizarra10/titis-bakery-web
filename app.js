const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scene = document.querySelector('#brand-scene');
const replay = document.querySelector('#replay');
const svgNS = 'http://www.w3.org/2000/svg';
const ink = [...scene.querySelectorAll('.ink-stroke')];
const pen = scene.querySelector('.angel-position');
const dust = scene.querySelector('.fairy-dust');
const lengths = ink.map(path => path.getTotalLength());
const writingLength = lengths.slice(0, -1).reduce((a, b) => a + b, 0);
const durations = lengths.map((length, i) => i === lengths.length - 1 ? 1100 : length / writingLength * 5400);
const starts = durations.map((_, i) => durations.slice(0, i).reduce((a, b) => a + b, 0) + 650);
const totalDuration = 7900;
let welcomeFrame, elapsed = 0, lastFrame = 0, lastDust = 0;
let particles = [];
scene.classList.add('writing-ready');
function finishWelcome() {
  cancelAnimationFrame(welcomeFrame);
  scene.classList.remove('is-writing', 'playing');
  ink.forEach(path => { path.style.strokeDashoffset = '0'; });
  pen.style.opacity = '0';
  dust.replaceChildren(); particles = [];
  replay.innerHTML = '<span aria-hidden="true">↻</span> Volver a sentir la magia';
}
function drawWelcome(now) {
  if (document.hidden) { lastFrame = 0; welcomeFrame = requestAnimationFrame(drawWelcome); return; }
  if (lastFrame) elapsed += Math.min(now - lastFrame, 64);
  lastFrame = now;
  let current = 0;
  ink.forEach((path, i) => {
    const progress = Math.max(0, Math.min(1, (elapsed - starts[i]) / durations[i]));
    path.style.strokeDashoffset = String(lengths[i] * (1 - progress));
    if (elapsed >= starts[i]) current = i;
  });
  const progress = Math.max(0, Math.min(1, (elapsed - starts[current]) / durations[current]));
  const p = ink[current].getPointAtLength(lengths[current] * progress);
  const enter = Math.min(1, elapsed / 650);
  const exit = Math.max(0, (elapsed - 7200) / 700);
  const x = p.x - 42 - (1 - enter) * 80 + exit * 100;
  const y = p.y - Math.sin(elapsed / 170) * 2 - exit * 110;
  pen.setAttribute('transform', `translate(${x} ${y}) rotate(${Math.sin(elapsed / 320) * 5} 0 -20)`);
  pen.style.opacity = String(Math.min(enter, 1 - exit));
  if (elapsed > 650 && elapsed < 7200 && elapsed - lastDust > 75) {
    const star = document.createElementNS(svgNS, 'use');
    star.setAttribute('href', '#ink-star'); dust.append(star);
    particles.push({ element: star, x: p.x, y: p.y, born: elapsed }); lastDust = elapsed;
  }
  particles = particles.filter(particle => {
    const age = (elapsed - particle.born) / 900;
    if (age >= 1) { particle.element.remove(); return false; }
    particle.element.setAttribute('transform', `translate(${particle.x - age * 15} ${particle.y + age * 24}) rotate(${age * 90}) scale(${.4 * (1 - age) + .05})`);
    particle.element.style.opacity = String(1 - age); return true;
  });
  if (elapsed < totalDuration) welcomeFrame = requestAnimationFrame(drawWelcome);
  else finishWelcome();
}
function playWelcome() {
  if (reduceMotion.matches) { finishWelcome(); return; }
  finishWelcome(); elapsed = 0; lastFrame = 0; lastDust = 0;
  ink.forEach((path, i) => { path.style.strokeDasharray = String(lengths[i]); path.style.strokeDashoffset = String(lengths[i]); });
  scene.classList.add('is-writing', 'playing');
  replay.innerHTML = '<span aria-hidden="true">↗</span> Ver el logo completo';
  welcomeFrame = requestAnimationFrame(drawWelcome);
}
try { if (!sessionStorage.getItem('titis-welcome-v2')) { playWelcome(); sessionStorage.setItem('titis-welcome-v2', 'yes'); } } catch { playWelcome(); }
replay.addEventListener('click', () => {
  if (scene.classList.contains('is-writing')) finishWelcome();
  else { document.querySelector('#inicio').scrollIntoView({ behavior: reduceMotion.matches ? 'instant' : 'smooth', block: 'start' }); playWelcome(); }
});
function updateMotion() { replay.hidden = reduceMotion.matches; if (reduceMotion.matches) finishWelcome(); }
updateMotion(); reduceMotion.addEventListener('change', updateMotion);

// A once-only reveal, without hiding essential content or relying on animation to navigate.
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.section-heading, .product, .legacy-label, .legacy-text, .legacy-signature, .celebration-photo, .celebration-copy, .how-title, .steps li, .order > *, footer > *').forEach((el, i) => {
    el.classList.add('reveal-ready');
    el.style.setProperty('--reveal-delay', `${(i % 3) * 70}ms`);
    observer.observe(el);
  });
}

const number = '50378777124';
document.querySelectorAll('[data-order]').forEach(link => {
  link.href = `https://wa.me/${number}?text=${encodeURIComponent(`Hola, vi la página de Titi’s Cakes y quisiera ${link.dataset.order}. ¿Me pueden ayudar?`)}`;
  link.target = '_blank'; link.rel = 'noopener noreferrer';
});

const memoryButton = document.querySelector('#memory-button');
const memoryNote = document.querySelector('#memory-note');
memoryButton.addEventListener('click', () => {
  const opened = memoryButton.getAttribute('aria-expanded') === 'true';
  memoryButton.setAttribute('aria-expanded', String(!opened));
  memoryNote.hidden = opened;
  memoryButton.querySelector('span').textContent = opened ? '♡' : '♥';
  document.querySelector('#memory-status').textContent = opened ? '' : 'El amor encuentra mil maneras de seguir aquí. Siempre, Titi.';
  if (!opened && !reduceMotion.matches) memoryNote.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 250, easing: 'cubic-bezier(.23,1,.32,1)' });
});

const dialog = document.querySelector('#photo-dialog');
const dialogImage = document.querySelector('#dialog-image');
let photoTrigger;
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
  photoTrigger = button;
  dialogImage.src = button.dataset.photo;
  dialogImage.alt = button.querySelector('img').alt;
  document.querySelector('#dialog-caption').textContent = button.dataset.caption;
  dialog.showModal();
  if (!reduceMotion.matches) dialog.animate([{ opacity: 0, transform: 'scale(.96)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 250, easing: 'cubic-bezier(.23,1,.32,1)' });
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  }
});
dialog.addEventListener('close', () => photoTrigger?.focus({ preventScroll: true }));
