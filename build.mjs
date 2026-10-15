// Construye la web en publico/ a partir de negocio.config.mjs. Sin dependencias.
// Uso: node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { render, DIAS } from './src/pagina.mjs';

const RAIZ = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(RAIZ, 'src');
const OUT = path.join(RAIZ, 'publico');
const c = (await import(pathToFileURL(path.join(RAIZ, 'negocio.config.mjs')).href + '?t=' + Date.now())).default;

// Comprobaciones para no publicar algo roto o a medio cambiar.
const avisos = [];
const fallos = [];
const fotos = [c.fotos.hero, c.fotos.contacto, ...c.fotos.galeria, ...c.artistas.map((b) => ({ nombre: b.foto, anchos: [400, 800] }))];
for (const f of fotos) for (const w of f.anchos) if (!fs.existsSync(path.join(SRC, 'img', `${f.nombre}-${w}.webp`))) fallos.push(`Falta la foto src/img/${f.nombre}-${w}.webp`);
if (!fs.existsSync(path.join(SRC, 'img', c.fotos.og))) fallos.push(`Falta la imagen para redes src/img/${c.fotos.og}`);
for (const d of DIAS) if (!Array.isArray(c.horario[d])) fallos.push(`horario.${d} debe ser una lista ([] si se cierra)`);
for (const f of c.cierres ?? []) if (!/^\d{4}-\d{2}-\d{2}$/.test(f)) fallos.push(`Fecha de cierre con formato raro: «${f}» (usa AAAA-MM-DD)`);
if (/\.example$|^https?:\/\/localhost/.test(c.dominio)) (c.demo ? avisos : fallos).push(`El dominio sigue siendo de ejemplo: ${c.dominio}`);
if (!c.demo) {
  if (c.creditos?.length) avisos.push('Siguen los créditos de Unsplash: ¿sigues usando fotos de ejemplo?');
  if (/Ejemplo/i.test(c.direccion.calle)) fallos.push('La dirección sigue siendo de ejemplo.');
  if (/600 000 000/.test(c.telefono + c.whatsapp)) fallos.push('El teléfono o el WhatsApp siguen siendo de ejemplo.');
}
if (fallos.length) { console.error('No se ha construido:\n- ' + fallos.join('\n- ')); process.exit(1); }

// CSS en línea (minificado a lo básico) y JS aparte con caché por versión.
const css = fs.readFileSync(path.join(SRC, 'estilos.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,>])\s*/g, '$1').replace(/;}/g, '}').trim();
const js = fs.readFileSync(path.join(SRC, 'app.js'), 'utf8');
const version = Date.now().toString(36);

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'index.html'), render(c, { css, version }));
fs.writeFileSync(path.join(OUT, 'app.js'), js);
fs.copyFileSync(path.join(SRC, 'favicon.svg'), path.join(OUT, 'favicon.svg'));
fs.cpSync(path.join(SRC, 'img'), path.join(OUT, 'img'), { recursive: true, filter: (p) => !p.endsWith('.json') }); // los .json son la procedencia de cada foto (solo desarrollo)
fs.cpSync(path.join(SRC, 'fonts'), path.join(OUT, 'fonts'), { recursive: true });

const hoy = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(OUT, 'robots.txt'), c.demo
  ? '# Web de demostración: no indexar.\nUser-agent: *\nDisallow: /\n'
  : `User-agent: *\nAllow: /\n\nSitemap: ${c.dominio}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${c.dominio}/</loc><lastmod>${hoy}</lastmod></url>
</urlset>
`);
// Cabeceras de seguridad y caché para Netlify / Cloudflare Pages (otros hostings: configúralas igual).
fs.writeFileSync(path.join(OUT, '_headers'), `/*
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; form-action 'none'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
${c.demo ? '  X-Robots-Tag: noindex, nofollow\n' : ''}/img/*
  Cache-Control: public, max-age=31536000, immutable
/fonts/*
  Cache-Control: public, max-age=31536000, immutable
`);

const peso = (p) => fs.statSync(path.join(OUT, p)).size;
console.log(`Construido en publico/ (${c.demo ? 'MODO DEMO: noindex' : 'PRODUCCIÓN'})`);
console.log(`  index.html ${(peso('index.html') / 1024).toFixed(1)} KB · app.js ${(peso('app.js') / 1024).toFixed(1)} KB · CSS en línea ${(css.length / 1024).toFixed(1)} KB`);
for (const a of avisos) console.log('  Aviso: ' + a);
