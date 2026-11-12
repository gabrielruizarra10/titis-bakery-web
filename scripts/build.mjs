import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const name of ['index.html','styles.css','motion.css','app.js','order-utils.js'])await copyFile(name,'dist/'+name);
await cp('assets','dist/assets',{recursive:true});
console.log('Static site ready in dist/');
