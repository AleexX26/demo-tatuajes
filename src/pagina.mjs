// Genera el HTML completo de la página a partir de negocio.config.mjs.
// No contiene datos del negocio: todo sale de `c` (la configuración).

export const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
const DIAS_TXT = { lunes: 'Lunes', martes: 'Martes', miercoles: 'Miércoles', jueves: 'Jueves', viernes: 'Viernes', sabado: 'Sábado', domingo: 'Domingo' };
const DIAS_SCHEMA = { lunes: 'Monday', martes: 'Tuesday', miercoles: 'Wednesday', jueves: 'Thursday', viernes: 'Friday', sabado: 'Saturday', domingo: 'Sunday' };

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const euros = (n) => (n === 0 ? 'Gratis' : `${String(n).replace('.', ',')} €`);
const precioTxt = (s) => (s.desde ? 'desde ' : '') + euros(s.precio);
const hora = (h) => h.replace(/^0/, '');
const telHref = (t) => 'tel:+' + digitos(t);
/** Igual que whatsappLink de Atelier Barber: añade 34 a móviles españoles sin prefijo. */
export const digitos = (t) => { let d = String(t).replace(/\D/g, ''); if (d.startsWith('00')) d = d.slice(2); if (d.length === 9 && /^[6789]/.test(d)) d = '34' + d; return d; };
const waHref = (t, texto) => `https://wa.me/${digitos(t)}${texto ? '?text=' + encodeURIComponent(texto) : ''}`;
export const mapsHref = (c) => c.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${c.coordenadas.lat},${c.coordenadas.lng}`;
const tramosTxt = (t) => t.map(([a, b]) => `${hora(a)}–${hora(b)}`).join(' y ');

/** Agrupa días seguidos con el mismo horario: «Martes a jueves: 10–14 y 16–20:30». */
export function horarioAgrupado(horario) {
  const grupos = [];
  for (const d of DIAS) {
    const clave = JSON.stringify(horario[d] ?? []);
    const ult = grupos.at(-1);
    if (ult && ult.clave === clave) ult.dias.push(d); else grupos.push({ clave, dias: [d], tramos: horario[d] ?? [] });
  }
  return grupos.map((g) => ({
    dias: g.dias.length === 1 ? DIAS_TXT[g.dias[0]] : g.dias.length === 2 ? `${DIAS_TXT[g.dias[0]]} y ${DIAS_TXT[g.dias[1]].toLowerCase()}` : `${DIAS_TXT[g.dias[0]]} a ${DIAS_TXT[g.dias.at(-1)].toLowerCase()}`,
    texto: g.tramos.length ? tramosTxt(g.tramos) : 'Cerrado',
    cerrado: !g.tramos.length,
  }));
}

// Iconos de un solo trazo (1.5) dibujados a mano, sin librería.
const I = {
  estrella: '<path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" fill="currentColor" stroke="none"/>',
  telefono: '<path d="M5 4h3.5l1.7 4.3-2.3 1.4a11 11 0 0 0 6.4 6.4l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/>',
  mensaje: '<path d="M4 12a8 8 0 1 1 3.6 6.7L4 20l1.3-3.5A8 8 0 0 1 4 12z"/><path d="M9 10.5h6M9 13.5h4"/>',
  mapa: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  reloj: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  instagram: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><path d="M16.8 7.2h.01"/>',
};
const icono = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;

/** <img> responsive en WebP con width/height reales para evitar saltos. */
function imagen(f, { sizes, lazy = true, cls = '' } = {}) {
  const [rw, rh] = f.ratio;
  const max = f.anchos.at(-1);
  const srcset = f.anchos.map((w) => `img/${f.nombre}-${w}.webp ${w}w`).join(', ');
  return `<img class="${cls}" src="img/${f.nombre}-${f.anchos[Math.min(1, f.anchos.length - 1)]}.webp" srcset="${srcset}" sizes="${sizes}" width="${max}" height="${Math.round((max * rh) / rw)}" alt="${esc(f.alt)}"${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}>`;
}

function jsonLd(c) {
  const dir = c.direccion;
  const porTramo = new Map();
  for (const d of DIAS) for (const [a, b] of c.horario[d] ?? []) {
    const k = a + '|' + b; if (!porTramo.has(k)) porTramo.set(k, []); porTramo.get(k).push(DIAS_SCHEMA[d]);
  }
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TattooParlor',
    '@id': c.dominio + '/#negocio',
    name: c.nombre,
    description: c.lema,
    url: c.dominio + '/',
    telephone: '+' + digitos(c.telefono),
    image: [c.dominio + '/img/' + c.fotos.og, c.dominio + `/img/${c.fotos.hero.nombre}-${c.fotos.hero.anchos.at(-1)}.webp`],
    priceRange: `${Math.min(...c.servicios.flatMap((g) => g.items.map((s) => s.precio)))}–${Math.max(...c.servicios.flatMap((g) => g.items.map((s) => s.precio)))} €`,
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Efectivo, tarjeta',
    address: { '@type': 'PostalAddress', streetAddress: dir.calle, postalCode: dir.codigoPostal, addressLocality: dir.ciudad, addressRegion: dir.provincia, addressCountry: dir.pais },
    geo: { '@type': 'GeoCoordinates', latitude: c.coordenadas.lat, longitude: c.coordenadas.lng },
    hasMap: mapsHref(c),
    areaServed: { '@type': 'City', name: c.ciudad },
    openingHoursSpecification: [...porTramo].map(([k, dias]) => { const [opens, closes] = k.split('|'); return { '@type': 'OpeningHoursSpecification', dayOfWeek: dias, opens, closes }; }),
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Servicios de tatuaje',
      itemListElement: c.servicios.map((g) => ({
        '@type': 'OfferCatalog', name: g.grupo,
        itemListElement: g.items.map((s) => ({ '@type': 'Offer', price: s.precio.toFixed(2), priceCurrency: 'EUR', itemOffered: { '@type': 'Service', name: s.nombre, description: s.detalle } })),
      })),
    },
  };
  if (c.instagram) data.sameAs = [c.instagram];
  if (c.email) data.email = c.email;
  if (c.cierres?.length) data.specialOpeningHoursSpecification = c.cierres.map((f) => ({ '@type': 'OpeningHoursSpecification', validFrom: f, validThrough: f, opens: '00:00', closes: '00:00' }));
  // JSON dentro de <script>: escapar «<» para que ningún texto pueda cerrar la etiqueta.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function render(c, { css, version }) {
  const titulo = `${c.nombre} · Estudio de tatuajes en ${c.ciudad} | Diseño propio y cita previa`;
  const descripcion = `Estudio de tatuajes en ${c.ciudad}: línea fina, realismo, blackwork y cover. Mira precios y horario y pide tu consulta por WhatsApp en un minuto.`;
  const url = c.dominio + '/';
  const og = c.dominio + '/img/' + c.fotos.og;
  const horario = horarioAgrupado(c.horario);
  const direccionTxt = `${c.direccion.calle}, ${c.direccion.codigoPostal} ${c.direccion.ciudad}`;
  const ejemplo = c.demo ? ' <span class="ejemplo">ejemplo</span>' : '';
  const waGeneral = waHref(c.whatsapp, `Hola, quería información sobre ${c.nombre}.`);
  const todos = c.servicios.flatMap((g) => g.items);

  const datosReserva = JSON.stringify({
    nombre: c.nombre, whatsapp: digitos(c.whatsapp), horario: c.horario, cierres: c.cierres ?? [], reserva: c.reserva,
    servicios: todos.map(({ id, nombre, precio, desde, duracion }) => ({ id, nombre, precio, desde: !!desde, duracion })),
    artistas: c.artistas.map(({ id, nombre, noTrabaja }) => ({ id, nombre: nombre.split(' ')[0], noTrabaja: noTrabaja ?? [] })),
  }).replace(/</g, '\\u003c');

  const valoracion = c.valoracion?.nota ? `<p class="valoracion">${c.valoracion.url ? `<a href="${esc(c.valoracion.url)}" rel="noopener" target="_blank">` : ''}<span class="estrellas" aria-hidden="true">${icono('estrella', 'ico-e')}${icono('estrella', 'ico-e')}${icono('estrella', 'ico-e')}${icono('estrella', 'ico-e')}${icono('estrella', 'ico-e')}</span> <strong>${String(c.valoracion.nota).replace('.', ',')}</strong> en Google · ${c.valoracion.opiniones} opiniones${c.valoracion.url ? '</a>' : ''}${c.demo ? ' <span class="ejemplo">dato de ejemplo</span>' : ''}</p>` : '';

  const servicios = c.servicios.map((g) => `
      <div class="grupo">
        <h3>${esc(g.grupo)}</h3>
        <ul class="carta">${g.items.map((s) => `
          <li><a class="servicio" href="#reserva" data-servicio="${esc(s.id)}">
            <span class="s-nombre">${esc(s.nombre)}<span class="s-detalle">${esc(s.detalle)}</span></span>
            <span class="s-duracion">${s.duracion} min</span>
            <span class="s-precio">${precioTxt(s)}</span>
            <span class="s-ir">Reservar <span class="visually-hidden">${esc(s.nombre)}</span>${icono('flecha')}</span>
          </a></li>`).join('')}
        </ul>
      </div>`).join('');

  const galeria = c.fotos.galeria.map((f, i) => `
      <figure class="g g-${i + 1}">${imagen(f, { sizes: i === 1 ? '(min-width: 900px) 58vw, 100vw' : '(min-width: 900px) 34vw, 50vw' })}</figure>`).join('');

  const equipo = c.artistas.map((b, i) => `
      <article class="artista a-${i + 1}">
        ${imagen({ nombre: b.foto, anchos: [400, 800], ratio: [4, 5], alt: b.alt }, { sizes: i === 0 ? '(min-width: 900px) 40vw, 100vw' : '(min-width: 900px) 24vw, 50vw' })}
        <h3>${esc(b.nombre)}</h3>
        <p class="a-puesto">${esc(b.puesto)} · ${esc(b.especialidad)}</p>
        <a class="enlace" href="#reserva" data-artista="${esc(b.id)}">Reservar con ${esc(b.nombre.split(' ')[0])}${icono('flecha')}</a>
      </article>`).join('');

  const [op1, ...opResto] = c.opiniones ?? [];
  const opiniones = op1 ? `
  <section class="opiniones" id="opiniones" aria-labelledby="t-opiniones">
    <div class="envoltura">
      <h2 id="t-opiniones">Lo que dicen los clientes</h2>
      ${c.demo ? '<p class="aviso-seccion">Opiniones de ejemplo. Con un cliente real se sustituyen por reseñas reales de Google, con su permiso.</p>' : ''}
      <div class="op-rejilla">
        <figure class="op op-grande"><blockquote><p>${esc(op1.texto)}</p></blockquote><figcaption>${esc(op1.autor)}${ejemplo}</figcaption></figure>
        ${opResto.map((o) => `<figure class="op"><blockquote><p>${esc(o.texto)}</p></blockquote><figcaption>${esc(o.autor)}${ejemplo}</figcaption></figure>`).join('')}
      </div>
    </div>
  </section>` : '';

  const tablaHorario = `<table class="horario"><caption class="visually-hidden">Horario de apertura</caption><tbody>${horario.map((h) => `<tr${h.cerrado ? ' class="cerrado"' : ''}><th scope="row">${h.dias}</th><td>${h.texto}</td></tr>`).join('')}</tbody></table>`;

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descripcion)}">
${c.demo ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<link rel="canonical" href="${esc(url)}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="theme-color" content="#141210">
<meta name="color-scheme" content="dark">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="${esc(c.nombre)}">
<meta property="og:title" content="${esc(`${c.nombre}, estudio de tatuajes en ${c.ciudad}`)}">
<meta property="og:description" content="${esc(descripcion)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(og)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(c.fotos.hero.alt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(`${c.nombre}, estudio de tatuajes en ${c.ciudad}`)}">
<meta name="twitter:description" content="${esc(descripcion)}">
<meta name="twitter:image" content="${esc(og)}">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preload" href="fonts/bodoni-moda-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/instrument-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<style>${css}</style>
<script type="application/ld+json">${jsonLd(c)}</script>
</head>
<body>
<a class="saltar" href="#contenido">Saltar al contenido</a>
${c.demo ? `<p class="banda-demo">Web de demostración: ${esc(c.nombre)} es un negocio ficticio y los datos son de ejemplo.</p>` : ''}
<header class="cabecera">
  <div class="envoltura cab-fila">
    <a class="marca" href="#contenido">${esc(c.nombre)}</a>
    <nav aria-label="Principal">
      <ul class="nav">
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#equipo">Tatuadores</a></li>
        <li><a href="#opiniones">Opiniones</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
    <a class="boton boton-peq" href="#reserva">Reservar</a>
  </div>
</header>

<main id="contenido">
  <section class="hero" aria-labelledby="t-hero">
    <div class="hero-texto">
      <h1 id="t-hero"><span class="l1">Tatuajes</span> <span class="l2">en ${esc(c.ciudad)}</span></h1>
      <p class="hero-lema"><strong>${esc(c.nombre)}.</strong> ${esc(c.lema)}</p>
      ${valoracion}
      <div class="acciones">
        <a class="boton" href="#reserva">Reservar cita</a>
        <a class="enlace" href="${telHref(c.telefono)}">${icono('telefono')}Llamar al ${esc(c.telefono.replace(/^\+34\s?/, ''))}</a>
      </div>
      <p class="estado" id="estado-abierto" aria-live="polite"></p>
    </div>
    <div class="hero-foto">${imagen(c.fotos.hero, { sizes: '(min-width: 900px) 58vw, 100vw', lazy: false })}</div>
  </section>

  <section class="servicios" id="servicios" aria-labelledby="t-servicios">
    <div class="envoltura serv-rejilla">
      <div class="serv-intro">
        <h2 id="t-servicios">Tarifas</h2>
        <p>Precios orientativos con IVA incluido; el presupuesto cerrado se da en la consulta. Se paga en el estudio, con tarjeta o en efectivo. Toca una opción para reservarla.</p>
      </div>
      <div class="serv-lista">${servicios}
      </div>
    </div>
  </section>

  <section class="galeria" id="galeria" aria-labelledby="t-galeria">
    <div class="envoltura">
      <h2 id="t-galeria">Trabajos y estudio</h2>
      <div class="g-rejilla">${galeria}
      </div>
    </div>
  </section>

  <section class="equipo" id="equipo" aria-labelledby="t-equipo">
    <div class="envoltura">
      <h2 id="t-equipo">Los tatuadores</h2>
      <div class="eq-rejilla">${equipo}
      </div>
    </div>
  </section>
${opiniones}
  <section class="reserva" id="reserva" aria-labelledby="t-reserva">
    <div class="envoltura res-rejilla">
      <div class="res-intro-col">
        <h2 id="t-reserva">Pide tu cita</h2>
        <p class="res-intro">Empieza por una consulta gratis o elige directamente tu sesión. Te abrimos WhatsApp con el mensaje escrito; solo tienes que enviarlo. La cita queda <strong>pendiente</strong> hasta que te la confirmemos.</p>
        <p class="nota">Los festivos y días de cierre no se pueden elegir. ¿Prefieres hablar? <a href="${telHref(c.telefono)}">Llama al ${esc(c.telefono)}</a> o <a href="${esc(waGeneral)}" target="_blank" rel="noopener">escríbenos</a>.</p>
        <noscript><p class="nota">Para elegir día y hora necesitas JavaScript. También puedes <a href="${esc(waGeneral)}">escribirnos por WhatsApp</a> o llamar al ${esc(c.telefono)}.</p></noscript>
      </div>
      <div class="res-form">
        <form id="form-reserva" novalidate>
          <div class="campos">
            <div class="campo">
              <label for="f-nombre">Nombre</label>
              <input id="f-nombre" name="nombre" autocomplete="name" required minlength="2" maxlength="60" aria-describedby="e-nombre">
              <p class="error" id="e-nombre" hidden></p>
            </div>
            <div class="campo">
              <label for="f-telefono">Teléfono</label>
              <input id="f-telefono" name="telefono" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20" aria-describedby="e-telefono">
              <p class="error" id="e-telefono" hidden></p>
            </div>
            <div class="campo">
              <label for="f-servicio">Tipo de cita</label>
              <select id="f-servicio" name="servicio" required>
                ${c.servicios.map((g) => `<optgroup label="${esc(g.grupo)}">${g.items.map((s) => `<option value="${esc(s.id)}">${esc(s.nombre)} · ${precioTxt(s)} · ${s.duracion} min</option>`).join('')}</optgroup>`).join('')}
              </select>
            </div>
            <div class="campo">
              <label for="f-artista">Tatuador</label>
              <select id="f-artista" name="artista">
                <option value="">Sin preferencia</option>
                ${c.artistas.map((b) => `<option value="${esc(b.id)}">${esc(b.nombre.split(' ')[0])}</option>`).join('')}
              </select>
            </div>
          </div>
          <fieldset class="selector" aria-describedby="e-dia">
            <legend>Día</legend>
            <div class="dias" id="dias"></div>
            <p class="error" id="e-dia" hidden></p>
          </fieldset>
          <fieldset class="selector" aria-describedby="e-hora">
            <legend>Hora</legend>
            <div class="horas" id="horas"><p class="nota">Elige primero un día.</p></div>
            <p class="error" id="e-hora" hidden></p>
          </fieldset>
          <div class="campo campo-idea">
            <label for="f-idea">Tu idea <span class="opcional">(opcional)</span></label>
            <textarea id="f-idea" name="idea" rows="3" maxlength="400" placeholder="Zona del cuerpo, tamaño aproximado y estilo. Las imágenes de referencia las puedes mandar por WhatsApp después."></textarea>
          </div>
          <div class="vista">
            <p class="vista-titulo" id="t-vista">Así llegará tu mensaje</p>
            <p class="burbuja" id="vista-mensaje" aria-labelledby="t-vista"></p>
          </div>
          <button class="boton boton-ancho" type="submit">${icono('mensaje')}Enviar solicitud por WhatsApp</button>
          <div class="enviado" id="enviado" tabindex="-1" hidden>
            <h3>Solicitud preparada</h3>
            <p>Envía el mensaje en WhatsApp. Tu cita queda <strong>pendiente de confirmación</strong>: te responderemos en cuanto la revisemos.</p>
            <p><a class="enlace" id="abrir-wa" href="${esc(waGeneral)}" target="_blank" rel="noopener">Abrir WhatsApp otra vez${icono('flecha')}</a></p>
          </div>
        </form>
      </div>
    </div>
  </section>

  <section class="preguntas" id="preguntas" aria-labelledby="t-preguntas">
    <div class="envoltura preg-rejilla">
      <h2 id="t-preguntas">Preguntas frecuentes</h2>
      <div class="preg-lista">${(c.preguntas ?? []).map((q) => `
        <details><summary>${esc(q.p)}</summary><p>${esc(q.r)}</p></details>`).join('')}
      </div>
    </div>
  </section>

  <section class="contacto" id="contacto" aria-labelledby="t-contacto">
    <div class="envoltura con-rejilla">
      <div class="con-texto">
        <h2 id="t-contacto">Dónde estamos</h2>
        <address>
          <p class="con-dir">${esc(c.direccion.calle)}<br>${esc(c.direccion.codigoPostal)} ${esc(c.direccion.ciudad)}, ${esc(c.direccion.provincia)}${c.demo ? '<span class="ejemplo">dirección de ejemplo</span>' : ''}</p>
          <ul class="con-acciones">
            <li><a class="boton" href="${esc(mapsHref(c))}" target="_blank" rel="noopener">${icono('mapa')}Cómo llegar</a></li>
            <li><a class="enlace" href="${telHref(c.telefono)}">${icono('telefono')}${esc(c.telefono)}</a></li>
            <li><a class="enlace" href="${esc(waGeneral)}" target="_blank" rel="noopener">${icono('mensaje')}WhatsApp</a></li>
            ${c.instagram ? `<li><a class="enlace" href="${esc(c.instagram)}" target="_blank" rel="noopener">${icono('instagram')}Instagram</a></li>` : ''}
            ${c.email ? `<li><a class="enlace" href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>` : ''}
          </ul>
        </address>
        <h3>Horario</h3>
        ${tablaHorario}
      </div>
      <div class="con-foto">${imagen(c.fotos.contacto, { sizes: '(min-width: 900px) 40vw, 100vw' })}</div>
    </div>
  </section>
</main>

<footer class="pie">
  <div class="envoltura">
    <p class="pie-marca" aria-hidden="true">${esc(c.nombre)}</p>
    <p class="pie-linea">${esc(c.nombre)} · Estudio de tatuajes en ${esc(c.ciudad)} · ${esc(direccionTxt)}</p>
    ${c.demo ? '<p class="pie-linea">Web de demostración. El negocio, la dirección, el teléfono, la valoración y las opiniones son ficticios.</p>' : ''}
    ${c.creditos?.length ? `<p class="pie-creditos">Fotos de ${[...new Map(c.creditos.map((f) => [f.autor, f])).values()].map((f) => `<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.autor)}</a>`).join(', ')} en Unsplash.</p>` : ''}
    <p class="pie-creditos">Esta web no usa cookies ni analítica.</p>
  </div>
</footer>

<nav class="barra-movil" aria-label="Acciones rápidas">
  <a href="#reserva" class="bm-principal">Reservar</a>
  <a href="${esc(waGeneral)}" target="_blank" rel="noopener">${icono('mensaje')}WhatsApp</a>
  <a href="${telHref(c.telefono)}">${icono('telefono')}Llamar</a>
</nav>

<script type="application/json" id="datos-reserva">${datosReserva}</script>
<script src="app.js?v=${version}" defer></script>
</body>
</html>
`;
}
