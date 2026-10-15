// Servidor local para probar publico/ (no hace falta en producción). Uso: node servir.mjs [puerto]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'publico');
const PUERTO = Number(process.argv[2]) || 4321;
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };

http.createServer((req, res) => {
  const ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const archivo = path.join(DIR, ruta.endsWith('/') ? ruta + 'index.html' : ruta);
  if (!archivo.startsWith(DIR)) { res.writeHead(403).end(); return; }
  fs.readFile(archivo, (err, buf) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('No encontrado'); return; }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(archivo)] || 'application/octet-stream', 'Cache-Control': 'no-cache' }).end(buf);
  });
}).listen(PUERTO, '127.0.0.1', () => console.log(`Sirviendo publico/ en http://localhost:${PUERTO}`));
