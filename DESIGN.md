# Dirección creativa · Titi’s Cakes

## Intención

Una celebración luminosa del amor que permanece. El homenaje se expresa con la identidad original, el lazo, flores, una línea con un corazón y una dedicatoria que el visitante decide descubrir. No se cuentan circunstancias médicas ni del fallecimiento. Las imágenes comerciales acompañan los momentos de celebración, no representan a Titi.

## Jarvis Studio: decisiones observables

Se aplicó Jarvis Studio como director de trabajo, con `jarvis-web-design`, `jarvis-logo-motion` y `jarvis-frontend-architecture` al inicio, ampliando a `animate` y `jarvis-web-quality` durante implementación y comprobación.

| Orientación | Decisión realizada | Resultado observable |
| --- | --- | --- |
| Diseño desde contenido real | Dos productos y una celebración familiar; sin reseñas, métricas, sabores ni precios inventados | Galería breve y auténtica |
| Identidad antes de efectos | Extracción del retrato original del PDF; paleta exacta | Titi conserva su representación original |
| Logo según formato real | El logo era una imagen plana; se anima su revelado completo, no se atribuyen capas inexistentes | Retrato y nombre legibles; repetición opcional |
| Movimiento con intención | Bienvenida ocasional de 2.4 s, feedback de 160 ms y diálogo de 250 ms | Sin loader bloqueante ni loops continuos |
| Menor herramienta suficiente | CSS, WAAPI e IntersectionObserver, sin dependencias de ejecución | Sitio estático ampliable y sencillo de mantener |
| Móvil como composición propia | Notas alrededor del retrato, productos apilados y portada adaptada a `svh` | Lectura y navegación comprobadas a 390 px |
| Evidencia antes de afirmar | Build, galería, dedicatoria, imágenes, ancho y capturas | Alcance de QA explícito en QA.md |

## Sistema visual

- Rosa `#f0bed1`: homenaje, cinta y cierre.
- Crema `#fbfce7`: fondo, respiro y luz.
- Cacao `#3a261c`: texto y acciones de alto contraste.
- Color secundario derivado `#715547`: notas y texto de apoyo, no sustituye los colores de marca.
- Georgia: títulos editoriales; cursiva para notas personales. Trebuchet MS: navegación y lectura. Son alternativas de sistema; ver la nota de licencia en README.
- Espacio: 6vw lateral, 110px entre capítulos en escritorio, 65px en móvil; composición abierta y asimétrica.
- Fotografía: WebP optimizado, recorte CSS, sin alteración generativa. El pastel usa un arco; la celebración, marco de fotografía con una leve inclinación.
- Mon Chou: referencia de calidez, composición artesanal y ritmo de empaque. No se copian logos, ilustraciones, textos ni fotos de esa marca.

## Storyboard de bienvenida

1. El retrato entra suavemente desde 15px y escala .95.
2. El nombre aparece 180ms después, seguido del lema a los 430ms.
3. Dos destellos y la línea con un pequeño corazón completan la composición.
4. A los 2400ms se retira el estado de animación; la portada permanece funcional.

No se anima el rostro por separado ni se simulan gestos de una persona real. `sessionStorage` recuerda la bienvenida durante la sesión. Si almacenamiento o JavaScript fallan, la identidad y las acciones siguen visibles. La preferencia de movimiento reducido suprime transformaciones y oculta la repetición.

## Interacción

WhatsApp con mensajes por contexto; galería en `dialog` nativo con Escape y retorno de foco; botón de dedicatoria con `aria-expanded`, región de estado y apertura reversible. Hover solo para puntero fino. Foco visible, enlace para saltar contenido y texto alternativo en imágenes.

## Referencias

Manual de marca proporcionado por la familia (10 páginas, inspección visual completa).
Mon Chou, identidad de Anna Derkach: https://www.fivestarlogo.com/post/mon-chou-bakery-coffee-bar-brand-identity-design-anna-derkach
