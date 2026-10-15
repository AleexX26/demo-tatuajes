---
name: Casa Ferro
description: Web de una página para una estudio de tatuaje, oscura y sobria, con reserva por WhatsApp.
colors:
  carbon: "#141210"
  carbon-2: "#1d1a17"
  carbon-3: "#27231f"
  linea-form: "#574e44"
  crema: "#ede6d8"
  crema-2: "#a89f91"
  crema-3: "#8a8174"
  acento: "#e8624c"
  acento-claro: "#f08a76"
  error: "#f0a08a"
typography:
  display:
    fontFamily: "'Bodoni Moda', 'Bodoni respaldo', 'Bodoni 72', Didot, Georgia, serif"
    fontSize: "clamp(3.25rem, 9vw + .5rem, 6rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Bodoni Moda', 'Bodoni respaldo', 'Bodoni 72', Didot, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw + .5rem, 4.25rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Bodoni Moda', 'Bodoni respaldo', 'Bodoni 72', Didot, Georgia, serif"
    fontSize: "clamp(1.5rem, 1.5vw + 1rem, 2rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  precio:
    fontFamily: "'Bodoni Moda', 'Bodoni respaldo', 'Bodoni 72', Didot, Georgia, serif"
    fontSize: "1.625rem"
    fontWeight: 500
    lineHeight: 1.1
    fontFeature: "lnum, tnum"
  body:
    fontFamily: "'Instrument Sans', 'Instrument respaldo', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Instrument Sans', 'Instrument respaldo', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  sec: "clamp(4.5rem, 10vw, 8.5rem)"
  ancho: "78rem"
  hueco-sm: "0.5rem"
  hueco-md: "1rem"
  hueco-lg: "2.5rem"
  hueco-col: "4rem"
components:
  boton:
    backgroundColor: "{colors.acento}"
    textColor: "{colors.carbon}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: ".85rem 1.6rem"
    height: "3.25rem"
  boton-hover:
    backgroundColor: "{colors.acento-claro}"
    textColor: "{colors.carbon}"
  boton-peq:
    backgroundColor: "{colors.acento}"
    textColor: "{colors.carbon}"
    rounded: "{rounded.none}"
    padding: ".5rem 1.1rem"
    height: "2.5rem"
  enlace:
    textColor: "{colors.acento}"
    height: "2.75rem"
  enlace-hover:
    textColor: "{colors.acento-claro}"
  campo:
    backgroundColor: "{colors.carbon-2}"
    textColor: "{colors.crema}"
    rounded: "{rounded.none}"
    padding: ".75rem .9rem"
    height: "3.25rem"
  opcion:
    backgroundColor: "{colors.carbon-2}"
    textColor: "{colors.crema}"
    rounded: "{rounded.none}"
    padding: ".55rem .8rem"
    height: "3rem"
  opcion-elegida:
    backgroundColor: "{colors.acento}"
    textColor: "{colors.carbon}"
  opcion-desactivada:
    textColor: "{colors.crema-3}"
  servicio-hover:
    backgroundColor: "{colors.carbon-3}"
  pregunta:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.crema}"
    padding: "1rem 1.25rem"
    height: "3.5rem"
  barra-movil:
    backgroundColor: "{colors.carbon-3}"
    textColor: "{colors.crema}"
    height: "3.5rem"
---

# Design System: Casa Ferro

## Overview

**Creative North Star: "El rótulo y la carta de noche"**

La web es el letrero y la carta de una estudio de tatuaje vista de noche. El H1 es el rótulo pintado en el cristal, los precios son la carta colgada en la pared y la reserva es el mostrador. Todo ocurre sobre un suelo de carbón casi negro con tinte cálido; la profundidad la dan escalones de tono, nunca sombras ni filetes. La tipografía de titulares, Bodoni Moda de alto contraste, hace el trabajo del rótulo; Instrument Sans lleva todo lo demás con claridad de impreso.

Un único metal, el rojo coral, marca lo que se puede pulsar: botones, enlaces de acción, el día y la hora elegidos, el foco, el chevron de las preguntas. Lo demás es crema y crema apagada. La densidad es baja y la composición asimétrica: columnas 4/7 con la columna estrecha fija al desplazar, mosaico irregular de fotos a sangre, equipo escalonado. El movimiento se reserva para una sola entrada orquestada en el hero; el resto son transiciones de estado.

Rechazos confirmados por el usuario y el plan: nada de degradados morado-azul, nada de Inter en todo, nada de tarjetas dentro de tarjetas, nada de hero centrado sobre fila de tarjetas de iconos.

