import { localDateKey, validateOrder, buildMessage } from './order-utils.js';
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const number = '50378777124';
const form = document.querySelector('#order-form');
const review = document.querySelector('#message-review');
const dateInput = document.querySelector('#event-date');
dateInput.min = localDateKey();

// Native navigation stays available without JavaScript; enhance only the mobile disclosure.
const menu = document.querySelector('#main-nav');
const menuButton = document.querySelector('.menu-toggle');
const mobile = matchMedia('(max-width: 760px)');
function closeMenu() { menuButton.setAttribute('aria-expanded','false'); menu.hidden = mobile.matches; }
closeMenu();
mobile.addEventListener('change',closeMenu);
menuButton.addEventListener('click',()=>{
  const open=menuButton.getAttribute('aria-expanded')==='true';
  menuButton.setAttribute('aria-expanded',String(!open)); menu.hidden=open;
});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{
  if(event.key==='Escape' && mobile.matches && !menu.hidden) {closeMenu();menuButton.focus();}
});
document.addEventListener('click',event=>{
  if(mobile.matches&&!menu.hidden&&!event.target.closest('.header'))closeMenu();
});

document.querySelectorAll('[data-order]').forEach(link=>{
  link.href='https://wa.me/'+number+'?text='+encodeURIComponent('Hola, Titi’s. Quisiera '+link.dataset.order+'.');
  link.target='_blank';link.rel='noopener noreferrer';
});
const filters=[...document.querySelectorAll('[data-filter]')];
const creations=[...document.querySelectorAll('.creation')];
filters.forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter;
  filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  let count=0;
  creations.forEach(item=>{
    const shown=filter==='all'||item.dataset.category.split(' ').includes(filter);
    item.hidden=!shown;
    if(shown) {item.classList.add('visible');count++;}
  });
  document.querySelector('#gallery-count').textContent=count+' '+(count===1?'momento para inspirarte':'momentos para inspirarte');
}));
function goToOrder() {
  review.hidden=true;
  document.querySelector('#pedidos').scrollIntoView({behavior:reduceMotion.matches?'instant':'smooth',block:'start'});
}
document.querySelectorAll('[data-inspire]').forEach(button=>button.addEventListener('click',()=>{
  const field=form.elements.design;
  if(!field.value.includes(button.dataset.inspire))field.value=(field.value?field.value+'\n':'')+button.dataset.inspire;
  goToOrder();
}));
document.querySelectorAll('[data-option]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();
  const field=form.elements.diet;
  if(!field.value.includes(link.dataset.option))field.value=(field.value?field.value+'\n':'')+'Quisiera consultar: '+link.dataset.option+'.';
  goToOrder();
}));

const dialog=document.querySelector('#photo-dialog');
let photoTrigger;
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{
  photoTrigger=button;
  const image=document.querySelector('#dialog-image');image.src=button.dataset.photo;image.alt=button.querySelector('img').alt;
  document.querySelector('#dialog-caption').textContent=button.dataset.caption;dialog.showModal();
}));
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const box=dialog.getBoundingClientRect();
  if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();
});
dialog.addEventListener('close',()=>photoTrigger?.focus({preventScroll:true}));

let photoURL='',photoName='';
const fileInput=document.querySelector('#inspiration-file');
function clearPhoto(resetInput = true) {
  if(photoURL)URL.revokeObjectURL(photoURL);
  photoURL='';photoName='';if(resetInput)fileInput.value='';
  document.querySelector('#file-preview').hidden=true;
  document.querySelector('#inspiration-preview').removeAttribute('src');
  document.querySelector('#file-status').textContent='';
  fileInput.removeAttribute('aria-invalid');
  review.hidden=true;
}
document.querySelector('#remove-file').addEventListener('click',()=>clearPhoto());
fileInput.addEventListener('change',()=>{
  const file=fileInput.files[0];
  clearPhoto(false);
  if(!file)return;
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>8*1024*1024) {
    document.querySelector('#file-status').textContent='Elige una imagen JPG, PNG o WebP de hasta 8 MB.';
    fileInput.setAttribute('aria-invalid','true');return;
  }
  photoName=file.name;photoURL=URL.createObjectURL(file);
  const image=document.querySelector('#inspiration-preview');
  image.onerror=()=>{clearPhoto();document.querySelector('#file-status').textContent='No pudimos leer esta imagen. Prueba con otra fotografía.';};
  image.src=photoURL;document.querySelector('#file-preview').hidden=false;
});
window.addEventListener('pagehide',()=>{if(photoURL)URL.revokeObjectURL(photoURL);});
const fieldIds={name:'customer-name',phone:'customer-phone',date:'event-date',occasion:'occasion',portions:'portions'};
function readOrder() {
  return Object.fromEntries(['name','phone','date','occasion','portions','flavor','design','diet'].map(key=>[key,form.elements[key].value.trim()]));
}
function clearErrors() {
  for(const key of Object.keys(fieldIds)) {
    const field=form.elements[key];field.removeAttribute('aria-invalid');field.removeAttribute('aria-describedby');
    document.querySelector('#error-'+key).textContent='';
  }
  document.querySelector('#form-errors').hidden=true;
}
form.addEventListener('input',()=>{review.hidden=true;clearErrors();});
form.addEventListener('change',()=>{review.hidden=true;clearErrors();});
form.addEventListener('submit',event=>{
  event.preventDefault();clearErrors();review.hidden=true;
  dateInput.min=localDateKey();
  const data=readOrder(),errors=validateOrder(data);
  if(Object.keys(errors).length) {
    const summary=document.querySelector('#form-errors');
    summary.replaceChildren(document.createTextNode('Revisemos estos detalles para preparar tu mensaje:'));
    const list=document.createElement('ul');
    for(const [key,message] of Object.entries(errors)) {
      const field=form.elements[key];field.setAttribute('aria-invalid','true');field.setAttribute('aria-describedby','error-'+key);
      document.querySelector('#error-'+key).textContent=message;
      const item=document.createElement('li'),link=document.createElement('a');
      link.href='#'+fieldIds[key];link.textContent=message;
      link.addEventListener('click',event=>{event.preventDefault();field.focus();});
      item.append(link);list.append(item);
    }
    summary.append(list);summary.hidden=false;summary.focus();return;
  }
  const message=buildMessage(data,photoName);
  document.querySelector('#message-preview').textContent=message;
  document.querySelector('#send-order').href='https://wa.me/'+number+'?text='+encodeURIComponent(message);
  document.querySelector('#review-photo-note').hidden=!photoName;
  review.hidden=false;review.focus({preventScroll:true});
  review.scrollIntoView({behavior:reduceMotion.matches?'instant':'smooth',block:'center'});
});

// Motion is an enhancement: hero copy and controls never wait behind an intro.
if('IntersectionObserver' in window&&!reduceMotion.matches) {
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }),{threshold:.08});
  document.querySelectorAll('.section-heading,.inclusive-intro,.option,.story-art,.story-copy,.steps li').forEach((element,i)=>{
    element.classList.add('reveal');element.style.setProperty('--delay',(i%3)*60+'ms');observer.observe(element);
  });
  reduceMotion.addEventListener('change',event=>{
    if(event.matches) {observer.disconnect();document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
  });
}
