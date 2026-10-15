# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Confirmado por el usuario (plan aprobado 2026-10-14): HTML/CSS/JS estático sin librerías, generado por un script Node sin dependencias (`build.mjs`) a partir de un único archivo de configuración (`negocio.config.mjs`). Sin backend.

## Users

- **Quien lo enseña:** el autor (desarrollador freelance) lo muestra a dueños de estudios de tatuaje como cliente potencial; tiene que poder cambiarlo a los datos reales de un cliente en minutos.
- **Visitante final:** vecino de la ciudad que busca «estudio de tatuajes en <ciudad>» desde el móvil, compara precios y quiere pedir cita sin llamar.

## Product Purpose

Web de una página para un estudio de tatuajes: enseñar servicios y precios, transmitir oficio y pedir cita por WhatsApp con el mensaje ya escrito. Éxito = el dueño de el estudio la ve como «su web» y el visitante pide cita en menos de un minuto.

## Positioning

Reserva sin app ni comisión: el mensaje llega al WhatsApp del negocio con servicio, tatuador, día y hora, y la cita queda pendiente de confirmación del negocio.

## Operating Context

Visitante en el móvil, a menudo con datos móviles; dueño de el estudio mirándola en el móvil o en un portátil durante una visita comercial.

## Capabilities and Constraints

- Una sola página, móvil primero, carga rápida (objetivo Lighthouse alto), sin analítica ni cookies.
- Formulario: nombre, teléfono, servicio, tatuador, fecha y hora; bloquea días de cierre; genera enlace `wa.me`.
- Todos los datos del negocio en un solo archivo.
- SEO local técnico: un H1 con «estudio de tatuajes en <ciudad>», JSON-LD TattooParlor leído de la configuración, sin aggregateRating.
- Mientras es demo: `noindex, nofollow` y `Disallow: /`.

## Brand Commitments

Pedido explícitamente: oscura y sobria con acento cálido (carbón, crema, rojo coral); una tipografía de titulares con carácter y otra limpia para texto; animaciones sutiles; nada de degradados morado-azul, Inter en todo ni tarjetas dentro de tarjetas. Estructura inspirada en pujolsbarbershop.com sin copiar textos, imágenes, logo ni marca.

## Evidence on Hand

- Ninguna real: negocio ficticio («Casa Ferro», datos de ejemplo), opiniones y valoración de ejemplo, marcadas como tales en la página.
- Fotos libres de Unsplash (licencia Unsplash) en `src/img/`, acreditadas en el pie; se sustituyen por las del cliente.
- Prohibido inventar reseñas «reales», premios o cifras presentadas como verdaderas.

## Product Principles

- Los datos del negocio viven en un solo sitio; cambiar de cliente es editar un archivo y ejecutar un comando.
- Pedir cita es la acción principal y está a un toque en todo momento.
- Todo lo ficticio se ve como ficticio.
- Rápida y sin terceros: nada que obligue a un banner de cookies.

## Accessibility & Inclusion

WCAG 2.2 AA: contraste, foco visible, formulario usable con teclado y lector de pantalla, `prefers-reduced-motion` respetado.
