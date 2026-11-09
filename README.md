# Titi’s Cakes · Un legado de amor

Landing artesanal en español para una pastelería familiar de El Salvador. Una bienvenida animada con el retrato original de la marca, productos reales, un homenaje simbólico, galería accesible y cotizaciones por WhatsApp.

Sitio publicado: **https://titis-cakes.vercel.app/**. Identidad del proyecto, versión y verificaciones en `DEPLOYMENT.md`.

## Ver y construir

Requiere Node.js 22 o superior. No necesita instalar dependencias.

```sh
npm run dev
# http://127.0.0.1:4173
npm run check
npm run build
```

El build produce `dist/`, listo para alojamiento estático. Las rutas relativas permiten servirlo en un subdirectorio. `vercel.json` configura el build y la salida en Vercel. El servidor local es solo para desarrollo y no debe usarse como servidor de producción.

## Contenido y mantenimiento

- `index.html`: textos, secciones, fotos y metadatos.
- `styles.css`: sistema visual, composición móvil y animaciones.
- `app.js`: bienvenida una vez por sesión, repetición opcional, galería y dedicatoria.
- `assets/`: imágenes optimizadas WebP, logo original y detalles SVG propios.
- `DESIGN.md`: decisiones de marca y aportes de Jarvis Studio.
- `QA.md`: evidencia de comprobaciones y límites.

El contacto comercial es **+503 7877 7124**. Los botones con `data-order` reciben un mensaje contextual en `app.js`. Instagram proviene del manual: `titiscakes_sv`. No hay carrito, pagos, analíticas, cookies publicitarias ni datos enviados a un servidor propio.

## Marca y fotografías

El retrato ilustrado se extrajo del manual proporcionado y se recortó sin redibujarlo. `logo-original.jpg` conserva el recurso completo. Las tres fotos son las proporcionadas por el propietario, con autorización de uso en este proyecto. La niña de la fotografía de celebración **no es Titi** y el sitio no la identifica como tal. No reutilizar estos recursos para otros proyectos.

La tipografía de marca Luminary Serif Medium y la secundaria ITC Bauhaus no se suministraron como fuentes web licenciadas. Esta versión emplea Georgia y Trebuchet MS como alternativas de sistema, sin extraer ni distribuir las fuentes incrustadas en el PDF. Para fidelidad tipográfica exacta, añadir los archivos web con licencia y sustituir los tokens `--serif` y `--sans`.

`scripts/prepare-assets.py` permite reproducir la extracción y optimización con Python, pypdf y Pillow. Recibe cuatro rutas: manual PDF, foto celebración, foto pastel y foto pie. Es una herramienta editorial opcional; el sitio y su build no dependen de Python.

## Futuras etapas

Añadir catálogo real, sabores, anticipación mínima, zona y condiciones de entrega cuando la familia los confirme. Se puede incorporar después un CMS o pedidos, sin convertir el homenaje en un registro público de datos familiares. Antes de publicación pública, revisar textos con la familia, confirmar Instagram y definir dominio/hosting; después añadir URL e imagen social absoluta a los metadatos.
