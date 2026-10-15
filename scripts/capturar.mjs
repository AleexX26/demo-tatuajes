// Capturas de página completa con Edge headless por CDP (espera a que carguen todas las fotos).
// Uso (con node servir.mjs en marcha): node scripts/capturar.mjs http://localhost:4321/ 1440 .impeccable/review desktop 1050
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const [url, ancho, dir, prefijo, tramoArg] = process.argv.slice(2);
const W = Number(ancho), TRAMO = Number(tramoArg || 0), MOVIL = W < 768;
const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'edgecap-'));
const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-prefers-reduced-motion', '--remote-debugging-port=9335', '--remote-allow-origins=*', '--no-first-run', '--no-default-browser-check', `--user-data-dir=${perfil}`, 'about:blank'], { stdio: 'ignore' });
setTimeout(() => { console.error('Tiempo agotado'); edge.kill(); process.exit(2); }, 150000);
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
let ws;
await espera(2500); { const p = await (await fetch('http://127.0.0.1:9335/json/new?about:blank', { method: 'PUT' })).json(); ws = new WebSocket(p.webSocketDebuggerUrl); }
await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const pend = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id); } });
const cdp = (method, params = {}) => new Promise((r) => {  const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evalua = async (expr) => (await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result.value;

const H = MOVIL ? 844 : 900;
await cdp('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: MOVIL });
await cdp('Page.enable'); 
await cdp('Page.navigate', { url });
await espera(1500);
// Recorre la página para disparar la carga diferida y espera a que todas las imágenes estén pintadas.
const info = await evalua(`(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 150)); }
  const t0 = Date.now(); while ([...document.images].some(i => !(i.complete && i.naturalWidth)) && Date.now() - t0 < 15000) await new Promise(r => setTimeout(r, 200));
  await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); scrollTo(0, 0); await document.fonts.ready;
  return { alto: document.documentElement.scrollHeight, ancho: document.documentElement.scrollWidth, fallan: [...document.images].filter(i => !(i.complete && i.naturalWidth)).map(i => i.src) }; })()`);
await espera(500);
const guardar = async (nombre, clip) => { const r = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { ...clip, scale: 1 } }); fs.writeFileSync(path.join(dir, nombre), Buffer.from(r.data, 'base64')); };
// Primera pantalla real (con la barra fija del móvil en su sitio).
await guardar(`${prefijo}-primera-pantalla.png`, { x: 0, y: 0, width: W, height: H });
// Página completa: la barra fija se oculta para que no tape el final.
await evalua(`document.querySelector('.barra-movil') && (document.querySelector('.barra-movil').style.display='none'); 1`);
await cdp('Emulation.setDeviceMetricsOverride', { width: W, height: info.alto, deviceScaleFactor: 1, mobile: MOVIL });
await espera(600);
const alto = await evalua('document.documentElement.scrollHeight');
await guardar(`${prefijo}.png`, { x: 0, y: 0, width: W, height: alto });
if (TRAMO) for (let y = 0, n = 1; y < alto; y += TRAMO, n++) await guardar(`tramos/${prefijo}-${n}.png`, { x: 0, y, width: W, height: Math.min(TRAMO, alto - y) });
console.log(JSON.stringify({ ...info, altoFinal: alto }));
ws.close(); edge.kill(); process.exit(0);