**Key Characteristics:**
- Fondo oscuro cálido con superficies por escalón de tono (`carbon` → `carbon-2` → `carbon-3`).
- Un solo acento, rojo coral, exclusivo de lo pulsable.
- Bodoni Moda a escala de rótulo para titulares y precios; Instrument Sans para texto y controles.
- Esquinas rectas en todo; sin sombras en reposo, sin degradados, sin filetes decorativos.
- Composición asimétrica 4/7 y mosaico de fotos a sangre.
- Movimiento: una entrada en el hero y transiciones de estado con `cubic-bezier(.16, 1, .3, 1)`.

## Colors

Paleta de taller nocturno: tres carbones cálidos, tres cremas y un rojo coral.

### Primary
- **Rojo coral** (`acento`): el único acento. Fondo del botón principal y del botón de la barra móvil, color de los enlaces de acción y de la flecha «Reservar» de cada servicio, día y hora elegidos, anillo de foco, chevron de las preguntas, flecha del `select`, selección de texto y cursor.
- **Rojo coral claro** (`acento-claro`): solo estado hover del rojo coral (botón, enlace, resumen de pregunta). No aparece en reposo.

### Neutral
- **Carbón** (`carbon`): suelo de la página, cabecera fija y fondo de cada pregunta abierta sobre su banda. Texto sobre rojo coral.
- **Carbón 2** (`carbon-2`): banda alterna de secciones (opiniones, preguntas, pie), fondo de campos, de casillas de día/hora y de las fotos mientras cargan.
- **Carbón 3** (`carbon-3`): el escalón más alto. Banda de demo, barra fija móvil, hover de la fila de servicio, burbuja de vista previa del WhatsApp, etiqueta «dato de ejemplo», borde de casilla desactivada.
- **Línea de formulario** (`linea-form`): borde de 1px de campos y casillas en reposo. Es el único trazo de la interfaz y solo existe en controles.
- **Crema** (`crema`): texto principal, titulares, estrellas de la valoración, texto destacado (`strong`, `b`).
- **Crema apagada** (`crema-2`): texto secundario (lema, duraciones, puestos, pies de opinión, navegación en reposo, celdas de horario). También borde hover de campos y casillas.
- **Crema 3** (`crema-3`): texto inactivo: días sin cita y filas de horario cerrado.
- **Error** (`error`): borde de campo inválido y mensaje de error. Coral claro, legible sobre carbón.

### Named Rules
**The Rojo coral Es Para Pulsar Rule.** El rojo coral solo aparece en elementos interactivos o en su estado elegido/foco. Las estrellas de la valoración, los precios y los titulares van en crema. Si algo en rojo coral no se puede pulsar, sobra.

**The Escalón De Tono Rule.** Una superficie se separa de otra subiendo un escalón de carbón (`carbon` → `carbon-2` → `carbon-3`), nunca con sombra ni borde. Dos superficies contiguas no comparten escalón.

**The Inactivo Con Token Rule.** Todo texto inactivo usa `crema-3`; no se escriben grises sueltos en el código.

## Typography

**Display Font:** Bodoni Moda (con respaldo local Georgia/Times New Roman ajustado por métricas, luego Bodoni 72, Didot, Georgia)
**Body Font:** Instrument Sans (con respaldo local Segoe UI/Helvetica Neue/Arial ajustado, luego system-ui)

**Character:** Un Bodoni de alto contraste con eje óptico hace de rótulo pintado y de cifra de carta; un grotesco limpio y algo estrecho lleva el texto y los controles sin competir. Ambas fuentes se sirven locales en woff2 con `font-display: swap` y un respaldo con `size-adjust` para que el texto no salte.

### Hierarchy
- **Display** (500, `clamp(3.25rem, 9vw + .5rem, 6rem)`; desde 900px `clamp(4rem, 6.2vw, 6rem)`, interlineado 0,98, -0,02em): solo el H1 del hero, en dos líneas con bloque por línea.
- **Marca de pie** (500, `clamp(4rem, 17vw, 15rem)`, 0,9, -0,03em): el nombre del local a todo el ancho al cierre. Es el rótulo repetido, no un titular.
- **Headline** (500, `clamp(2.25rem, 5vw + .5rem, 4.25rem)`, 1,05): un H2 por sección, con `text-wrap: balance`.
- **Title** (500, `clamp(1.5rem, 1.5vw + 1rem, 2rem)`, 1,05): H3 de grupo de servicios (en crema apagada, 1,5rem), tatuadores, horario.
- **Precio** (Bodoni 500, 1,625rem, 1,1, cifras de caja y tabulares): precios de la carta. El número del día en las casillas usa el mismo trato a 1,375rem.
- **Cita** (Bodoni 400, 1,25rem/1,4; la grande `clamp(1.5rem, 2vw + 1rem, 2.25rem)`/1,32, máx. 26ch): opiniones y dirección postal.
- **Body** (400, 1,0625rem, 1,6): texto corriente. Párrafos largos limitados a 34–65ch.
- **Label** (600, 0,9375rem): etiquetas de campo, leyendas, botones pequeños, barra móvil. En caja normal, sin espaciado añadido.
- **Nota** (400, 0,875–0,9375rem, crema apagada): avisos, créditos, duraciones.

