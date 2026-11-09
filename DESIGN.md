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

## Storyboard de bienvenida (v1, sustituida por v2)

1. El retrato entra suavemente desde 15px y escala .95.
2. El nombre aparece 180ms después, seguido del lema a los 430ms.
3. Dos destellos y la línea con un pequeño corazón completan la composición.
4. A los 2400ms se retira el estado de animación; la portada permanece funcional.

No se anima el rostro por separado ni se simulan gestos de una persona real. `sessionStorage` recuerda la bienvenida durante la sesión. Si almacenamiento o JavaScript fallan, la identidad y las acciones siguen visibles. La preferencia de movimiento reducido suprime transformaciones y oculta la repetición.

## Revisión v2: el ángel que escribe

Tras la revisión del usuario se sustituye la aparición tipográfica por caligrafía SVG propia, dibujada por segmentos reales. Un ángel vectorial original con vestido rosa, halo, alas y varita sigue el punto exacto de cada trazo (`getPointAtLength`). Los puntos de las íes se colocan al final, como en escritura manual. La escena termina con una rúbrica que forma un corazón y el ángel sale en diagonal.

La secuencia completa dura aproximadamente 7.9 segundos a velocidad normal. No impide hacer scroll ni usar las acciones. Se reproduce una vez por sesión con clave de versión propia; el botón permite completarla inmediatamente o repetirla. El reloj se pausa con la pestaña oculta y no se crean bucles o partículas permanentes. La escritura usa stroke-dashoffset: es una excepción deliberada a la preferencia por transform/opacity para representar tinta real en un único SVG pequeño.

Se conserva el logo original en navegación y pie de página. El retrato recibe un filtro SVG que elimina el papel blanco en render, conservando el archivo original. No se generó ni alteró un retrato de Titi. El ángel es un símbolo ilustrado, no una representación biográfica. La caligrafía es una interpretación de bienvenida, no el wordmark oficial de marca.

Se elimina el símbolo antes del texto de ubicación. Los capítulos incorporan entradas escalonadas, recorte de texto, giro suave de fotografías y una composición que se revela al entrar. Reduced motion mantiene la escritura completa, desactiva al ángel y evita ocultar contenido. No se secuestra el scroll ni se añaden pantallas bloqueantes. `motion.css` concentra esta revisión.

## Interacción

### Revisión v3: alas y halo, movimiento continuo

La referencia del usuario reemplaza al personaje: símbolo lineal de dos alas con halo, aproximadamente la mitad del tamaño visual anterior, sin rostro, cuerpo, varita ni partículas. Un único vuelo de 11 segundos avanza de izquierda a derecha por un arco suave sobre el nombre. El progreso espacial tiene velocidad continua y solo cambia 6 grados de orientación durante todo el recorrido. Las alas oscilan 4 grados en 2.4 segundos, sin aleteo rápido. La escritura tiene velocidad lineal y gestos solapados, independientes del vuelo: el símbolo ya no salta entre segmentos ni regresa a poner los puntos. Se conservan completar/repetir, pausa de pestaña oculta, bienvenida una vez por sesión y reduced motion.

La secuencia se ejecuta con Web Animations API, sin bucle JS por fotograma ni creación de partículas. Se eliminaron los destellos de la portada. Esta revisión sustituye la coreografía v2, conservada arriba como historial de decisiones.

WhatsApp con mensajes por contexto; galería en `dialog` nativo con Escape y retorno de foco; botón de dedicatoria con `aria-expanded`, región de estado y apertura reversible. Hover solo para puntero fino. Foco visible, enlace para saltar contenido y texto alternativo en imágenes.

## Referencias

Manual de marca proporcionado por la familia (10 páginas, inspección visual completa).
Mon Chou, identidad de Anna Derkach: https://www.fivestarlogo.com/post/mon-chou-bakery-coffee-bar-brand-identity-design-anna-derkach
