// Assemble src/ into a single self-contained dist/index.html (styles, scripts and favicon inlined),
// so the game can be hosted anywhere or simply opened from disk.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const src = (f) => new URL(`../src/${f}`, import.meta.url);
const read = (f) => readFile(src(f), 'utf8');

let html = await read('index.html');

const inline = async (pattern, wrap) => {
  for (const [tag, file] of [...html.matchAll(pattern)]) {
    const body = (await read(file)).replace(/^if\(typeof module!=='undefined'\).*$/m, '').trimEnd();
    html = html.replace(tag, () => wrap(body));
  }
};

await inline(/<link rel="stylesheet" href="([\w.-]+\.css)">/g, (css) => `<style>\n${css}\n</style>`);
await inline(/<script src="([\w.-]+\.js)"><\/script>/g, (js) => `<script>\n${js}\n</script>`);

const icon = Buffer.from(await read('favicon.svg')).toString('base64');
html = html.replace('href="favicon.svg"', `href="data:image/svg+xml;base64,${icon}"`);

await mkdir(new URL('../dist/', import.meta.url), { recursive: true });
await writeFile(new URL('../dist/index.html', import.meta.url), html);
console.log(`dist/index.html  ${(html.length / 1024).toFixed(1)} KB`);
