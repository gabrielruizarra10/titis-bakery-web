const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scene = document.querySelector('#brand-scene');
const replay = document.querySelector('#replay');
let sceneTimer;
function playWelcome() {
  if (reduceMotion.matches) return;
  clearTimeout(sceneTimer);
  scene.classList.remove('playing');
  void scene.offsetWidth;
  scene.classList.add('playing');
  sceneTimer = setTimeout(() => scene.classList.remove('playing'), 2400);
}
try { if (!sessionStorage.getItem('titis-welcome')) { playWelcome(); sessionStorage.setItem('titis-welcome', 'yes'); } } catch { playWelcome(); }
replay.addEventListener('click', playWelcome);
function updateMotion() { replay.hidden = reduceMotion.matches; if (reduceMotion.matches) scene.classList.remove('playing'); }
updateMotion(); reduceMotion.addEventListener('change', updateMotion);

// A once-only reveal, without hiding essential content or relying on animation to navigate.
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll('.section-heading, .product, .legacy-text, .celebration-copy, .steps li').forEach(el => { el.classList.add('reveal-ready'); observer.observe(el); });
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
