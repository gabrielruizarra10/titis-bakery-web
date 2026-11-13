import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
const svg=await readFile('assets/hero/logo-titi.svg','utf8');
const html=await readFile('index.html','utf8');
assert(!/<(?:image|script|foreignObject)\b/i.test(svg),'Logo must contain actual vector paths, without raster/script payloads');
assert(!/\bhref\s*=/i.test(svg),'Logo must not fetch external resources');
assert(svg.includes('viewBox="0 0 184 236"'),'Keep the source proportions');
const inline=html.split('<!-- HERO-LOGO:START -->')[1]?.split('<!-- HERO-LOGO:END -->')[0];
assert.equal(inline,svg.replace('<svg ','<svg class="intro-mark" '),'Run node scripts/sync-hero.mjs after regenerating the SVG');
const shared=['index.html','styles.css','motion.css','hero.css','hero.js','app.js','order-utils.js','assets/fonts/bodoni-moda-latin-400-normal.woff2','assets/fonts/karla-latin-400-normal.woff2'];
let common=0;for(const file of shared)common+=(await stat(file)).size;
for(const background of ['bg-betun.webp','bg-betun-mobile.webp']){
  const bytes=common+(await stat('assets/hero/'+background)).size;
  assert(bytes<400000,'Initial HTML/styles/scripts/fonts/background exceed the 400 KB raw budget');
  console.log(background+': '+bytes+' bytes including HTML, shared CSS/JS and local fonts (excludes below-fold photos and HTTP headers).');
}
console.log('Vector safety, synchronized inline logo and responsive cover budgets passed.');
