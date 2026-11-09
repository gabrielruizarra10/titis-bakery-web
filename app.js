const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scene = document.querySelector('#brand-scene');
const replay = document.querySelector('#replay');
const ink = [...scene.querySelectorAll('.ink-stroke')];
const pen = scene.querySelector('.angel-position');
const lengths = ink.map(path => path.getTotalLength());
// Overlapping ink gestures are independent of the angel's single continuous flight.
const inkTiming = [[800,2100],[1600,1400],[2100,1700],[2900,1200],[3300,1000],[3700,1400],[4200,2100],[5000,1500],[5500,1800],[6400,1300],[6900,1500],[2200,300],[3400,300],[7800,1800]];
const inkEase = 'linear';
let welcomeAnimations = [];
scene.classList.add('writing-ready');
function finishWelcome() {
  welcomeAnimations.forEach(animation => { animation.onfinish = null; animation.cancel(); });
  welcomeAnimations = [];
  scene.classList.remove('is-writing', 'playing');
  ink.forEach(path => { path.style.strokeDashoffset = '0'; });
  pen.style.opacity = '0';
  replay.innerHTML = '<span aria-hidden="true">↻</span> Volver a sentir la magia';
}
function playWelcome() {
  if (reduceMotion.matches) { finishWelcome(); return; }
  finishWelcome();
  ink.forEach((path, i) => {
    path.style.strokeDasharray = String(lengths[i]);
    path.style.strokeDashoffset = '0';
    welcomeAnimations.push(path.animate([{strokeDashoffset: String(lengths[i])}, {strokeDashoffset:'0'}], {delay:inkTiming[i][0],duration:inkTiming[i][1],easing:inkEase,fill:'both'}));
  });
  // Sample a gentle arc. Equal time spacing and a single easing keep velocity continuous.
  const flight = Array.from({length:121}, (_, i) => {
    const t = i / 120;
    const p = t * t * (3 - 2 * t);
    return { offset:t, transform:`translate(${36 + 905 * p}px, ${12 - 20 * Math.sin(Math.PI * p) - 8 * p}px) rotate(${-3 + 6 * p}deg)` };
  });
  welcomeAnimations.push(pen.animate(flight,{duration:11000,easing:'linear',fill:'both'}));
  const presence = pen.animate([{opacity:0,offset:0},{opacity:.85,offset:.12},{opacity:.85,offset:.8},{opacity:0,offset:1}],{duration:11000,easing:'linear',fill:'both'});
  presence.onfinish = finishWelcome;
  welcomeAnimations.push(presence);
  for (const wing of scene.querySelectorAll('.angel-wing')) {
    welcomeAnimations.push(wing.animate([{transform:'rotate(-2deg)'},{transform:'rotate(2deg)'}],{duration:2400,iterations:5,direction:'alternate',easing:'cubic-bezier(.77,0,.175,1)'}));
  }
  scene.classList.add('is-writing', 'playing');
  replay.innerHTML = '<span aria-hidden="true">↗</span> Ver el logo completo';
  if (document.hidden) welcomeAnimations.forEach(animation=>animation.pause());
}
document.addEventListener('visibilitychange',()=>{
  scene.toggleAttribute('data-paused',document.hidden);
  welcomeAnimations.forEach(animation=>document.hidden?animation.pause():animation.play());
});
try { if (!sessionStorage.getItem('titis-welcome-v3')) { playWelcome(); sessionStorage.setItem('titis-welcome-v3', 'yes'); } } catch { playWelcome(); }
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
