// Reserva por WhatsApp sin backend + estado «abierto ahora». Sin librerías.
(() => {
  'use strict';
  const datos = JSON.parse(document.getElementById('datos-reserva').textContent);
  const DIAS = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']; // índice = Date.getDay()
  const DIAS_TXT = { lunes: 'lunes', martes: 'martes', miercoles: 'miércoles', jueves: 'jueves', viernes: 'viernes', sabado: 'sábado', domingo: 'domingo' };
  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; // fecha local, nunca UTC
  const aMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
  const aHora = (min) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;
  const fmtDia = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  const fmtCorto = { dia: new Intl.DateTimeFormat('es-ES', { weekday: 'short' }), mes: new Intl.DateTimeFormat('es-ES', { month: 'short' }) };
  const limpio = (s) => s.replace(/\.$/, '');

  /* ---------- Estado «abierto ahora» ---------- */
  function estadoAbierto() {
    const el = $('estado-abierto'); if (!el) return;
    const ahora = new Date(); const min = ahora.getHours() * 60 + ahora.getMinutes();
    const hoyCerrado = datos.cierres.includes(iso(ahora));
    const tramos = hoyCerrado ? [] : datos.horario[DIAS[ahora.getDay()]] || [];
    const abierto = tramos.find(([a, b]) => min >= aMin(a) && min < aMin(b));
    let txt;
    if (abierto) txt = `<b>Abierto ahora</b> · hasta las ${abierto[1]}`;
    else {
      const luego = tramos.find(([a]) => aMin(a) > min);
      if (luego) txt = `<b>Cerrado ahora</b> · abre hoy a las ${luego[0]}`;
      else for (let i = 1; i <= 14; i++) {
        const d = new Date(ahora); d.setDate(d.getDate() + i);
        const t = datos.cierres.includes(iso(d)) ? [] : datos.horario[DIAS[d.getDay()]] || [];
        if (t.length) { txt = `<b>Cerrado ahora</b> · abre ${i === 1 ? 'mañana' : 'el ' + DIAS_TXT[DIAS[d.getDay()]]} a las ${t[0][0]}`; break; }
      }
    }
    if (txt) el.innerHTML = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg><span>' + txt + '</span>';
  }
  estadoAbierto();

  /* ---------- Reserva ---------- */
  const form = $('form-reserva'); if (!form) return;
  const f = { nombre: $('f-nombre'), telefono: $('f-telefono'), idea: $('f-idea'), servicio: $('f-servicio'), artista: $('f-artista') };
  const cajaDias = $('dias'), cajaHoras = $('horas'), vista = $('vista-mensaje');
  const servicio = () => datos.servicios.find((s) => s.id === f.servicio.value);
  const artista = () => datos.artistas.find((b) => b.id === f.artista.value);
  const precio = (s) => (s.precio === 0 ? 'gratis' : `${s.desde ? 'desde ' : ''}${s.precio} €`);
  let diaSel = '', horaSel = '';

  /** Horas libres de un día según horario, duración del servicio, antelación y tatuador. */
  function horasDe(fecha) {
    const d = new Date(fecha + 'T12:00:00');
    const clave = DIAS[d.getDay()];
    if (datos.cierres.includes(fecha)) return { cerrado: 'Cerrado' }; // festivos y vacaciones se ven igual que el cierre semanal
    const tramos = datos.horario[clave] || [];
    if (!tramos.length) return { cerrado: 'Cerrado' };
    const b = artista();
    if (b && b.noTrabaja.includes(clave)) return { cerrado: 'Libra' };
    const dur = (servicio() || datos.servicios[0]).duracion;
    const paso = datos.reserva.intervaloMinutos;
    const ahora = new Date();
    const minimo = fecha === iso(ahora) ? ahora.getHours() * 60 + ahora.getMinutes() + datos.reserva.antelacionMinutos : -1;
    const horas = [];
    for (const [a, z] of tramos) for (let m = aMin(a); m + dur <= aMin(z); m += paso) if (m >= minimo) horas.push(aHora(m));
    return horas.length ? { horas } : { cerrado: 'Completo' };
  }

  function opcion(nombre, valor, contenido, { disabled = false, checked = false, etiqueta = '' } = {}) {
    const l = document.createElement('label'); l.className = 'opcion';
    const i = document.createElement('input'); i.type = 'radio'; i.name = nombre; i.value = valor; i.disabled = disabled; i.checked = checked;
    if (etiqueta) i.setAttribute('aria-label', etiqueta);
    const s = document.createElement('span'); s.innerHTML = contenido; // contenido generado aquí, nunca del usuario
    l.append(i, s); return l;
  }

  function pintarDias() {
    cajaDias.replaceChildren();
    const hoy = new Date(); let hayAlguno = false;
    for (let i = 0; i < datos.reserva.diasVista; i++) {
      const d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i);
      const fecha = iso(d); const r = horasDe(fecha);
      const nombreDia = i === 0 ? 'hoy' : i === 1 ? 'mañana' : limpio(fmtCorto.dia.format(d));
      const sub = r.cerrado ? r.cerrado.toLowerCase() : limpio(fmtCorto.mes.format(d));
      const etiqueta = `${fmtDia.format(d)}${r.cerrado ? ', no disponible (' + r.cerrado.toLowerCase() + ')' : ''}`;
      if (!r.cerrado) hayAlguno = true;
      cajaDias.append(opcion('dia', fecha, `<small>${nombreDia}</small><b>${d.getDate()}</b><small>${sub}</small>`, { disabled: !!r.cerrado, checked: fecha === diaSel && !r.cerrado, etiqueta }));
    }
    if (diaSel && horasDe(diaSel).cerrado) { diaSel = ''; horaSel = ''; }
    if (!hayAlguno) cajaDias.insertAdjacentHTML('beforeend', '<p class="nota">No hay días disponibles con esta combinación. Prueba con otro tatuador.</p>');
  }

  function pintarHoras() {
    cajaHoras.replaceChildren();
    if (!diaSel) { cajaHoras.innerHTML = '<p class="nota">Elige primero un día.</p>'; return; }
    const r = horasDe(diaSel);
    if (r.cerrado) { cajaHoras.innerHTML = '<p class="nota">Ese día no quedan horas. Elige otro día.</p>'; return; }
    if (!r.horas.includes(horaSel)) horaSel = '';
    for (const h of r.horas) cajaHoras.append(opcion('hora', h, h, { checked: h === horaSel }));
  }

  function mensaje() {
    const s = servicio(); const b = artista();
    const nombre = f.nombre.value.trim();
    const fechaTxt = diaSel ? fmtDia.format(new Date(diaSel + 'T12:00:00')) : '(elige un día)';
    return [
      `Hola, soy ${nombre || '(tu nombre)'}. Quiero pedir cita en ${datos.nombre}:`,
      `• Cita: ${s ? `${s.nombre} (${s.duracion} min, ${precio(s)})` : '(elige un tipo de cita)'}`,
      `• Tatuador: ${b ? b.nombre : 'sin preferencia'}`,
      `• Día: ${fechaTxt}${horaSel ? ', a las ' + horaSel : diaSel ? ' (elige una hora)' : ''}`,
      `• Teléfono: ${f.telefono.value.trim() || '(tu teléfono)'}`,
      ...(f.idea.value.trim() ? [`• Mi idea: ${f.idea.value.trim()}`] : []),
      '',
      'Quedo pendiente de vuestra confirmación. ¡Gracias!',
    ].join('\n');
  }
  const actualizarVista = () => { vista.textContent = mensaje(); $('enviado').hidden = true; }; // si cambia algo tras enviar, la confirmación ya no vale

  /* Validación con mensajes que dicen qué falta y cómo arreglarlo. */
  function error(campo, idError, texto) {
    const e = $(idError); e.textContent = texto; e.hidden = !texto;
    if (campo) campo.setAttribute('aria-invalid', texto ? 'true' : 'false');
    return !texto;
  }
  function validar() {
    const tel = f.telefono.value.replace(/\D/g, '');
    const ok = [
      error(f.nombre, 'e-nombre', f.nombre.value.trim().length < 2 ? 'Escribe tu nombre para saber a quién esperamos.' : ''),
      error(f.telefono, 'e-telefono', tel.length < 9 ? 'Escribe un teléfono de al menos 9 cifras para poder confirmarte.' : ''),
      error(null, 'e-dia', diaSel ? '' : 'Elige un día disponible.'),
      error(null, 'e-hora', horaSel ? '' : 'Elige una hora.'),
    ];
    return ok.every(Boolean);
  }

  cajaDias.addEventListener('change', (e) => { diaSel = e.target.value; horaSel = ''; error(null, 'e-dia', ''); pintarHoras(); actualizarVista(); });
  cajaHoras.addEventListener('change', (e) => { horaSel = e.target.value; error(null, 'e-hora', ''); actualizarVista(); });
  f.servicio.addEventListener('change', () => { pintarDias(); pintarHoras(); actualizarVista(); });
  f.artista.addEventListener('change', () => { pintarDias(); pintarHoras(); actualizarVista(); });
  f.nombre.addEventListener('input', () => { if (f.nombre.getAttribute('aria-invalid') === 'true') validar(); actualizarVista(); });
  f.idea.addEventListener('input', actualizarVista);
  f.telefono.addEventListener('input', () => { if (f.telefono.getAttribute('aria-invalid') === 'true') validar(); actualizarVista(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validar()) { const primero = form.querySelector('[aria-invalid="true"], .error:not([hidden])'); (primero?.closest('.campo, .selector')?.querySelector('input:not(:disabled)') || primero)?.focus(); return; }
    const url = `https://wa.me/${datos.whatsapp}?text=${encodeURIComponent(mensaje())}`;
    $('abrir-wa').href = url;
    const ok = $('enviado'); ok.hidden = false; ok.focus();
    window.open(url, '_blank', 'noopener');
  });

  /* Enlaces «Reservar» de la carta y del equipo: preseleccionan cita o tatuador. */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-servicio], [data-artista]'); if (!a) return;
    if (a.dataset.servicio) f.servicio.value = a.dataset.servicio;
    if (a.dataset.artista) f.artista.value = a.dataset.artista;
    pintarDias(); pintarHoras(); actualizarVista();
    setTimeout(() => f.nombre.focus({ preventScroll: true }), 400);
  });

  pintarDias(); pintarHoras(); actualizarVista();
})();
