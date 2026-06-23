/* =========================================================================
   DATA PROJEKTŮ
   =========================================================================
   Tohle je JEDINÉ místo, kam doplňuješ své projekty.
   Každý projekt je jeden objekt { ... } v poli níže.

   Jak přidat nový projekt:
   1) Zkopíruj jeden celý blok od "{" po "}," (včetně čárky na konci).
   2) Vlož ho do pole a uprav hodnoty.
   3) Ulož soubor a obnov stránku v prohlížeči (F5).

   Význam jednotlivých polí:
   - type        ... DO KTERÉ SKUPINY projekt patří. Možnosti:
                     "koncepty" = Případové studie & koncepty
                     "data"     = Data & výzkum
                     "psani"    = Psaní & reflexe
                     "kurzy"    = Kurzy & experimenty
                     (názvy a pořadí skupin se nastavují v js/main.js – SKUPINY)
   - year        ... ročník studia (zobrazí se jako štítek na kartě)
   - title       ... název projektu (text v uvozovkách)
   - category    ... předmět nebo typ práce (např. "Data pro design služeb")
   - description ... krátký popis projektu
   - image       ... cesta k náhledovému obrázku.
                     Vlastní obrázky dávej do složky "images/" a piš sem
                     např. "images/muj-projekt.jpg"
   - imagePos    ... NEPOVINNÉ. Výřez obrázku, např. "top" (ukáže horní část).
   - link        ... NEPOVINNÉ. Odkaz na detail/PDF/web projektu.
                     Když odkaz nemáš, smaž celý řádek "link" nebo nech "".
   ========================================================================= */

const projects = [
  {
    year: 1,
    type: "koncepty",
    title: "Psychologické bezpečí a práce s chybami v OSPOD",
    category: "Praxe I · Hackathon",
    description: "Dvoudenní hackathon zaměřený na psychologické bezpečí a práci s chybami v OSPOD. V sedmičlenném týmu jsme navrhli proces systémové změny, aby rozhodování v krizích bylo jistější, transparentnější a v nejlepším zájmu dítěte.",
    image: "images/ospod-foto.jpg",
    link: "soubory/praxe.pdf"
  },
  {
    year: 1,
    type: "data",
    title: "Datový deník",
    category: "Data pro design služeb",
    description: "Semestrální deník v rámci předmětu Data pro design služeb. Čtyři reflektované zápisky o grafech a vizualizacích, na které jsem narazila — od příspěvku na X přes vlakovou obrazovku a interaktivní storytelling The Pudding až po slide z konference o longevity.",
    image: "images/datovy-denik-foto.jpg",
    link: "https://barbora-design-journey.lovable.app/datovy-denik"
  },
  {
    year: 1,
    type: "psani",
    title: "Jak navrhnout zážitek, který otevírá tabu",
    category: "Case study obnaŽENY · Medium",
    description: "Případová studie projektu obnaŽENA — multižánrového divadelního zážitku, který skrze vzdušnou akrobacii, tanec, zpěv a hudbu normalizuje téma ženského menstruačního cyklu. Zkoumám designový proces i dlouhodobý společenský dopad tohoto přístupu k destigmatizaci tabu.",
    image: "images/case-study-medium.jpg",
    link: "https://medium.com/design-kisk/jak-navrhnout-z%C3%A1%C5%BEitek-kter%C3%BD-otev%C3%ADr%C3%A1-tabu-case-study-obna%C5%BEeny-e3a4ea513f84"
  },
  {
    year: 1,
    type: "psani",
    title: "Figma jako základ, AI jako akcelerátor",
    category: "Rozhovor s Jakubem Karlecem · Medium",
    description: "Rozhovor s Jakubem Karlecem, spoluzakladatelem designového studia 2FRESH, o tom, jak se za 25 let proměnil obor digitálního designu, s jakými výzvami se dnes potýkají junioři a jak AI mění designérskou práci — vedle nezbytných soft skills jako spolehlivost a komunikace s klientem.",
    image: "images/rozhovor-medium.jpg",
    link: "https://medium.com/design-kisk/figma-jako-z%C3%A1klad-ai-jako-akceler%C3%A1tor-jak-usp%C4%9Bt-v-ux-a-produktov%C3%A9m-designu-jako-junior-7871fff44180"
  },
  {
    year: 1,
    type: "koncepty",
    title: "Comeback bez mapy",
    category: "E-poster · Inkluzivní design",
    description: "V rámci předmětu Inkluzivní design bylo cílem odstranit bariéru ze svého pracoviště nebo okolí. Pro svou práci jsem si vybrala návrat z rodičovské dovolené v remote firmě — situaci, kdy se vztahy, kontext i nepsaná pravidla mezitím tiše posunou. Jako řešení navrhuju „buddy“: jednoho kolegu, který vracejícího se provede prvními 6–8 týdny. Výstupem je e-poster s emoční křivkou prvních 8 týdnů, analýzou bariér a konceptem k otestování.",
    image: "images/comeback-cover.jpg",
    imagePos: "top",   /* karta ukáže horní část posteru (titul), ne střed */
    link: "images/comeback-poster.jpg"
  },
  {
    year: 1,
    type: "data",
    title: "Česko hledá. Marně.",
    category: "Data pro design služeb · Infografika",
    description: "Datová infografika pro předmět Data pro design služeb. Mapuje, proč v Česku zůstávají statisíce volných pracovních míst neobsazené — strukturální nesoulad mezi nabídkou a poptávkou, pět nejhůře obsaditelných profesí a kdo je vlastně bez práce.",
    image: "images/infografika-cover.jpg",
    imagePos: "top",
    link: "soubory/infografika.pdf"
  },
  {
    year: 1,
    type: "kurzy",
    title: "Elements of AI",
    category: "Online kurz · MOOC.fi",
    description: "Mezinárodní online kurz Elements of AI (University of Helsinki & MinnaLearn). Úvod do umělé inteligence — co AI je a není, jak funguje strojové učení a neuronové sítě a jaké má AI reálné i etické dopady. Zakončeno certifikátem.",
    image: "images/elements-ai.svg",
    link: "images/certifikat-elements-of-ai.jpg"
  },
  {
    year: 1,
    type: "kurzy",
    title: "Když se z technologie stane setkání",
    category: "Virtuální realita · VRChat (tutorská lekce)",
    description: "Se spolužačkou jsme v rámci předmětu Virtuální realita připravily a odtutorovaly vlastní lekci ve VRChatu — založily jsme místnost a provedly spolužáky celou hodinou (kostky, kreslení, hudba) v dev módu. Nejvíc mě překvapilo, jak moc je VR o lidech: stačily jednoduché avatary, hlas a společná aktivita a vzniklo skutečné setkání, ne ukázka nástroje. Zažila jsem ale i nepříjemnou stránku, která mi připomněla, jak zásadní je ve virtuálních prostorech myslet na soukromí, bezpečí a osobní hranice.",
    image: "images/vrchat.jpg",
    link: ""
  },
  {
    year: 1,
    type: "psani",
    title: "První rok studia: když do sebe věci začnou zapadat",
    category: "Reflexe · 1. ročník",
    description: "Ohlédnutí za prvním rokem Designu informačních služeb — jak do sebe začaly zapadat sociologie, byznys a design, co přinesla virtuální realita i hackathon, vznik spolku Jiná mysl a proč mi začíná být teskno, že se blížím k polovině studia.",
    image: "images/reflexe-foto.jpg",
    link: "reflexe-prvni-rok.html"
  }
];
