# Dirección creativa · Titi’s boutique
Actualizada: 11 de noviembre de 2026. Sustituye las bienvenidas experimentales anteriores, conservadas en DESIGN-HISTORY.md.

## Intención

Una pastelería hecha para celebrar: francesa artesanal en lo visual, cercana en su voz, inclusiva en la conversación. La portada lleva directamente a un encargo personalizado. El recuerdo de Titi habita en su retrato y la historia de mamá y Fati, desde la gratitud y la alegría.

## Sistema visual

| Elemento | Decisión |
| --- | --- |
| Fondo | Crema #FBFCE7, con superficies marfil discretas |
| Texto | Cacao #3A261C; apoyo #715547 |
| Primario y acento | Rosa #F0BED1 en rayas y detalles; terracota #BB544C en acciones y foco |
| Títulos | Bodoni Moda, serif editorial; cursiva en frases seleccionadas |
| Lectura y controles | Karla, sans serif local |
| Fotografía | Recursos reales optimizados WebP, recortes editoriales sin alterar los productos |
| Composición | Portada de texto/fotografía, galería abierta, inclusión destacada, relato y formulario |
| Detalles | Rayas de empaque, sello tipográfico y pequeños dibujos SVG propios |
| Movimiento | Foto de portada 900 ms; entradas únicas de 18 px/650 ms con escalonado de 60 ms |
| Móvil | Contenido apilado, opciones en dos columnas cuando caben, formulario en una columna |

No hay intro bloqueante, ángeles, escritura simulada, scroll secuestrado ni bucles decorativos. Con movimiento reducido se muestran todos los contenidos sin transformaciones.

## Referencias y decisiones de Jarvis Studio

Jarvis Studio dirigió la selección de jarvis-web-design, impeccable y mobile-native. jarvis-web-quality y jarvis-release-workflow se incorporan en la entrega.

- Mon Chou aporta el lenguaje de empaque artesanal, rayas y calidez.
- Debaere orienta el protagonismo fotográfico y la jerarquía editorial.
- Gula Sana, Eleven Eleven y Partake inspiran comunicación cercana y opciones claras. No se trasladan sus garantías alimenticias, certificaciones ni capacidades.
- El brief familiar fija dirección, colores y contenido. Se construye directamente sobre los recursos reales y el sitio existente.
- El retrato original conserva identidad; la fotografía de celebración representa una familia, no a Titi.
- La galería ofrece inspiración y lleva al formulario conservando la referencia elegida.
- Las cuatro opciones alimenticias abren una conversación. Se explican ingredientes y posibles trazas sin promesas de aptitud médica.
- La consulta genera un mensaje revisable antes de abrir WhatsApp. No añade una tienda ni una reserva.

## Procedencia de recursos

Tres fotografías autorizadas por el propietario: pastel verde con margaritas, pie casero y celebración familiar. No hay imágenes de producto o proceso generadas ni fotografías prestadas de las referencias.

Retrato y logo extraídos del manual del propietario. Las ilustraciones pequeñas de pastel, cuchara, almendras, porción y flor se dibujaron como SVG propio. La portada social es una captura real de la nueva portada, con fotografía y composición del sitio.

Bodoni Moda y Karla: archivos latin 400 normal de @fontsource, versión 5.3.0, con licencias OFL incluidas en assets/fonts/. No se distribuyen tipografías extraídas del PDF. Las cursivas de presentación se sintetizan desde el archivo disponible.

## Accesibilidad e interacción

Navegación nativa con menú móvil, Escape y foco visible. Diálogo nativo para fotos con cierre y retorno de foco. Etiquetas visibles, errores vinculados, resumen enfocable y vista previa anunciable. Hover limitado a dispositivos que lo soportan; controles táctiles y campos de al menos 16 px. Reduced motion conserva acceso inmediato a toda la información.

Las pruebas y sus límites se registran en QA.md. La fotografía de proceso queda pendiente de recursos reales; no se rellena con imágenes inventadas.

## Paleta final confirmada por el propietario
Rosa primario #F0BED1, crema secundario #FBFCE7, cacao neutro #3A261C y acento terracota #BB544C. El terracota reemplaza el acento rosa oscuro anterior en CTA, foco y detalles ilustrados. Los CTA usan texto marfil para superar 4.5:1; errores en cacao con borde terracota. Franja superior rosa con texto cacao.

## Apertura de chocolate · 12 de noviembre de 2026
Petición nueva del propietario: portada a pantalla completa basada en su imagen, antes del diseño boutique existente. Fondo reconstruido sin letras, logo vectorizado a partir de su máscara y nombre como H1 HTML en Bodoni Moda. Trazo breve, relleno, balanceo único del moño y entrada escalonada del nombre; lema y CTA a los cuatro segundos. Se omite parpadeo para conservar los ojos. La foto de betún se retocó mediante imagegen integrado tras fallar la limpieza local por parches; esto no genera productos del catálogo ni redibuja la carita. Entrada y controles no bloquean la navegación. Se añade pausa para zoom/flecha y fallbacks reduced motion/noscript. Es una nueva capa introductoria: la página anterior desde su franja superior conserva exactamente el contenido/markup. Especificación, prompt y procedencia en design/hero/README.md.
