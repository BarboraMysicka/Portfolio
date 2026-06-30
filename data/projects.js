/* =========================================================================
   DATA PROJEKTŮ  (jediné místo, kam píšeš obsah projektů)
   =========================================================================
   Každý projekt je jeden objekt { ... } v poli níže.

   Jak přidat / upravit projekt:
   1) Zkopíruj jeden celý blok od "{" po "}," a uprav hodnoty.
   2) Ulož soubor.
   3) Přegeneruj karty do index.html příkazem:  node build-projekty.js
      (tím se obsah propíše do statického HTML – kvůli vyhledávačům,
       náhledu na LinkedInu a tomu, aby projekty fungovaly i bez JavaScriptu).

   Význam polí:
   - id         ... krátký jedinečný identifikátor (jen malá písmena a pomlčky)
   - nazev      ... název projektu
   - popis      ... 1–3 věty
   - obrazek    ... cesta k náhledovému obrázku (složka images/)
   - obrazekPos ... NEPOVINNÉ. Výřez obrázku, např. "top" (ukáže horní část)
   - odkaz      ... NEPOVINNÉ. Odkaz na detail/web/PDF. Když není, nech ""
   - semestr    ... 1 nebo 2
   - oblast     ... jedna z: "vyzkum" | "data" | "casestudy" | "psani" | "kurzy"
   - stitky     ... pole dovedností, např. ["service design", "výzkum"]

   Pořadí v poli = pořadí v rámci pásem (nejsilnější/„pracovní" dej první).
   ========================================================================= */

