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
