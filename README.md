# Demo estudio de tatuajes (Tinta Negra, Leganés)

Web de una página para enseñar a estudios de tatuaje. Negocio **ficticio**; todos los datos son de ejemplo.

## Usarla

```bash
node build.mjs        # genera publico/ desde negocio.config.mjs
node servir.mjs       # http://localhost:4321 para probarla
```

`publico/` es lo que se sube (Netlify, Cloudflare Pages, GitHub Pages o cualquier hosting estático).
También se puede abrir `publico/index.html` con doble clic.

## Cambiarla a un cliente real (unos 10 minutos)

1. Edita **solo** `negocio.config.mjs`: nombre, ciudad, dirección, coordenadas, teléfono, WhatsApp,
   Instagram, horario, cierres (festivos y vacaciones), servicios y precios, tatuadores y preguntas.
2. Cambia las fotos en `src/img/` con el mismo nombre y tamaños (`hero-600.webp`, `hero-900.webp`...).
   Si cambian los nombres, cámbialos también en `fotos` dentro de la configuración. Vacía `creditos`.
3. `node build.mjs`. Si queda algo de ejemplo con `demo: false`, el build se para y dice qué es.

## Fotos que hay que pedir al cliente

Horizontales y verticales, con buena luz y sin caras de clientes que no hayan dado permiso.

| Foto | Uso | Formato |
| --- | --- | --- |
| Un tatuador trabajando, con el local de fondo | Hero (lo primero que se ve) | Vertical 4:5, mínimo 1200×1500 |
| Fachada o puerta con el rótulo | Galería, y ayuda a que te encuentren en la calle | Horizontal 3:2 |
| Interior completo con los sillones | Galería | Horizontal 3:2, mínimo 1440 de ancho |
| 3 o 4 trabajos terminados: degradado, barba, afeitado, corte a tijera | Galería | Verticales 4:5 |
| Detalle de herramientas o productos | Galería | Horizontal 3:2 |
| Retrato de cada tatuador, mismo fondo y luz | Equipo | Vertical 4:5, mínimo 800×1000 |
| Logotipo en SVG o PNG grande | Cabecera, favicon e imagen para redes | — |
| Una imagen para redes sociales | Al compartir el enlace por WhatsApp o Instagram | 1200×630 JPG |

Para pasar a WebP sin instalar nada: [squoosh.app](https://squoosh.app), calidad 70, en los anchos de la tabla.

## Pasar a producción

- [ ] En `negocio.config.mjs`, `demo: false`. Esto quita a la vez el `noindex, nofollow`, el `Disallow: /`
      de `robots.txt`, la cabecera `X-Robots-Tag` y los avisos de «ejemplo».
- [ ] `dominio` con el dominio real (`https://...`, sin barra final). De él salen el **canonical**, la URL de
      Open Graph, el **sitemap.xml**, el `Sitemap:` de robots.txt y las URLs del **JSON-LD**.
- [ ] Datos reales: dirección, **coordenadas exactas** del local, teléfono, WhatsApp, horario, cierres,
      precios y tatuadores. El **JSON-LD** (`TattooParlor`) se genera con ellos.
- [ ] `valoracion`: la nota y el número reales de Google con el enlace a la ficha, o `nota: null` para ocultarla.
      No va nunca al JSON-LD (Google no admite estrellas propias en negocios locales).
- [ ] `opiniones`: reseñas reales copiadas con permiso del autor, o una lista vacía para quitar la sección.
- [ ] Fotos del cliente en `src/img/` y `creditos: []`.
- [ ] Revisa que las preguntas frecuentes digan la verdad (aparcamiento, pagos, niños).
- [ ] Textos legales: aviso legal con el titular y el NIF del negocio. No hace falta política de cookies:
      la web no usa cookies ni analítica. Si se añade analítica, hará falta banner.
- [ ] `node build.mjs`, subir `publico/` y probar el WhatsApp desde un móvil real.
- [ ] Si el hosting no es Netlify ni Cloudflare Pages, configura a mano las cabeceras de `publico/_headers` (CSP, caché).

## Lo que falta para salir en Google con un cliente real

1. **Ficha de Google Business Profile.** Es lo que más pesa en «estudio de tatuajes en <ciudad>» y en Maps. La crea
   el dueño (verificación por vídeo o carta). Categoría principal «Estudio de tatuajes», mismo nombre, dirección y
   teléfono que en la web (NAP idéntico), horario, festivos, servicios con precio, fotos reales
   y el enlace a la web y a la reserva.
2. **Reseñas reales en Google.** Pedirlas después de cada cita (un enlace corto o un QR en el mostrador),
   responder a todas y no comprarlas ni filtrarlas. La nota de la web se actualiza a mano con la real.
3. **Dominio propio**, mejor con el nombre del negocio (`.es` o `.com`), con HTTPS.
4. **Google Search Console**: verificar el dominio, enviar `sitemap.xml`, comprobar con la herramienta de
   inspección de URL que la página se indexa y pasar la [prueba de resultados enriquecidos](https://search.google.com/test/rich-results) para el JSON-LD.
5. **Citas locales coherentes**: el mismo nombre, dirección y teléfono en Instagram, Facebook, Apple Maps,
   Bing Places y directorios locales.
6. **Contenido local verdadero**: barrio, referencias cercanas, cómo llegar. Si el negocio lo justifica,
   alguna página extra (por ejemplo, un servicio estrella) mejor que más texto en la home.
7. **Medir sin cookies** si se quiere saber cuántas reservas llegan: contar los WhatsApp recibidos o usar
   una analítica sin cookies (Plausible, GoatCounter). Search Console ya da búsquedas y clics.
