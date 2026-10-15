# CLAUDE.md — Demo estudio de tatuajes (Tinta Negra)

Web demo de una página para enseñar a estudios de tatuaje: tarifas, galería, tatuadores, opiniones, FAQ y reserva de consulta o sesión por WhatsApp sin backend. Negocio ficticio en Leganés (convertida desde la demo de barbería Casa Ferro); todos los datos son de ejemplo.

## Stack

- HTML/CSS/JS estático sin librerías ni dependencias npm
- Node 24 (solo para `build.mjs` y `servir.mjs`)
- Fuentes autoalojadas: Bodoni Moda (titulares) e Instrument Sans (texto), woff2 latin
- Fotos de tatuaje de Unsplash en WebP (tamaños generados con parámetros imgix al descargarlas)

## Arquitectura

```
negocio.config.mjs   ÚNICO archivo de datos (nombre, dirección, coordenadas, horario, cierres,
                     servicios, artistas, valoración, opiniones, FAQ, fotos, créditos, demo, dominio)
build.mjs            Lee la config, valida (fotos, fechas, datos de ejemplo si demo:false) y genera publico/
src/pagina.mjs       render(config) → HTML completo ya renderizado (SEO, OG, JSON-LD TattooParlor, secciones)
src/estilos.css      Estilos; el build los minifica y los mete en línea en el <head>
src/app.js           Reserva (días/horas, validación, mensaje wa.me) y «Abierto ahora»
src/img/             Fotos nombre-ANCHO.webp + og.jpg; los .json son la procedencia (no se publican)
src/fonts/           woff2
publico/             SALIDA generada (no editar): index.html, app.js, img, fonts, robots.txt, sitemap.xml, _headers
servir.mjs           Servidor estático local en :4321 para probar publico/
scripts/capturar.mjs Capturas de página completa (desktop/móvil) con Edge headless por CDP
PRODUCT.md           Contexto de producto (impeccable)
.impeccable/         Brief de superficie con el contrato de dirección y capturas de revisión
```

Flujo de la reserva: el cliente elige tipo de cita, tatuador, día y hora (y cuenta su idea) → `app.js` calcula huecos con horario ∩ duración del servicio − cierres − días libres del tatuador − antelación → abre `https://wa.me/<num>?text=<mensaje>` → la cita queda pendiente hasta que el negocio responda.

## Comandos

```bash
node build.mjs     # genera publico/ (se para si con demo:false queda algo de ejemplo)
node servir.mjs    # http://localhost:4321
node scripts/capturar.mjs http://localhost:4321/ 390 .impeccable/review mobile 1600   # capturas para revisar
```

Despliegue: cada push a main redespliega en Cloudflare Workers (`wrangler.jsonc`, carpeta `publico/` commiteada: ejecuta `node build.mjs` y haz commit de `publico/` antes del push). GitHub Pages sigue como copia (`.github/workflows/pages.yml`).

## Decisiones