### Named Rules
**The Rótulo Rule.** Bodoni Moda solo en titulares, precios, números de día, citas y la marca. Nunca en controles, etiquetas ni texto corrido.

**The Cifra De Carta Rule.** Toda cifra que se compara (precios, horas, duraciones, horario) usa cifras tabulares.

## Layout

Móvil primero en una sola columna. El contenedor (`.envoltura`) mide `min(100% - 2 × gutter, ancho)` con `gutter` fluido y `ancho` de 78rem. Las secciones se separan con `sec` como único ritmo vertical; las bandas alternas (`carbon-2`) llevan `sec` arriba y abajo.

Desde 900px la página se vuelve asimétrica: servicios, reserva y preguntas usan columnas `4fr / 7fr` con 4rem de hueco, y la columna estrecha (intro de servicios, intro de reserva) queda fija con `position: sticky; top: 6rem`. El hero pasa a dos columnas `6fr / 6fr`: texto alineado con el contenedor a la izquierda y la foto a sangre hasta el borde derecho de la ventana, alto `min(100svh - 6.5rem, 52rem)`. Opiniones usan `7fr / 4fr` con la cita grande ocupando dos filas; contacto `6fr / 5fr`.

Galería: mosaico de 2 columnas en móvil (filas de 38vw, 26vw desde 600px) y de 12 columnas desde 900px con piezas de tamaños distintos y huecos de .5–.75rem. Equipo: el primer tatuador ancho (5/12) y los otros dos escalonados 6rem hacia abajo.

Reserva: los campos pasan a dos columnas desde 600px. Los días son una fila con desplazamiento horizontal y `scroll-snap` en móvil, y una rejilla de 7 columnas desde 900px. Las horas fluyen en filas.

Cabecera fija de 4rem. Por debajo de 900px no hay navegación ni botón en la cabecera: la acción vive en la barra fija inferior (Reservar / WhatsApp / Llamar, `1.3fr 1fr 1fr`), y el pie y el `scroll-padding` reservan su alto. Desde 900px la barra desaparece y aparecen navegación y botón «Reservar».

Breakpoints: 600px y 900px.

## Elevation & Depth

Sistema plano. No hay ninguna `box-shadow` en el código. La profundidad se construye con tres escalones de carbón y con las fotos a sangre; la única capa que flota (cabecera y barra móvil) se distingue por su tono, no por sombra.

### Named Rules
**The Plano En Reposo Rule.** Nada proyecta sombra. Los estados se expresan con cambio de tono de fondo (`carbon-3` en hover de servicio), cambio de color (rojo coral → rojo coral claro) o un desplazamiento de 1px al pulsar.

## Shapes

Esquina recta en todo (`border-radius: 0`, incluso en `input` y `select`, que lo fijan explícitamente). Los bordes solo existen en controles de formulario, a 1px. Las fotos se recortan con `object-fit: cover` en proporción 4/5 (hero móvil, tatuadores, contacto) o al hueco del mosaico. El chevron de las preguntas se dibuja con dos trazos de 1,5px en rojo coral girados, no con un glifo. Iconos SVG de trazo de 1,5px, extremos redondeados, a 1,15em y en `currentColor`.

## Components

### Buttons
Planos, rectos y de un solo color: un trozo de rojo coral con texto carbón.
- **Shape:** esquina recta (0).
- **Primary (`boton`):** fondo rojo coral, texto carbón, Instrument Sans 600 a 1rem, alto mínimo 3,25rem, relleno .85rem 1.6rem, icono opcional a la izquierda con .6em de hueco. Variante ancha a 100% para el envío del formulario.
- **Pequeño (`boton-peq`):** alto 2,5rem, relleno .5rem 1.1rem, 0,9375rem.
- **Hover / Focus:** fondo rojo coral claro en .2s con la curva de la casa; `:active` baja 1px; foco con contorno de 2px rojo coral a 3px de separación.
- **Enlace de acción (`enlace`):** texto rojo coral 600 sin subrayado, alto mínimo 2,75rem, icono delante o flecha detrás; en hover pasa a rojo coral claro, se subraya y la flecha avanza 3px. Es la acción secundaria junto a un botón (Llamar, WhatsApp, Instagram, «Reservar con …»).

