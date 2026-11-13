# Titi’s Cakes · Cada vida merece celebrarse

Pastelería familiar por encargo en El Salvador. Landing boutique en español, con fotografías reales, opciones alimenticias para consultar, historia familiar y cotización mediante WhatsApp.

Sitio: [titis-cakes.vercel.app](https://titis-cakes.vercel.app/). Publicación y recuperación: DEPLOYMENT.md.

## Desarrollo

Node.js 22 o superior. Sin dependencias de ejecución ni instalación necesaria.

```sh
npm run dev
# http://127.0.0.1:4173
npm run check
npm test
npm run build
```

El build produce dist/ con los archivos estáticos necesarios. El servidor local es solo de desarrollo. vercel.json conserva el proyecto estático y la salida dist/.

## Mantenimiento

- index.html: contenido, fotos, opciones, formulario y metadatos.
- styles.css y motion.css: sistema visual responsive y movimiento discreto.
- app.js: navegación, galería, vista previa local y preparación de la consulta.
- order-utils.js: validación y construcción del mensaje; scripts/check-orders.mjs verifica sus casos principales.
- assets/: tres fotografías originales optimizadas, retrato original, ilustraciones SVG y fuentes locales con licencia.
- PRODUCT.md, SURFACE.md y DESIGN.md: contexto, contrato de diseño y decisiones actuales.
- QA.md: verificaciones realizadas y límites.

Contacto comercial: **+503 7877 7124**. Instagram del manual: **@titiscakes_sv**. No hay tienda, pagos, reservas automáticas, analíticas ni un servidor que guarde respuestas.

## Flujo de consulta

El cliente indica nombre, teléfono, fecha, ocasión y porciones; puede añadir sabor, diseño, ingredientes a evitar y una referencia visual. Se comprueban los campos necesarios y se muestra un mensaje editable mediante los campos. El cliente decide abrir WhatsApp; el sitio no envía el mensaje automáticamente.

La imagen opcional (JPG/PNG/WebP, hasta 8 MB) se previsualiza únicamente en el dispositivo. WhatsApp no admite adjuntar ese archivo mediante un enlace wa.me: el cliente lo adjunta manualmente en el chat. El mensaje recuerda el nombre del archivo.

Sin JavaScript, los enlaces directos a WhatsApp, navegación, contenido y fotografías siguen disponibles. El formulario explica su alternativa de contacto.

## Marca y recursos

El retrato ilustrado se extrajo del manual suministrado sin redibujarlo. Se conserva logo-original.jpg. Las tres fotografías fueron aportadas y autorizadas para este proyecto. La niña de la foto de celebración **no es Titi**; el sitio no la presenta como tal. No reutilizar los recursos familiares en otros proyectos.

Bodoni Moda y Karla se alojan localmente con sus licencias OFL. Son una nueva elección editorial para el rediseño; no se extraen fuentes incrustadas del PDF. Mon Chou y Debaere orientan la composición, sin reutilizar sus logos, ilustraciones o fotos. La procedencia se documenta en DESIGN.md.

## Contenido pendiente

Ampliar la galería con fotografías reales y añadir imágenes del proceso cuando la familia las aporte. Confirmar sabores, precios, plazos y condiciones de entrega antes de publicarlos. La disponibilidad de adaptaciones e ingredientes se conversa antes de aceptar cada encargo.

## Apertura de chocolate (v2.1)
Nueva primera sección de pantalla completa antes de la landing boutique. Capas en assets/hero/, coreografía CSS en hero.css y controles mínimos en hero.js. La portada anterior y el formulario permanecen completos debajo. Procesamiento, prompt de edición, comparación y límites en design/hero/README.md. npm test incluye el presupuesto de la portada; node scripts/sync-hero.mjs sincroniza el SVG inline tras regenerarlo.
