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

/* Pásma pro pohled „Podle oblastí" – pořadí = pořadí na stránce. */
const OBLASTI = [
  { key: "vyzkum",    label: "Výzkum" },
  { key: "data",      label: "Data" },
  { key: "casestudy", label: "Case studies" },
  { key: "psani",     label: "Psaní a publikované texty" },
  { key: "kurzy",     label: "Kurzy & experimenty" },
];

/* -------------------------------------------------------------------------
   Projekty – dva pohledy + přepínač.
   Karty jsou už v HTML (statické). JS si je jednou posbírá a při přepnutí
   pohledu je jen PŘESKUPÍ (přesune stejné prvky), data se nenačítají znovu.
   ------------------------------------------------------------------------- */
function spustProjekty() {
  const root = document.getElementById("projects-root");
  if (!root) return;

  // Posbírej existující karty ze statického HTML (jednou). Pořadí zachová
  // pořadí v dokumentu = pořadí v data/projects.js.
  const karty = Array.from(root.querySelectorAll(".card"));
  if (!karty.length) return;

  // Seřaď podle pořadí v datech (data-poradi), ať je pořadí v pásmech stejné
  // v obou pohledech – nezávisle na tom, jak jsou karty seskupené v HTML.
  karty.sort((a, b) => Number(a.dataset.poradi) - Number(b.dataset.poradi));

  // Odkryj přepínač (bez JS zůstává schovaný).
  const toggle = document.querySelector(".view-toggle");
  if (toggle) toggle.hidden = false;

  // Vykreslí daný režim: "studio" (podle semestru) nebo "oblast".
  function vykresli(rezim) {
    let pasma;
    if (rezim === "oblast") {
      pasma = OBLASTI.map((o) => ({
        label: o.label,
        vyber: (k) => k.dataset.oblast === o.key,
      }));
    } else {
      pasma = [
        { label: "1. semestr", vyber: (k) => k.dataset.semestr === "1" },
        { label: "2. semestr", vyber: (k) => k.dataset.semestr === "2" },
      ];
    }

    root.innerHTML = "";
    pasma.forEach((p) => {
      const vybrane = karty.filter(p.vyber);
      if (!vybrane.length) return;

      const block = document.createElement("div");
      block.className = "year-block";

      const nadpis = document.createElement("h3");
      nadpis.className = "year-title";
      nadpis.textContent = p.label;
      block.appendChild(nadpis);

      const grid = document.createElement("div");
      grid.className = "cards";
      vybrane.forEach((k) => grid.appendChild(k)); // přesun stejného prvku
      block.appendChild(grid);

      root.appendChild(block);
    });
  }

  // Přepínač: zvýrazni aktivní tlačítko a překresli.
  const btns = toggle ? Array.from(toggle.querySelectorAll(".view-toggle__btn")) : [];
  btns.forEach((b) => {
    b.addEventListener("click", () => {
      btns.forEach((x) => {
        const aktivni = x === b;
        x.classList.toggle("is-active", aktivni);
        x.setAttribute("aria-pressed", aktivni ? "true" : "false");
      });
      vykresli(b.dataset.rezim);
    });
  });

  vykresli("studio"); // výchozí pohled
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
  spustProjekty();
  spustAnimace();
  spustParallax();
  spustMagnet();
});