const projekty = [
  {
    id: "mapa-bezpeci",
    nazev: "Mapa bezpečí ve veřejné službě",
    popis: "Týmový kvalitativní výzkum (5 studentek, 15 hloubkových rozhovorů) o bezpečném rozhodování o dětech v síti OSPOD. Spoluvedla jsem rozhovory, tagovala v Condensu a podílela se na syntéze. Výstupem je mapa bezpečí, čtyři vrstvy bezpečí, integrační matice a designová výzva.",
    obrazek: "images/mapa-bezpeci.jpg",
    odkaz: "vyzkumna-zprava-ospod.html",
    semestr: 2,
    oblast: "vyzkum",
    stitky: ["kvalitativní výzkum", "service design", "týmová práce"],
  },
  {
    id: "ospod-hackathon",
    nazev: "OSPOD: psychologické bezpečí a práce s chybami",
    popis: "Dvoudenní hackathon (Praxe I) o tom, jak udělat rozhodování v krizích jistější, transparentnější a v nejlepším zájmu dítěte. V sedmičlenném týmu jsme navrhli proces systémové změny.",
    obrazek: "images/ospod-foto.jpg",
    odkaz: "soubory/praxe.pdf",
    semestr: 1,
    oblast: "vyzkum",
    stitky: ["facilitace", "systémový design", "týmová práce"],
  },
  {
    id: "cesko-hleda-marne",
    nazev: "Česko hledá. Marně.",
    popis: "Datová infografika o tom, proč v Česku zůstávají statisíce volných míst neobsazené navzdory rekordně nízké nezaměstnanosti. Mapuje strukturální nesoulad nabídky a poptávky a pět nejhůř obsaditelných profesí.",
    obrazek: "images/infografika-cover.jpg",
    obrazekPos: "top",
    odkaz: "reflexe-infografika.html",
    semestr: 2,
    oblast: "data",
    stitky: ["data", "datová vizualizace", "infografika"],
  },
  {
    id: "datovy-denik",
    nazev: "Datový deník",
    popis: "Semestrální deník reflektovaných zápisků o grafech a vizualizacích, na které jsem narazila, od příspěvku na X přes interaktivní storytelling The Pudding až po slide z konference.",
    obrazek: "images/datovy-denik-foto.jpg",
    odkaz: "https://barbora-design-journey.lovable.app/datovy-denik",
    semestr: 2,
    oblast: "data",
    stitky: ["data", "vizuální gramotnost", "reflexe"],
  },
  {
    id: "comeback-bez-mapy",
    nazev: "Comeback bez mapy",
    popis: "Návrat z rodičovské do remote firmy, kde se mezitím všechno tiše posunulo. Z autoreflexe a tří rozhovorů jsem navrhla řešení „buddy“. Výstupem je e-poster s emoční křivkou prvních 8 týdnů a konceptem k otestování.",
    obrazek: "images/comeback-cover.jpg",
    obrazekPos: "top",
    odkaz: "images/comeback-poster.jpg",
    semestr: 2,
    oblast: "casestudy",
    stitky: ["inkluzivní design", "service design", "vizualizace"],
  },
  {
    id: "obnazena",
    nazev: "obnaŽENA: jak navrhnout zážitek, který otevírá tabu",
    popis: "Případová studie multižánrového divadelního zážitku, který přes vzdušnou akrobacii, tanec a hudbu normalizuje téma menstruačního cyklu. Zkoumám designový proces i jeho společenský dopad.",
    obrazek: "images/case-study-medium.jpg",
    odkaz: "https://medium.com/design-kisk/jak-navrhnout-z%C3%A1%C5%BEitek-kter%C3%BD-otev%C3%ADr%C3%A1-tabu-case-study-obna%C5%BEeny-e3a4ea513f84",
    semestr: 1,
    oblast: "casestudy",
    stitky: ["service design", "case study", "destigmatizace"],
  },
  {
    id: "vibecoding",
    nazev: "Vibecoding: od terminálu k vlastnímu webu",
    popis: "Reflexe Studijního semináře II, kde jsem se učila vibecoding v Claude Code. Praktickým projektem se stalo přímo tohle portfolio, od první nejistoty v terminálu po samostatnou práci a přesah do praxe.",
    obrazek: "images/seminar-cover.svg",
    odkaz: "reflexe-studijni-seminar.html",
    semestr: 2,
    oblast: "psani",
    stitky: ["vibecoding", "reflexe", "web"],
  },
  {
    id: "prvni-rok",
    nazev: "První rok studia: když do sebe věci začnou zapadat",
    popis: "Ohlédnutí za prvním rokem Designu informačních služeb, jak do sebe začaly zapadat sociologie, byznys a design, co přinesla virtuální realita i hackathon a proč začínám být blíž k vlastnímu směru.",
    obrazek: "images/reflexe-foto.jpg",
    odkaz: "reflexe-prvni-rok.html",
    semestr: 2,
    oblast: "psani",
    stitky: ["reflexe", "studijní cesta"],
  },
  {
    id: "figma-ai-rozhovor",
    nazev: "Figma jako základ, AI jako akcelerátor",
    popis: "Rozhovor s Jakubem Karlecem (2FRESH) o tom, jak se za 25 let proměnil digitální design, s jakými výzvami se potýkají junioři a jak práci mění AI. Publikováno na Mediu.",
    obrazek: "images/rozhovor-medium.jpg",
    odkaz: "https://medium.com/design-kisk/figma-jako-z%C3%A1klad-ai-jako-akceler%C3%A1tor-jak-usp%C4%9Bt-v-ux-a-produktov%C3%A9m-designu-jako-junior-7871fff44180",
    semestr: 1,
    oblast: "psani",
    stitky: ["rozhovor", "výzkumný rozhovor", "psaní"],
  },
  {
    id: "elements-of-ai",
    nazev: "Elements of AI",
    popis: "Mezinárodní online kurz (University of Helsinki & MinnaLearn). Úvod do umělé inteligence: co AI je a není, jak funguje strojové učení a jaké má reálné i etické dopady. Zakončeno certifikátem.",
    obrazek: "images/elements-ai.svg",
    odkaz: "images/certifikat-elements-of-ai.jpg",
    semestr: 1,
    oblast: "kurzy",
    stitky: ["AI", "online kurz", "certifikát"],
  },
  {
    id: "vrchat-setkani",
    nazev: "Když se z technologie stane setkání",
    popis: "V předmětu Virtuální realita jsme se spolužačkou připravily a odtutorovaly vlastní lekci ve VRChatu. Reflexe o tom, jak moc je VR o lidech, i o soukromí a hranicích ve virtuálních prostorech.",
    obrazek: "images/vrchat.jpg",
    odkaz: "",
    semestr: 2,
    oblast: "kurzy",
    stitky: ["virtuální realita", "facilitace", "experiment"],
  },
];

/* Pro generátor (node build-projekty.js). V prohlížeči se tento soubor
   už nenačítá – karty jsou natvrdo v index.html. */
if (typeof module !== "undefined" && module.exports) {
  module.exports = projekty;
}
