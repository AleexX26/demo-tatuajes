// ÚNICO archivo de datos del negocio. Edita aquí y ejecuta `node build.mjs`.
// Todo lo de este archivo es DE EJEMPLO (negocio ficticio) hasta que pongas los datos reales.

export default {
  // true = web de demostración: noindex, robots «Disallow: /» y avisos de «datos de ejemplo».
  demo: true,

  // Dominio definitivo, sin barra final. Se usa en canonical, Open Graph, sitemap y JSON-LD.
  dominio: 'https://aleexx26.github.io/demo-tatuajes',

  nombre: 'Tinta Negra',
  // Frase corta bajo el H1 y en la meta description.
  lema: 'Estudio de tatuaje con diseño propio: línea fina, realismo y blackwork. Todo con consulta previa y cita.',
  ciudad: 'Leganés',

  direccion: {
    calle: 'Calle de Ejemplo, 12',
    codigoPostal: '28911',
    ciudad: 'Leganés',
    provincia: 'Madrid',
    pais: 'ES',
  },
  // Coordenadas del local (clic derecho en Google Maps → copiar). Ahora: centro de Leganés.
  coordenadas: { lat: 40.3281, lng: -3.7635 },
  // Enlace de «Cómo llegar». Vacío = se genera con las coordenadas.
  mapsUrl: '',

  telefono: '+34 600 000 000',
  // Número que recibe las reservas por WhatsApp (puede ser el mismo).
  whatsapp: '+34 600 000 000',
  instagram: 'https://www.instagram.com/',
  email: '',

  // Horario: tramos [apertura, cierre] por día. [] = cerrado.
  horario: {
    lunes: [],
    martes: [['11:00', '20:00']],
    miercoles: [['11:00', '20:00']],
    jueves: [['11:00', '20:00']],
    viernes: [['11:00', '20:00']],
    sabado: [['11:00', '18:00']],
    domingo: [],
  },
  // Días de cierre puntuales (festivos, vacaciones): 'AAAA-MM-DD'. No se pueden reservar.
  cierres: ['2026-11-02', '2026-12-08', '2026-12-25', '2027-01-01', '2027-01-06'],

  reserva: {
    diasVista: 28, // cuántos días hacia delante se ofrecen
    intervaloMinutos: 60, // cada cuánto empieza una cita
    antelacionMinutos: 1440, // no se ofrecen horas que empiecen antes de ahora + esto
  },

  // Servicios agrupados. precio en euros (0 = «Gratis»), duracion en minutos.
  // desde: true muestra «desde 200 €» (el precio final se cierra en la consulta).
  servicios: [
    {
      grupo: 'Primer contacto',
      items: [
        { id: 'consulta', nombre: 'Consulta y diseño', detalle: 'Hablamos de tu idea, zona y tamaño, y te damos presupuesto. Sin compromiso.', precio: 0, duracion: 30 },
      ],
    },
    {
      grupo: 'Tatuajes',
      items: [
        { id: 'flash', nombre: 'Flash', detalle: 'Diseño de nuestro catálogo, listo para tatuar.', precio: 60, duracion: 60 },
        { id: 'pequeno', nombre: 'Pequeño', detalle: 'Hasta 8 cm: letras, símbolos, línea fina.', precio: 90, duracion: 90 },
        { id: 'mediano', nombre: 'Mediano', detalle: 'Hasta 15 cm, con sombreado o color.', precio: 170, duracion: 180, desde: true },
        { id: 'sesion', nombre: 'Sesión completa', detalle: 'Piezas grandes: media manga, espalda, muslo. Cinco horas.', precio: 320, duracion: 300, desde: true },
      ],
    },
    {
      grupo: 'Después',
      items: [
        { id: 'retoque', nombre: 'Retoque', detalle: 'Gratis durante los tres primeros meses.', precio: 0, duracion: 30 },
        { id: 'cover', nombre: 'Cover o reforma', detalle: 'Tapar o rehacer un tatuaje antiguo. Se valora en consulta.', precio: 200, duracion: 240, desde: true },
      ],
    },
  ],

  // Tatuadores. noTrabaja: días de la semana en que no tiene agenda.
  artistas: [
    { id: 'dani', nombre: 'Dani Ferro', puesto: 'Fundador', especialidad: 'Blackwork y tradicional', foto: 'equipo-1', alt: 'Dani, tatuador con barba y gafas, sentado en el estudio con la máquina en la mano', noTrabaja: [] },
    { id: 'raul', nombre: 'Raúl Ortega', puesto: 'Tatuador', especialidad: 'Realismo en negro y gris', foto: 'equipo-2', alt: 'Raúl, tatuador con gorra, concentrado mientras tatúa un antebrazo, en blanco y negro', noTrabaja: ['sabado'] },
    { id: 'marta', nombre: 'Marta Ibáñez', puesto: 'Tatuadora', especialidad: 'Línea fina y botánico', foto: 'equipo-3', alt: 'Marta, tatuadora con guantes negros, sostiene una máquina dorada sobre un antebrazo', noTrabaja: ['martes'] },
  ],

  // Valoración de Google. Pon nota: null para ocultarla. NUNCA va al JSON-LD.
  valoracion: { nota: 4.9, opiniones: 96, url: '' },

  // Opiniones. En producción, copia reseñas reales (con permiso) o quita la sección.
  opiniones: [
    { texto: 'Llegué con una idea vaga y Marta me enseñó un diseño que era justo lo que buscaba. La línea fina ha cicatrizado perfecta.', autor: 'Lucía R.' },
    { texto: 'Mi primer tatuaje y me explicaron todo, desde el dolor hasta los cuidados. Sala impecable y cero prisas.', autor: 'Sergio M.' },
    { texto: 'Raúl me tapó un tatuaje de hace diez años. Ni se nota que estaba ahí.', autor: 'Andrés P.' },
  ],

  preguntas: [
    { p: '¿Hace falta pedir cita?', r: 'Sí, todos los tatuajes son con cita previa. Reserva una consulta desde esta web: hablamos de tu idea, te damos presupuesto y fijamos la fecha de la sesión.' },
    { p: '¿Puedo traer mi propio diseño?', r: 'Claro. Tráelo o envíanoslo por WhatsApp. Lo adaptamos a tu zona del cuerpo y, si hace falta, ajustamos el tamaño o los detalles para que envejezca bien.' },
    { p: '¿Cuánto cuesta un tatuaje?', r: 'Depende del tamaño, la zona y el detalle. En la carta tienes precios orientativos; el presupuesto cerrado te lo damos en la consulta.' },
    { p: '¿Hay que dejar señal?', r: 'Para sesiones medianas y largas pedimos una señal de 30 € que se descuenta del precio final. Se pierde si no avisas con al menos 48 horas.' },
    { p: '¿Hay edad mínima?', r: 'Hay que ser mayor de 18 años. Pedimos DNI el día de la sesión.' },
    { p: '¿Cómo cuido el tatuaje después?', r: 'Te damos una hoja de cuidados por escrito y te la mandamos por WhatsApp. Si algo no cicatriza bien, escríbenos y lo vemos.' },
    { p: '¿Qué higiene seguís?', r: 'Agujas y material de un solo uso, superficies protegidas y desinfectadas entre clientes y todo el material esterilizado. Puedes preguntarnos lo que quieras antes de empezar.' },
  ],

  // Fotos (en src/img, en WebP a varios tamaños: nombre-ANCHO.webp).
  fotos: {
    hero: { nombre: 'hero', anchos: [600, 900, 1200], ratio: [4, 5], alt: 'Manos con guantes blancos tatuando con máquina un antebrazo ya tatuado' },
    galeria: [
      { nombre: 'navaja', anchos: [480, 960], ratio: [4, 5], alt: 'Tatuador con mascarilla tatuando el antebrazo de un cliente' },
      { nombre: 'local', anchos: [480, 960, 1440], ratio: [3, 2], alt: 'Interior del estudio: un tatuador trabaja sobre un cliente en la camilla, rodeado de cuadros' },
      { nombre: 'barba', anchos: [480, 960], ratio: [4, 5], alt: 'Detalle de la máquina de tatuar con guantes negros sobre la piel' },
      { nombre: 'herramientas', anchos: [480, 960], ratio: [3, 2], alt: 'Mesa de trabajo con tintas y material, con el tatuador de perfil en blanco y negro' },
      { nombre: 'tijera', anchos: [480, 960], ratio: [4, 5], alt: 'Rótulo antiguo de «Tattoo» en la fachada de un edificio' },
      { nombre: 'maquina', anchos: [480, 960], ratio: [3, 2], alt: 'Tatuador con guantes negros dibujando un diseño sobre el pecho de un cliente' },
    ],
    contacto: { nombre: 'lamparas', anchos: [480, 960], ratio: [4, 5], alt: 'Tatuador con gafas trabajando sobre la espalda de un cliente' },
    og: 'og.jpg', // 1200×630 para redes sociales
  },

  // Créditos de las fotos de ejemplo (licencia Unsplash). Vacía la lista al usar fotos propias.
  creditos: [
    { autor: 'Allef Vinicius', url: 'https://unsplash.com/photos/hxNiXP498UI' },
    { autor: 'Julia Giacomini', url: 'https://unsplash.com/photos/B_VLJouyKR4' },
    { autor: 'Motoki Tonn', url: 'https://unsplash.com/photos/RF6NLFcWsxk' },
    { autor: 'Collins Lesulie', url: 'https://unsplash.com/photos/PWK6CeCJtJw' },
    { autor: 'Maxim Hopman', url: 'https://unsplash.com/photos/52Kf36w124Y' },
    { autor: 'Jan Kopřiva', url: 'https://unsplash.com/photos/t0_IHtKuK_4' },
    { autor: 'R.D. Smith', url: 'https://unsplash.com/photos/HJImUtsCnck' },
    { autor: 'R.D. Smith', url: 'https://unsplash.com/photos/ad4vJQDtLKY' },
    { autor: 'Certified Tattoo Academy', url: 'https://unsplash.com/photos/Xkdyu1IOBb4' },
    { autor: 'Kristian Angelo', url: 'https://unsplash.com/photos/xyJZvUL4_TY' },
    { autor: 'Thomas Despeyroux', url: 'https://unsplash.com/photos/879s_FY4254' },
  ],
};
