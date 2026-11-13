# Verificación · rediseño boutique · 11 de noviembre de 2026

## Ejecutado localmente

- npm run check, npm test y npm run build: comprobaciones de sintaxis, validación del pedido y salida estática.
- git diff --check: formato del cambio.
- Navegador integrado, escritorio y móvil simulado de 390 × 844: portada, inclusión, historia y formulario observados. Sin desbordamiento horizontal en móvil.
- Menú móvil: apertura, cierre con Escape y cierre al elegir una sección.
- Galería: filtro Postres muestra una foto, Todas restaura las tres; ampliación y cierre con Escape.
- Formulario vacío: cinco errores necesarios y vista previa oculta. La ocasión contiene las siete opciones esperadas tras corregir su HTML.
- Caso válido con datos sintéticos: mensaje con nombre, teléfono, fecha, ocasión, porciones, sabor, decoración y necesidades alimenticias; enlace al número 50378777124 con texto codificado.
- Cambio posterior en un campo oculta el mensaje anterior. La inspiración de galería y las opciones alimenticias se añaden sin borrar texto existente.
- Referencia JPG/PNG/WebP: vista previa local observada con el recurso de prueba pastel-flores.webp y eliminación correcta; se explica la adjunción manual en WhatsApp.
- Consola del navegador local: sin errores ni advertencias capturadas durante la revisión.
- Las entradas visuales no bloquean la portada ni los controles; se respetan las condiciones de movimiento reducido en código.

Capturas de evidencia local en tmp/boutique-review/ (no se publican con el build): portada escritorio/móvil, inclusión móvil, historia, formulario y mensaje.

## Pruebas de lógica

scripts/check-orders.mjs cubre formulario vacío, teléfono inválido, fecha pasada o inexistente, porciones cero/fraccionarias, fecha local, texto con acentos y ampersand, nombre opcional del archivo y aclaración de que la consulta no confirma reserva.

## Límites

No se enviaron mensajes, hicieron llamadas ni pedidos. El enlace de WhatsApp y su mensaje se inspeccionaron sin accionar el envío externo. No se probó en teléfono físico, Safari/iOS ni con lector de pantalla. No se midieron FPS ni Core Web Vitals. Reduced motion y tipos/tamaño de archivo inválidos se revisaron en código; no se forzó esa preferencia ni todos los errores de archivo en navegador. No existe afirmación de auditoría completa de accesibilidad.

Solo se publican las tres fotos aportadas. No hay fotografías del proceso disponibles. Las opciones alimenticias se consultan y confirman por receta, no constituyen certificaciones ni garantías médicas.

## Publicación

El identificador, commit y verificación pública de esta versión se registran en DEPLOYMENT.md después del despliegue. El historial de las pruebas de las aperturas anteriores puede consultarse en Git.

Revisión independiente de cierre: capturas actuales y código contrastados con el brief; sin hallazgos materiales pendientes. Contrastes calculados por el revisor: placeholder 4.94:1 y texto secundario 6.53:1. La revisión independiente no sustituye las pruebas de interacción descritas arriba.

Paleta final solicitada: portada recapturada en escritorio y móvil390, CTA computado rgb(187,84,76) y texto rgb(255,254,247); sin overflow. Error en cacao con borde terracota.

Revisión independiente del ajuste final de paleta: sin correcciones pendientes; marfil sobre terracota 4.63:1 y cacao sobre rosa 8.81:1.

## Verificación de producción
Nueva portada y paleta observadas en https://titis-cakes.vercel.app/. Imágenes cargadas, errores del formulario vacío y consola sin errores comprobados. HTTP200 sin credenciales para HTML/CSS/app.js/order-utils.js, coincidentes con el código revisado. Publicación automática tras merge del propietario; detalle y límite de acceso de la API en DEPLOYMENT.md.

## Apertura de chocolate · 12 de noviembre de 2026
Comparación visual del SVG con el recorte original y superposición al 50 %. Secuencia real inspeccionada en la herramienta local de timeline (0.8/1.4/2.6/4 s y estado final). Portada observada a 1280×720, 390×844 y 320×568: sin overflow horizontal, logo/nombre/CTA completos, fondo móvil seleccionado y alto igual al viewport en esos tamaños. Pausa cambia el estado y detiene el zoom; CTA llega a #pedidos, flecha a #inicio y la salida del viewport pausa el fondo. Consola sin errores capturados. Comprobación textual: la página desde la franja superior anterior hasta el final no cambia. npm run check, npm test y npm run build; check-hero valida SVG real/sin scripts y presupuesto responsive bajo 400000 bytes sin fotos inferiores. No se enviaron mensajes. Reduced motion y noscript revisados en código, sin prueba con ajuste del sistema/JS deshabilitado. No se midieron FPS, CLS ni CWV, ni teléfono físico. El fondo final es una reconstrucción asistida tras comprobar parches en el inpainting básico; SVG suavizado, no maestro vectorial original. Ver design/hero/README.md.
