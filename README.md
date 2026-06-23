# Osobní portfolio – Barbora Myšičková

Jednoduchá statická webová stránka (HTML + CSS + trocha JavaScriptu).
Žádné instalace, žádný build – stačí prohlížeč.

---

## Jak stránku otevřít

Dvojklikni na soubor **`index.html`**. Otevře se v prohlížeči. To je celé.

> Po každé úpravě souboru dej v prohlížeči **tvrdé obnovení** (⌘⇧R / Ctrl+Shift+R),
> aby se načetla nová verze (ne stará z paměti).

---

## Struktura složek

```
portfolio/
├── index.html          ← viditelné texty (hero, „To jsem já", kontakt)
├── css/style.css       ← vzhled (barvy, velikosti, rozložení)
├── js/main.js          ← logika (generování karet, skupiny, animace)
├── data/projects.js    ← SEM přidáváš projekty
├── images/             ← SEM dávej obrázky
├── soubory/            ← PDF a další přílohy projektů
└── README.md           ← tento návod
```

---

## Kam dávat obrázky

Vlastní obrázky ukládej do složky **`images/`** a v projektu se na ně odkážeš
cestou `images/nazev-souboru.jpg`. Ideálně **JPG** a ne moc velké (do ~500 kB).

---

## Jak přidat nový projekt

Otevři **`data/projects.js`**, zkopíruj jeden existující blok od `{` po `},`
a uprav hodnoty:

```js
{
  type: "data",                     // DO KTERÉ SKUPINY projekt patří (viz níže)
  year: 1,                          // ročník (zobrazí se jako štítek na kartě)
  title: "Název projektu",
  category: "Předmět · typ práce",
  description: "Krátký popis projektu.",
  image: "images/muj-obrazek.jpg",  // nebo "soubory/…": cesta k náhledu
  imagePos: "top",                  // NEPOVINNÉ – výřez obrázku (např. horní část)
  link: "https://…"                 // NEPOVINNÉ – odkaz na detail/PDF/web
},
```

Ulož a obnov stránku. Projekt se sám zařadí do skupiny podle pole **`type`**.

### Skupiny projektů (pole `type`)

Projekty se na stránce dělí do tematických skupin podle `type`:

| `type`      | Skupina na stránce            |
|-------------|-------------------------------|
| `koncepty`  | Případové studie & koncepty   |
| `data`      | Data & výzkum                 |
| `psani`     | Psaní & reflexe               |
| `kurzy`     | Kurzy & experimenty           |

Názvy a pořadí skupin (a přidání nové) se nastavují v **`js/main.js`** v poli
`SKUPINY` na začátku souboru.

---

## Jak změnit barvy nebo velikosti

V **`css/style.css`** úplně nahoře je sekce `:root`:

```css
--bg: #ffffff;      /* pozadí (krémová varianta: #faf8f3) */
--text: #161616;    /* barva textu */
--accent: #eaff00;  /* žlutý akcent (korálová varianta: #ec4639) */

--h1-size: clamp(2.2rem, 5.5vw, 4.5rem);  /* velikost hlavního nadpisu */
--h2-size: clamp(2rem, 5vw, 4rem);        /* velikost nadpisů sekcí */
```

Změna jedné hodnoty se projeví v celé stránce.

---

## Kde upravit texty

Texty hero sekce, „To jsem já" a kontaktu jsou přímo v **`index.html`**.
Projekty se do HTML nepíšou – ty jsou v **`data/projects.js`**.
```