### Cards / Containers
No hay tarjetas. Los bloques son bandas de tono o filas.
- **Fila de servicio:** rejilla de dos columnas (nombre y detalle / precio Bodoni; duración / «Reservar →» en rojo coral), relleno 1rem .9rem, fondo `carbon-3` en hover y foco. En escritorio se sangra -.9rem para que el texto alinee con la columna.
- **Superficies de mensaje:** la burbuja de vista previa del WhatsApp (`carbon-3`, texto con saltos conservados) y el aviso de solicitud preparada (`carbon-2`, 1,5rem de relleno). Sin borde ni sombra.

### Inputs / Fields
- **Style:** fondo `carbon-2`, texto crema, borde 1px `linea-form`, esquina recta, alto 3,25rem, relleno .75rem .9rem. El `select` lleva su propia flecha SVG en rojo coral.
- **Hover:** borde `crema-2`.
- **Focus:** contorno 2px rojo coral pegado al campo y borde rojo coral.
- **Error:** borde `error` y mensaje en `error` a 0,9375rem debajo.

### Chips (casillas de día y hora)
- **Style:** radio oculto sobre una casilla `carbon-2` con borde `linea-form`, mínimo 4,25rem × 3rem (días 4,75rem de alto), día de la semana en `small` crema apagada y número en Bodoni.
- **State:** hover con borde `crema-2`; elegida en rojo coral con texto carbón; desactivada transparente, texto `crema-3` y borde `carbon-3`, cursor no permitido; foco con contorno rojo coral a 2px.

### Navigation
- **Cabecera:** fija, fondo carbón, sin borde. Marca en Bodoni 600 a 1,5rem a la izquierda (relleno vertical .65rem). Desde 900px, enlaces en Instrument Sans 0,9375rem crema apagada que pasan a crema en hover, con 2rem de hueco, y un `boton-peq` «Reservar».
- **Barra fija móvil:** tres celdas de 3,5rem sobre `carbon-3`; la primera, más ancha, en rojo coral con texto carbón. Respeta `safe-area-inset-bottom`.

### Preguntas frecuentes
`details` sobre fondo carbón dentro de la banda `carbon-2`, separados .5rem. Resumen 600 a 1,0625rem, alto 3,5rem, con chevron de trazo rojo coral que gira en .3s; hover del resumen en rojo coral claro. Respuesta en crema apagada, máx. 65ch.

### Entrada del hero (signature)
Única coreografía de la página, solo con `prefers-reduced-motion: no-preference`: la foto entra con un barrido `clip-path` desde la derecha y una leve escala (1,3s), y las dos líneas del rótulo, el lema, la valoración y las acciones suben .6rem en cascada (.9s, retrasos 0–.3s). Con movimiento reducido se anulan animaciones y transiciones.

### Marcador de dato de ejemplo
Etiqueta en línea `carbon-3` con texto crema apagada a 0,8125rem, en caja normal, junto a cualquier dato ficticio (valoración, dirección, opiniones). Es un aviso de honestidad del modo demo, no un adorno; desaparece con datos reales.

## Do's and Don'ts

### Do:
- **Do** reservar el rojo coral (`acento`) para lo pulsable y su estado elegido o enfocado; hover siempre a `acento-claro`.
- **Do** separar superficies subiendo un escalón de carbón (`carbon` → `carbon-2` → `carbon-3`).
- **Do** usar Bodoni Moda 500 para titulares, precios y números de día, e Instrument Sans para todo lo demás.
- **Do** mantener la esquina recta (0) en botones, campos, casillas y fotos.
- **Do** usar `sec` como único espaciado vertical entre secciones y `gutter` como margen lateral.
- **Do** usar cifras tabulares en precios, horas, duraciones y horario.
- **Do** usar `crema-3` para cualquier texto inactivo.
- **Do** dar a cada control un alto mínimo de 2,75rem (3,25rem en botones y campos) y foco visible de 2px en rojo coral.
- **Do** animar estados con `cubic-bezier(.16, 1, .3, 1)` entre .2s y .3s, y respetar `prefers-reduced-motion`.

### Don't:
- **Don't** usar sombras, degradados ni filetes decorativos; el único trazo es el borde de 1px de los controles.
- **Don't** poner rojo coral en elementos no interactivos (estrellas, precios, titulares).
- **Don't** redondear esquinas.
- **Don't** usar Bodoni en controles, etiquetas o texto corrido, ni Inter en ningún sitio.
- **Don't** poner etiquetas en mayúscula espaciada encima de los titulares.
- **Don't** meter tarjetas dentro de tarjetas ni montar filas de tarjetas con iconos.
- **Don't** añadir animaciones de entrada fuera del hero.
- **Don't** escribir colores sueltos en el código; todo sale de las variables de `:root`.
