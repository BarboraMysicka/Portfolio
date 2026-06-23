/* =========================================================================
   LOGIKA STRÁNKY
   =========================================================================
   Tento soubor dělá dvě věci:
   1) Vygeneruje karty projektů ze souboru data/projects.js a rozdělí je
      do tematických SKUPIN podle pole "type".
   2) Zajistí jemné animace při scrollování.

   Běžně tady nemusíš nic měnit. Projekty se přidávají v data/projects.js,
   kde každý projekt má pole type ("koncepty" / "data" / "psani" / "kurzy").
   ========================================================================= */

/* SKUPINY projektů – pořadí v poli = pořadí na stránce.
   - key   ... shoduje se s polem "type" u projektu v data/projects.js
   - label ... nadpis skupiny zobrazený na stránce
   Chceš novou skupinu? Přidej sem řádek a projektům dej odpovídající type.
   Chceš jiný název/pořadí? Uprav label nebo pořadí řádků. */
const SKUPINY = [
  { key: "koncepty", label: "Případové studie & koncepty" },
  { key: "data",     label: "Data & výzkum" },
  { key: "psani",    label: "Psaní & reflexe" },
  { key: "kurzy",    label: "Kurzy & experimenty" },
];

/* -------------------------------------------------------------------------
   Vytvoření jedné karty projektu (vrací HTML element)
   ------------------------------------------------------------------------- */
function vytvorKartu(projekt) {
  const card = document.createElement("article");
  card.className = "card reveal";

  // Odkaz "Více" se zobrazí jen tehdy, když projekt nějaký odkaz má
  const odkazHtml = projekt.link
    ? `<a class="card__link" href="${projekt.link}" target="_blank" rel="noopener">Více →</a>`
    : "";

  // Volitelné: imagePos umožní zarovnat výřez obrázku (např. "top" u posteru)
  const posStyle = projekt.imagePos ? ` style="object-position: ${projekt.imagePos};"` : "";

  card.innerHTML = `
    <div class="card__media">
      <img src="${projekt.image}" alt="${projekt.title}" loading="lazy"${posStyle} />
    </div>
    <h4 class="card__title">${projekt.title}</h4>
    <p class="card__meta">
      <span class="card__year">${projekt.year}. ročník</span>
      &nbsp; ${projekt.category}
    </p>
    <p class="card__desc">${projekt.description}</p>
    ${odkazHtml}
  `;
  return card;
}

/* -------------------------------------------------------------------------
   Vykreslení všech projektů rozdělených do tematických skupin (podle type)
   ------------------------------------------------------------------------- */
function vykresliProjekty() {
  const root = document.getElementById("projects-root");
  if (!root) return;

  SKUPINY.forEach((skupina) => {
    // Vyber jen projekty dané skupiny
    const projektySkupiny = projects.filter((p) => p.type === skupina.key);

    // Pokud ve skupině zatím žádný projekt není, blok přeskočíme
    if (projektySkupiny.length === 0) return;

    // Blok skupiny s nadpisem
    const block = document.createElement("div");
    block.className = "year-block";
    block.innerHTML = `<h3 class="year-title reveal">${skupina.label}</h3>`;

    // Mřížka karet
    const cards = document.createElement("div");
    cards.className = "cards";
    projektySkupiny.forEach((p) => cards.appendChild(vytvorKartu(p)));

    block.appendChild(cards);
    root.appendChild(block);
  });
}

/* -------------------------------------------------------------------------
   Animace při scrollování – prvkům s třídou .reveal přidá .is-visible,
   jakmile se objeví na obrazovce.
   ------------------------------------------------------------------------- */
function spustAnimace() {
  const prvky = document.querySelectorAll(".reveal");

  // Postupné nabíhání (stagger): prvky se stejným rodičem se objeví v sledu.
  const poradi = new Map();
  prvky.forEach((el) => {
    const rodic = el.parentElement;
    const idx = poradi.get(rodic) || 0;
    el.style.transitionDelay = Math.min(idx, 5) * 0.08 + "s";
    poradi.set(rodic, idx + 1);
  });

  // Pokud prohlížeč neumí IntersectionObserver, prostě vše zobrazíme.
  if (!("IntersectionObserver" in window)) {
    prvky.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (zaznamy) => {
      zaznamy.forEach((zaznam) => {
        if (zaznam.isIntersecting) {
          zaznam.target.classList.add("is-visible");
          observer.unobserve(zaznam.target); // animuj jen jednou
        }
      });
    },
    { threshold: 0.12 }
  );

  prvky.forEach((el) => observer.observe(el));
}

/* -------------------------------------------------------------------------
   Parallax – hero fotka se při scrollu posouvá pomaleji (jen na desktopu)
   ------------------------------------------------------------------------- */
function spustParallax() {
  const img = document.querySelector(".hero__image img");
  if (!img) return;
  if (window.matchMedia("(max-width: 860px)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let ticking = false;
  function update() {
    const offset = Math.min(window.scrollY * 0.08, 90); // fotka je 118 % vysoká → max ~90px
    img.style.transform = "translateY(" + offset + "px)";
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

/* -------------------------------------------------------------------------
   Magnetická tlačítka – lehce se přitahují ke kurzoru (jen myš)
   ------------------------------------------------------------------------- */
function spustMagnet() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover)").matches) return;
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      btn.style.transition = "transform 0.1s ease";
      btn.style.transform = "translate(" + dx * 0.25 + "px," + dy * 0.4 + "px)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transition = "transform 0.25s ease";
      btn.style.transform = "";
    });
  });
}

/* -------------------------------------------------------------------------
   Světlý / tmavý režim – přepínač, paměť (localStorage), výchozí dle systému
   ------------------------------------------------------------------------- */
function spustTema() {
  const root = document.documentElement;
  const tlacitko = document.querySelector(".theme-toggle");
  const ulozene = localStorage.getItem("tema");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  function uplatni(t) {
    root.setAttribute("data-theme", t);
    if (tlacitko) tlacitko.textContent = (t === "dark") ? "☀️" : "🌙";
  }
  uplatni(ulozene || (systemDark ? "dark" : "light"));
  if (tlacitko) {
    tlacitko.addEventListener("click", () => {
      const nove = (root.getAttribute("data-theme") === "dark") ? "light" : "dark";
      localStorage.setItem("tema", nove);
      uplatni(nove);
    });
  }
}

/* -------------------------------------------------------------------------
   Start – až se načte stránka, vykreslíme projekty a zapneme efekty.
   (Projekty generujeme PŘED zapnutím animací, aby i nové karty animovaly.)
   ------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  spustTema();
  vykresliProjekty();
  spustAnimace();
  spustParallax();
  spustMagnet();
});
