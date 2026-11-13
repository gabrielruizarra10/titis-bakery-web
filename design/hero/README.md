# Apertura de betún · 12 de noviembre de 2026

## Recursos y procedencia

- `hero-original.png`: imagen aplanada del propietario, 1024 × 572.
- `cream-mask.png`: umbral RGB (R>215, G>190, B>165), sin inferir instrucciones de la imagen.
- `inpaint-mask.png`: relleno de la silueta y dilatación de 7 px para retirar también contornos oscuros y bordes del texto.
- `bg-retouched.png`: edición de fondo con la herramienta integrada de imagen, 1678 × 937. Se eliminaron el logo y el texto. El fondo es una reconstrucción, no una recuperación exacta de los píxeles originalmente tapados.
- `../../assets/hero/bg-betun.webp`: 2400 × 1341, 212750 bytes.
- `../../assets/hero/bg-betun-mobile.webp`: recorte vertical 1200 × 2133, 111642 bytes.
- `../../assets/hero/logo-titi.svg`: VTracer, paths reales sobre el umbral original, fondo transparente, 38972 bytes. Contorno, moño y trazado de cabello/rasgos separados. El relleno conserva la topología completa de la máscara para evitar redibujar ojos o boca.

Se probaron OpenCV Telea, Navier–Stokes y mezcla Poisson con textura del propio original. Dejaban manchas o uniones visibles; por eso no se publican esas pruebas. El fondo final se limpió con **imagegen integrado**, sin CLI/API keys. No se generó el logo, una persona ni un producto del catálogo. No se usa la imagen completa con el texto incrustado como respaldo, porque las capas finales permiten texto HTML y movimiento independiente.

El SVG es una vectorización suavizada de un raster pequeño, no un archivo maestro ni una reproducción idéntica píxel a píxel. Se comprobó superpuesto al original en `compare.html`. Se omite el parpadeo para conservar la expresión. El export de escritorio es un escalado del recurso reconstruido; no añade detalle óptico nativo de 2400 px.

## Prompt final de edición

Modo: edición integrada. Imagen de entrada: el original del propietario. Fondo opaco.

> Use case: precise-object-edit. Asset type: clean website background plate. Edit the supplied chocolate frosting photograph by removing ONLY the entire cream baby-face-and-bow logo and the cream words Titi’s Cakes. Reconstruct believable matching chocolate buttercream where the logo and letters were. Preserve the same rich dark brown color, lighting, swirls, folds, peaks, tiny pores and palette knife texture across the original image. The result must be a continuous appetizing chocolate frosting photograph, edge to edge. No logo, no text, no face, no bow, no graphics, no extra objects, no frame. Avoid blurry flat patches, clone seams, ghost letters and patterned repetitions. Keep the original broad composition of chocolate swirls as closely as possible. Landscape aspect ratio matching the reference. This is background cleanup only; do not produce or reinterpret the brand artwork.

## Reproducción del procesamiento

Pillow ya estaba instalado. Las herramientas editoriales se instalaron únicamente bajo `tmp/hero-tools`, excluido de Git; el sitio y Vercel no las necesitan.

```sh
python -m pip install --target tmp/hero-tools opencv-python-headless==5.0.0.93 vtracer==0.6.15
python scripts/prepare-hero.py
node scripts/sync-hero.mjs
npm test
npm run build
```

El script reutiliza el fondo retocado conservado, genera máscaras, SVG y WebP. No vuelve a llamar al servicio de imágenes. `sync-hero` sincroniza el SVG inline de index.html; no hay petición/fetch de logo al cargar.

## Composición y movimiento

Bodoni Moda, ya local en la web, es la serif elegida para aproximar la referencia sin agregar fuentes ni vectorizar el nombre. H1 real con nombre accesible completo, letras decorativas ocultas para tecnología asistiva, SVG decorativo y fondo con alt vacío.

Entrada CSS de unos cuatro segundos: fondo 0–0.8 s; contorno/moño/cabello/rasgos 0.5–1.9 s; relleno 1.6–2.2 s; moño 2.2–3.0 s; letras desde 2 s, 60 ms de desfase y 700 ms por letra; lema 3–3.8 s; botón 3.4–4 s. Las once letras acaban a los 3.3 s. Zoom 1→1.06 durante 24 s y flecha de 5 px desde el segundo 4.

Solo transform/opacity, salvo el **stroke-dashoffset** exigido para dibujar el pequeño SVG. No se usa requestAnimationFrame, librerías, scroll forzado ni carga que bloquee el resto de la página. Foco/clic completan la entrada; pausa, pestaña oculta y salida de viewport detienen los movimientos largos. Reduced motion y noscript muestran la composición final sin zoom ni animación. En pantallas excepcionalmente bajas se conserva una altura mínima para evitar cortar controles.

## Revisión local

Con `npm run dev`:

- `/`: resultado.
- `/design/hero/compare.html`: original, SVG y superposición al 50 %.
- `/design/hero/motion-review.html`: detiene las animaciones CSS reales en 0.8, 1.4, 1.9, 2.6 y 4 s, o reproduce la secuencia. Herramienta editorial; no entra en dist/.

Verificación visual en escritorio 1280 × 720, móvil simulado 390 × 844 y 320 × 568; CTA, flecha y pausa comprobados. Sin errores de consola capturados. La página desde la franja superior anterior hasta el final coincide con la versión previa. Faltan prueba en teléfono físico/Safari, lector de pantalla, mediciones de FPS/CLS/CWV y ejecución con preferencia del sistema reducida o JS realmente deshabilitado; esos fallbacks se revisaron en código.

`scripts/check-hero.mjs` comprueba SVG sin raster/scripts/fetch externos, proporciones y sincronía con HTML, además del presupuesto crudo de HTML/CSS/JS/fuentes más **un** fondo responsive. No incluye las fotografías de capítulos inferiores ni cabeceras HTTP y no equivale a una medición de red o Core Web Vitals.

## Entrega e inventario
Commit de implementación f8e2ba6, rama codex/chocolate-hero, PR #4. Nuevos: assets/hero/{bg-betun.webp,bg-betun-mobile.webp,logo-titi.svg}, hero.css, hero.js, scripts/{prepare-hero.py,sync-hero.mjs,check-hero.mjs} y los recursos editoriales/máscaras/páginas de comparación de esta carpeta. Modificados: index.html, package.json, scripts/build.mjs, README.md, DESIGN.md, QA.md y DEPLOYMENT.md. La rama también incorpora la documentación de entrega anterior pendiente (DESIGN.md/QA.md/DEPLOYMENT.md/DEPLOYMENT-HISTORY.md).
Vercel success para el commit de implementación: https://vercel.com/gabriel-ruiz/titis-cakes/9ZUxoGvBe6z4AoSmLyEMx37XfAKm. El panel requiere sesión y la API devuelve 403; no se pudo consultar el dominio directo de preview ni verificarlo remotamente. Local disponible en http://127.0.0.1:4173/.
