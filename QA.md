# Verificación · 8 de noviembre de 2026

## Ejecutado

- `npm run check`: comprobación de sintaxis de aplicación, servidor local y build.
- `npm run build`: generación correcta de `dist/` con assets locales.
- Navegador integrado, escritorio (1280px de viewport): portada inspeccionada visualmente, sin desbordamiento horizontal.
- Navegador integrado, móvil simulado (390 × 844): portada y galería de productos inspeccionadas visualmente, sin desbordamiento horizontal.
- Todas las imágenes de la página terminaron de cargar con ancho natural positivo.
- Dedicatoria: clic abre el mensaje y cambia `aria-expanded` a `true`.
- Galería: clic abre el diálogo; Escape lo cierra.
- Los cuatro enlaces generados de WhatsApp apuntan al número `50378777124` con mensajes contextuales codificados. Verificación de URL, sin enviar mensajes.

## Límites

No se enviaron mensajes, hicieron llamadas ni pedidos. No se probó en hardware móvil real. No se midieron Core Web Vitals ni se ejecutó un lector de pantalla. `prefers-reduced-motion`, foco visible, retorno de foco y fallback sin JavaScript revisados en código; la preferencia de movimiento reducido no se forzó desde el navegador de pruebas. Las fuentes exactas del manual quedan pendientes de archivos web licenciados. No hay despliegue público todavía.
