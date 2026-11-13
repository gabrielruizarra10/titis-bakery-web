import {readFile,writeFile} from 'node:fs/promises';
const svg=(await readFile('assets/hero/logo-titi.svg','utf8')).replace('<svg ','<svg class="intro-mark" ');
const html=await readFile('index.html','utf8');
if(!html.includes('<!-- HERO-LOGO:START -->'))throw Error('Missing logo slot');
await writeFile('index.html',html.replace(/<!-- HERO-LOGO:START -->[\s\S]*?<!-- HERO-LOGO:END -->/,'<!-- HERO-LOGO:START -->'+svg+'<!-- HERO-LOGO:END -->'));