- 2026-10-15: despliegue definitivo en Cloudflare Workers (assets estáticos): `wrangler.jsonc` sirve `publico/` (que va commiteado) y el Git integration de Cloudflare redespliega en cada push a main; URL https://demo-tatuajes.e275.workers.dev/ (`workers_dev: true`, si no la URL queda deshabilitada). Repo: https://github.com/AleexX26/demo-tatuajes. GitHub Pages sigue activo con `.github/workflows/pages.yml` pero ya no es la URL canónica.
- 2026-10-15: conversión de barbería a estudio de tatuajes (carpeta `Proyectos/Tatuajes/`, sin repositorio git todavía). `barberos` pasa a `artistas` en config, build y JS; servicios = consulta gratis, tatuajes por tamaño (con `desde: true` para precio orientativo) y retoque/cover; citas de 60 min de intervalo y 24 h de antelación; el formulario añade campo «Tu idea» que viaja en el mensaje de WhatsApp; JSON-LD `TattooParlor`; acento rojo coral. Fotos de tatuaje de Unsplash (11 fotos, mismos nombres de archivo que antes: `barba`, `tijera`, etc. ya no describen su contenido), con alts y créditos actualizados.
- 2026-10-14: build de Node sin dependencias que prerenderiza el HTML desde la config. Así el contenido, el título, la descripción, OG y JSON-LD llegan sin JavaScript (mejor SEO y velocidad) y los datos viven en un solo archivo.
- 2026-10-14: valoración de Google como dato de config, visible solo si está rellena y marcada «dato de ejemplo» en demo; nunca en JSON-LD (sin aggregateRating, Google no admite estrellas propias en LocalBusiness).
- 2026-10-14: mapa como enlace «Cómo llegar» y fuentes autoalojadas en vez de iframe de Maps o Google Fonts: sin cookies ni peticiones a terceros, así que no hace falta banner.
- 2026-10-14: la CSP va en `publico/_headers` y no en un `<meta>`, porque con `'self'` en `file://` Chrome bloquearía el JS al abrir el HTML con doble clic.
- 2026-10-14: días como botones de radio (próximos 21) en vez de `<input type=date>`, porque el nativo no permite bloquear días concretos. Los cerrados se ven deshabilitados con su motivo (Cerrado, Libra, Completo).
- 2026-10-14: dirección de diseño fijada en el plan aprobado: carbón #141210, crema #ede6d8, rojo coral #e8624c (antes latón #c49a5a); sin degradados, filetes, sombras en reposo, etiquetas en mayúsculas ni tarjetas anidadas. Instrument Sans se mantiene aunque impeccable la marca como fuente muy usada, porque la aprobó el usuario.
- 2026-10-14: proyecto en `Proyectos/peluqueria/` (decisión del usuario), fuera del repositorio de Atelier Barber. Repositorio propio público: https://github.com/AleexX26/demo-barberia (rama main). Publicada en GitHub Pages (https://aleexx26.github.io/demo-barberia/) con `.github/workflows/pages.yml`, que ejecuta `node build.mjs` y sube `publico/` en cada push a main. En Pages no se aplican `_headers` ni el `robots.txt` (no está en la raíz del dominio); el noindex lo hace el `<meta name="robots">`.

## Patrones reutilizables

- **Web local desde un solo archivo de config + build sin dependencias**: `negocio.config.mjs` + `build.mjs` + `src/pagina.mjs`.
- **Reserva por WhatsApp sin backend con huecos reales**: `src/app.js` (`horasDe`, `mensaje`); el enlace `wa.me` usa `digitos()` (añade 34 a móviles españoles), igual que `whatsappLink` de Atelier Barber.
- **JSON-LD TattooParlor/LocalBusiness desde config** (horario agrupado por tramos, catálogo de servicios, cierres como specialOpeningHours): `jsonLd()` en `src/pagina.mjs`.
- **Modo demo con un flag**: `demo: true` → noindex, `Disallow: /`, `X-Robots-Tag` y avisos de ejemplo; con `false` el build valida que no quede nada de ejemplo.
- **«Abierto ahora» calculado en cliente desde el horario**: `estadoAbierto()` en `src/app.js`.
- **Capturas fiables de página completa sin Playwright** (`scripts/capturar.mjs`): Edge headless por CDP con `--remote-allow-origins=*`, viewport con `Emulation.setDeviceMetricsOverride` (el modo `--screenshot` no baja de unos 500 px de ancho y no espera a la carga diferida).

## Avisos

- La fecha de los días se calcula en hora local (`iso()` en app.js), nunca con `toISOString()`, que la desplaza a UTC.
- El minificador de CSS de `build.mjs` es básico: no uses comentarios dentro de cadenas ni dependas de espacios alrededor de `:`.
- Las fotos y opiniones de ejemplo están marcadas en la página; con un cliente real sigue la lista de README.md («Pasar a producción»).

## Última actualización

2026-10-15
