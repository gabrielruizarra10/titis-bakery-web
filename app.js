const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scene = document.querySelector('#brand-scene');
const replay = document.querySelector('#replay');
const bloom = scene.querySelector('.bloom-mark');
const title = scene.querySelector('h1');
let welcomeAnimations = [];
const unfoldEase = 'cubic-bezier(.77,0,.175,1)';
const enterEase = 'cubic-bezier(.23,1,.32,1)';
function finishWelcome() {
  welcomeAnimations.forEach(animation => { animation.onfinish = null; animation.cancel(); });
  welcomeAnimations = [];
  scene.classList.remove('is-unfolding');
  replay.innerHTML = '<span aria-hidden="true">↻</span> Volver a sentir la magia';
}
function animateWelcome(element, frames, options) {
  const animation = element.animate(frames, { fill:'both', ...options });
  welcomeAnimations.push(animation);
  return animation;
}
function playWelcome() {
  finishWelcome();
  if (reduceMotion.matches) return;
  const row = scene.querySelector('.brand-lockup').getBoundingClientRect();
  const mark = bloom.getBoundingClientRect();
  const center = row.left + row.width / 2 - mark.left - mark.width / 2;
  const farSide = row.right - mark.right;
  scene.classList.add('is-unfolding');
  // A single flower blooms, rolls right, then opens the name as it returns home.
  animateWelcome(bloom, [
    {transform:`translateX(${center}px) rotate(-35deg) scale(.82)`,opacity:0,offset:0,easing:enterEase},
    {transform:`translateX(${center}px) rotate(0deg) scale(1)`,opacity:1,offset:.18},
    {transform:`translateX(${center}px) rotate(0deg) scale(1)`,opacity:1,offset:.28,easing:unfoldEase},
    {transform:`translateX(${farSide}px) rotate(180deg) scale(1)`,opacity:1,offset:.55,easing:unfoldEase},
    {transform:'translateX(0px) rotate(360deg) scale(1)',opacity:1,offset:.94},
    {transform:'translateX(0px) rotate(360deg) scale(1)',opacity:1,offset:1}
  ], {duration:5500,easing:'linear'});
  animateWelcome(title, [
    {clipPath:'inset(-15% 0 -15% 100%)',opacity:1},
    {clipPath:'inset(-15% 0 -15% 0%)',opacity:1}
  ], {delay:3000,duration:2200,easing:unfoldEase});
  animateWelcome(scene.querySelector('.portrait-wrap'), [
    {opacity:0,transform:'translateY(8px) scale(.96)'},
    {opacity:1,transform:'translateY(0) scale(1)'}
  ], {delay:4450,duration:1400,easing:enterEase});
  animateWelcome(scene.querySelector('.brand-tagline'), [
    {opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}
  ], {delay:4750,duration:1300,easing:enterEase});
  const finish = animateWelcome(scene.querySelector('.love-thread'), [
    {clipPath:'inset(0 100% 0 0)',opacity:0},{clipPath:'inset(0 0% 0 0)',opacity:1}
  ], {delay:5200,duration:1500,easing:unfoldEase});
  document.querySelectorAll('.hero-note,.side-note,.hero-bottom>p,.hero-bottom>.button,.scroll-hint').forEach((element,i)=>{
    animateWelcome(element,[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],
      {delay:4950+i*80,duration:1100,easing:enterEase});
  });
  finish.onfinish = finishWelcome;
  replay.innerHTML = '<span aria-hidden="true">↗</span> Ver la portada completa';
  if(document.hidden) welcomeAnimations.forEach(animation=>animation.pause());
}
document.addEventListener('visibilitychange',()=>welcomeAnimations.forEach(animation=>document.hidden?animation.pause():animation.play()));
try { if (!sessionStorage.getItem('titis-welcome-v4')) { playWelcome(); sessionStorage.setItem('titis-welcome-v4','yes'); } } catch { playWelcome(); }
replay.addEventListener('click',()=>{
  if(scene.classList.contains('is-unfolding')) finishWelcome();
  else { document.querySelector('#inicio').scrollIntoView({behavior:reduceMotion.matches?'instant':'smooth',block:'start'}); playWelcome(); }
});
scene.querySelector('.bloom-trigger').addEventListener('click',()=>{
  if(scene.classList.contains('is-unfolding')) finishWelcome();
  else playWelcome();
});
function updateMotion() { replay.hidden=reduceMotion.matches; if(reduceMotion.matches) finishWelcome(); }
updateMotion(); reduceMotion.addEventListener('change',updateMotion);
// A focused visitor should never have to wait for a decorative introduction.
document.querySelector('#inicio').addEventListener('focusin',event=>{
  if(event.target!==replay && !event.target.closest('.bloom-trigger') && scene.classList.contains('is-unfolding')) finishWelcome();
});
window.addEventListener('resize',()=>{if(scene.classList.contains('is-unfolding')) finishWelcome();});

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
