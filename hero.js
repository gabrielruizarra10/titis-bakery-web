// CSS owns the timeline. JS only offers pause, focus safety and offscreen pause.
const intro=document.querySelector('.chocolate-intro');
if(intro){
  const control=intro.querySelector('.intro-motion-toggle');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let inViewport=true;
  control.hidden=reduced.matches;
  function complete(){intro.classList.add('intro-complete');}
  function updatePlayback(){intro.classList.toggle('intro-offscreen',document.hidden||!inViewport);}
  if(reduced.matches)complete();
  function setPaused(paused){
    intro.classList.toggle('intro-paused',paused);
    control.setAttribute('aria-pressed',String(paused));
    control.textContent=paused?'Reanudar animación':'Pausar animación';
    if(paused)complete();
  }
  control.addEventListener('click',()=>setPaused(control.getAttribute('aria-pressed')!=='true'));
  intro.addEventListener('focusin',complete);
  intro.querySelectorAll('a').forEach(link=>link.addEventListener('click',complete));
  document.addEventListener('visibilitychange',updatePlayback);
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      inViewport=entries[0].isIntersecting;
      updatePlayback();
      if(!inViewport)complete();
    },{threshold:0});
    observer.observe(intro);
  }
  reduced.addEventListener('change',()=>{control.hidden=reduced.matches;if(reduced.matches)complete();});
}
