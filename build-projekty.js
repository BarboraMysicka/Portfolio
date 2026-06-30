/* =========================================================================
   GENERÁTOR KARET PROJEKTŮ
   =========================================================================
   Přečte data/projects.js a vygeneruje hotové HTML karty přímo do
   index.html (mezi značky PROJEKTY:START / PROJEKTY:END).

   Karty se zapisují natvrdo do HTML schválně – aby je viděly vyhledávače,
   náhled odkazu na LinkedInu i prohlížeč bez JavaScriptu.

   Spuštění (ve složce portfolio):
       node build-projekty.js

   Výchozí seskupení v HTML je „Podle studia" (1. a 2. semestr).
   Přepínač na „Podle oblastí" pak v prohlížeči řeší js/main.js – jen
   přeskupí už existující karty, nenačítá data znovu.
   ========================================================================= */

const fs = require("fs");
const path = require("path");

const projekty = require("./data/projects.js");
const indexPath = path.join(__dirname, "index.html");

/* Ošetření textu do HTML (& < >) a do atributů (") */
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escAttr(s) {
  return esc(s).replace(/"/g, "&quot;");
}

/* Odkaz: interní .html stránky otevři ve stejné kartě,
   externí weby a soubory (PDF, obrázky) v nové. */
function odkazHtml(odkaz) {
  if (!odkaz) return "";
  const externi = /^https?:/i.test(odkaz) || !/\.html$/i.test(odkaz);
  const attrs = externi ? ' target="_blank" rel="noopener"' : "";
  return `      <a class="card__link" href="${escAttr(odkaz)}"${attrs}>Více →</a>\n`;
}

/* Pořadí v datech si uložíme, ať ho JS umí zachovat i po přeskupení. */
projekty.forEach((p, i) => { p._poradi = i; });

/* Jedna karta */
function karta(p) {
  const pos = p.obrazekPos ? ` style="object-position: ${escAttr(p.obrazekPos)};"` : "";
  const stitky = (p.stitky || [])
    .map((t) => `<li class="tag">${esc(t)}</li>`)
    .join("");
  return (
    `    <article class="card" data-id="${escAttr(p.id)}" data-poradi="${p._poradi}" data-semestr="${escAttr(p.semestr)}" data-oblast="${escAttr(p.oblast)}">\n` +
    `      <div class="card__media">\n` +
    `        <img src="${escAttr(p.obrazek)}" alt="${escAttr(p.nazev)}" loading="lazy"${pos} />\n` +
    `      </div>\n` +
    `      <h3 class="card__title">${esc(p.nazev)}</h3>\n` +
    `      <p class="card__meta"><span class="card__sem">${escAttr(p.semestr)}. semestr</span></p>\n` +
    (stitky ? `      <ul class="card__tags">${stitky}</ul>\n` : "") +
    `      <p class="card__desc">${esc(p.popis)}</p>\n` +
    odkazHtml(p.odkaz) +
    `    </article>`
  );
}

/* Jedno pásmo (nadpis + mřížka karet) */
function pasmo(label, polozky) {
  if (!polozky.length) return "";
  const karty = polozky.map(karta).join("\n");
  return (
    `  <div class="year-block">\n` +
    `    <h3 class="year-title">${esc(label)}</h3>\n` +
    `    <div class="cards">\n${karty}\n    </div>\n` +
    `  </div>`
  );
}

/* Výchozí seskupení do HTML = podle studia (semestr 1, semestr 2) */
const blokyHtml = [
  pasmo("1. semestr", projekty.filter((p) => Number(p.semestr) === 1)),
  pasmo("2. semestr", projekty.filter((p) => Number(p.semestr) === 2)),
]
  .filter(Boolean)
  .join("\n");

const START = "<!-- PROJEKTY:START -->";
const END = "<!-- PROJEKTY:END -->";

let html = fs.readFileSync(indexPath, "utf8");
const re = new RegExp(`${START}[\\s\\S]*?${END}`);
if (!re.test(html)) {
  console.error("CHYBA: v index.html nejsou značky " + START + " / " + END);
  process.exit(1);
}
const novy =
  `${START}\n` +
  `    <!-- Pozor: tento blok generuje build-projekty.js z data/projects.js. Needituj ručně. -->\n` +
  `${blokyHtml}\n    ` +
  `${END}`;

html = html.replace(re, novy);
fs.writeFileSync(indexPath, html, "utf8");
console.log(`Hotovo: ${projekty.length} projektů zapsáno do index.html.`);
