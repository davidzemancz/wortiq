# AI Freelancer Marketplace – Technická specifikace demo aplikace

## 1. Přehled projektu

### 1.1 Vize

Interaktivní demo aplikace AI-powered freelancer marketplace zaměřeného na český trh. Aplikace demonstruje klíčovou hodnotu platformy: zákazník popíše projekt v přirozeném jazyce → AI analyzuje požadavky, rozloží na úkoly, navrhne optimální tým freelancerů a vytvoří plán projektu s rozpočtem a harmonogramem.

### 1.2 Účel

- Prezentace pro investory a inkubátory (zejména české startupy/VC)
- Demonstrace AI orchestrace jako klíčového diferenciátoru oproti Fiverr/Upwork
- Funkční prototyp s reálnou AI integrací (Claude API)
- Validace konceptu u potenciálních uživatelů

### 1.3 Cílová skupina demo

- Investoři a mentoři v inkubátorech
- Potenciální early adopters (malé firmy, podnikatelé)
- Freelanceři, kteří by na platformě mohli nabízet služby

---

## 2. Technický stack

### 2.1 Frontend

| Technologie | Verze | Účel |
|---|---|---|
| React | 18+ | UI framework |
| Vite | latest | Build tool a dev server |
| React Router | 6+ | Client-side routing |
| Tailwind CSS | 3+ | Styling |
| Lucide React | latest | Ikony |
| Framer Motion | latest | Animace a přechody |
| Zustand | latest | State management |

### 2.2 Backend (minimální)

| Technologie | Účel |
|---|---|
| Express.js | API proxy pro Claude API |
| Anthropic SDK (`@anthropic-ai/sdk`) | Komunikace s Claude |
| dotenv | Environment variables |
| cors | CORS handling |

### 2.3 Struktura projektu

```
ai-freelancer-marketplace/
├── client/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── PageTransition.jsx
│   │   │   ├── landing/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── HowItWorks.jsx
│   │   │   │   ├── StatsBar.jsx
│   │   │   │   ├── Testimonials.jsx
│   │   │   │   └── CTASection.jsx
│   │   │   ├── project/
│   │   │   │   ├── ProjectInputForm.jsx
│   │   │   │   ├── ExamplePrompts.jsx
│   │   │   │   └── AIAnalysisLoader.jsx
│   │   │   ├── analysis/
│   │   │   │   ├── TaskBreakdown.jsx
│   │   │   │   ├── TaskCard.jsx
│   │   │   │   ├── FreelancerSuggestions.jsx
│   │   │   │   ├── FreelancerCard.jsx
│   │   │   │   ├── BudgetEstimate.jsx
│   │   │   │   ├── TimelineView.jsx
│   │   │   │   └── ApprovalPanel.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── KanbanBoard.jsx
│   │   │   │   ├── KanbanColumn.jsx
│   │   │   │   ├── KanbanCard.jsx
│   │   │   │   ├── ProjectProgress.jsx
│   │   │   │   ├── ChatPanel.jsx
│   │   │   │   ├── ChatMessage.jsx
│   │   │   │   ├── TeamOverview.jsx
│   │   │   │   └── ActivityFeed.jsx
│   │   │   ├── freelancers/
│   │   │   │   ├── FreelancerBrowser.jsx
│   │   │   │   ├── FreelancerProfile.jsx
│   │   │   │   ├── SkillBadge.jsx
│   │   │   │   └── FreelancerFilter.jsx
│   │   │   └── ui/
│   │   │       ├── Button.jsx
│   │   │       ├── Card.jsx
│   │   │       ├── Badge.jsx
│   │   │       ├── Input.jsx
│   │   │       ├── TextArea.jsx
│   │   │       ├── Modal.jsx
│   │   │       ├── Spinner.jsx
│   │   │       ├── ProgressBar.jsx
│   │   │       ├── Avatar.jsx
│   │   │       ├── Tooltip.jsx
│   │   │       └── Toast.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── NewProjectPage.jsx
│   │   │   ├── AnalysisResultPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── FreelancersPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── stores/
│   │   │   ├── projectStore.js
│   │   │   └── uiStore.js
│   │   ├── hooks/
│   │   │   ├── useAIAnalysis.js
│   │   │   └── useTypewriter.js
│   │   ├── data/
│   │   │   ├── freelancers.js
│   │   │   ├── testimonials.js
│   │   │   ├── exampleProjects.js
│   │   │   └── skills.js
│   │   ├── utils/
│   │   │   ├── formatCurrency.js
│   │   │   ├── formatDate.js
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── index.js
│   ├── routes/
│   │   └── analyze.js
│   ├── prompts/
│   │   └── projectAnalysis.js
│   └── package.json
├── .env.example
├── .gitignore
├── README.md
└── package.json (root – scripts pro spuštění obou)
```

---

## 3. Design systém

### 3.1 Barevná paleta

```
Primary:       #2563EB (blue-600) – hlavní akce, CTA
Primary Dark:  #1D4ED8 (blue-700) – hover stavy
Secondary:     #7C3AED (violet-600) – AI-related prvky, akcenty
Accent:        #06B6D4 (cyan-500) – highlights, badges
Success:       #10B981 (emerald-500) – dokončené, aktivní
Warning:       #F59E0B (amber-500) – probíhající, upozornění
Error:         #EF4444 (red-500) – chyby, smazání

Background:    #F8FAFC (slate-50)
Surface:       #FFFFFF
Surface Alt:   #F1F5F9 (slate-100)
Border:        #E2E8F0 (slate-200)

Text Primary:  #0F172A (slate-900)
Text Secondary:#475569 (slate-600)
Text Muted:    #94A3B8 (slate-400)
```

### 3.2 Typografie

```
Font family:   Inter (Google Fonts)
Headings:      font-bold
  H1:          text-4xl md:text-5xl (landing), text-3xl (pages)
  H2:          text-2xl md:text-3xl
  H3:          text-xl
Body:          text-base (16px)
Small:         text-sm (14px)
Caption:       text-xs (12px)
```

### 3.3 Komponenty – Design principy

- Karty: `rounded-xl shadow-sm border border-slate-200 bg-white`
- Tlačítka primární: `bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-medium transition-all`
- Tlačítka sekundární: `border border-slate-300 hover:border-blue-500 text-slate-700 rounded-lg px-6 py-3`
- Inputy: `border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg px-4 py-3`
- Badges: `rounded-full px-3 py-1 text-xs font-medium`
- Přechody stránek: Framer Motion fade + slide animace

### 3.4 Responsivita

- Mobile first přístup
- Breakpointy: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- Navbar: hamburger menu na mobile
- Kanban: horizontální scroll na mobile, grid na desktop
- Karty: 1 sloupec mobile, 2 sloupce tablet, 3-4 sloupce desktop

---

## 4. Stránky – Detailní specifikace

### 4.1 Landing Page (`/`)

#### Hero Section
- Nadpis: „Popište projekt. AI sestaví tým." (s typing efektem na slovo „tým" → „plán" → „rozpočet" → „harmonogram")
- Podnadpis: „První AI-powered freelancer marketplace v Česku. Žádné hledání, žádné pohovory – jen výsledky."
- CTA tlačítko: „Zkusit zdarma →" → naviguje na `/new-project`
- Sekundární CTA: „Jak to funguje ↓" → scroll na sekci
- Na pozadí: jemný gradient blue → violet s animovanými floating shapes (CSS only)

#### How It Works – 3 kroky
1. **Popište** – „Zadejte projekt v přirozeném jazyce, jako byste psali kolegovi."
   - Ikona: MessageSquare
2. **AI analyzuje** – „Umělá inteligence rozloží projekt na úkoly a navrhne optimální tým."
   - Ikona: Brain / Sparkles
3. **Sledujte průběh** – „Kanban board, real-time chat a automatické reporty."
   - Ikona: LayoutDashboard

Každý krok má animaci při scrollu (fade in from bottom, staggered).

#### Stats Bar (mockovaná data)
- 1 250+ registrovaných freelancerů
- 340+ dokončených projektů
- 98% spokojenost klientů
- Průměrný čas sestavení týmu: 3 minuty

Animované počítadlo (count up) při scrollu do view.

#### Testimonials (mockované)
- 3 karty s citáty od fiktivních uživatelů
- Avatar, jméno, role, firma
- Carousel na mobile, grid na desktop

#### CTA Section (spodní)
- „Připraveni revolucionalizovat váš workflow?"
- Tlačítko: „Začít první projekt"
- Background: gradient card

---

### 4.2 New Project Page (`/new-project`)

#### Project Input Form

**Hlavní textarea:**
- Placeholder: „Popište svůj projekt... Např: Potřebuji moderní e-shop na prodej ručně vyráběných svíček. Chci platební bránu (Stripe nebo GoPay), napojení na Zásilkovnu, responsivní design a základní SEO optimalizaci."
- Min 3 řádky, auto-expand
- Character count v pravém dolním rohu
- Max 2000 znaků

**Volitelná pole (rozbalitelná sekce „Upřesnit detaily"):**
- Rozpočet: select s rozsahy (Do 10 000 Kč / 10–30 000 Kč / 30–80 000 Kč / 80–200 000 Kč / 200 000+ Kč / Nechci specifikovat)
- Deadline: date picker nebo select (Do 2 týdnů / Do měsíce / Do 3 měsíců / Flexibilní)
- Kategorie: multi-select chips (Web development, Mobilní aplikace, Grafický design, Marketing, Copywriting, Video, Fotografie, Překlady, Data & Analytika, AI & Automatizace)

**Example Prompts – klikatelné karty pod formulářem:**
```
[
  {
    title: "E-shop se svíčkami",
    description: "Moderní e-shop s platební bránou a Zásilkovnou",
    prompt: "Potřebuji moderní e-shop na prodej ručně vyráběných svíček. Chci platební bránu GoPay, napojení na Zásilkovnu, responsivní design, základní SEO a propojení s Instagramem.",
    categories: ["Web development", "Grafický design"],
    budget: "30–80 000 Kč"
  },
  {
    title: "Rebranding kavárny",
    description: "Kompletní vizuální identita a marketingové materiály",
    prompt: "Potřebuji kompletní rebranding pro naši kavárnu. Nové logo, vizuální identitu, návrh menu, vizitky, social media šablony a aktualizaci webu. Kavárna se jmenuje 'Zrnko' a zaměřujeme se na specialty coffee.",
    categories: ["Grafický design", "Marketing", "Web development"],
    budget: "30–80 000 Kč"
  },
  {
    title: "Mobilní fitness aplikace",
    description: "iOS/Android app s tréninkovými plány",
    prompt: "Chci vytvořit mobilní fitness aplikaci pro iOS a Android. Uživatelé si vyberou cíl (zhubnout, nabrat svaly, zlepšit kondici), appka jim vygeneruje tréninkový plán na míru. Potřebuji UI/UX design, vývoj v React Native, backend pro uživatelské účty a integraci s Apple Health / Google Fit.",
    categories: ["Mobilní aplikace", "Grafický design"],
    budget: "80–200 000 Kč"
  },
  {
    title: "Marketingová kampaň",
    description: "Launch nového produktu na český trh",
    prompt: "Spouštíme nový produkt – ekologické čisticí prostředky. Potřebuji kompletní marketingovou kampaň pro český trh: copywriting pro web, 10 social media postů (text + grafika), 2 krátká promo videa pro Instagram Reels, PPC reklamy pro Google a Seznam, a návrh tiskové zprávy.",
    categories: ["Marketing", "Copywriting", "Video", "Grafický design"],
    budget: "30–80 000 Kč"
  }
]
```

**Tlačítko „Analyzovat projekt":**
- Disabled dokud textarea není vyplněná (min 20 znaků)
- Loading stav: Spinner + „AI analyzuje váš projekt..."
- Po kliknutí: odešle request na backend → naviguje na `/analysis`

#### AI Analysis Loader (přechodová obrazovka)

Zatímco AI zpracovává request, zobrazit animovaný loader:
- Pulsující AI ikona
- Postupně se zobrazující kroky s checkmarky:
  1. ✓ Analyzuji požadavky...
  2. ✓ Identifikuji potřebné dovednosti...
  3. ✓ Hledám nejlepší freelancery...
  4. ✓ Sestavuji harmonogram...
  5. ✓ Kalkuluji rozpočet...
- Každý krok se zobrazí se zpožděním 800ms
- Celkový čas: koreluje s reálným API call (typicky 3-8 sekund)

---

### 4.3 Analysis Result Page (`/analysis`)

Tato stránka zobrazuje výsledek AI analýzy. Data přicházejí z Claude API.

#### Task Breakdown sekce
- Nadpis: „Rozklad projektu na úkoly"
- Grid karet, každý úkol obsahuje:
  - Název úkolu (bold)
  - Popis (2-3 věty)
  - Potřebné dovednosti (badge chips)
  - Odhadovaná náročnost: Easy / Medium / Hard (barevný badge)
  - Odhadovaný čas (hodiny/dny)
  - Priorita: High / Medium / Low
  - Dependencies (na které úkoly navazuje)

#### Freelancer Suggestions sekce
- Nadpis: „Navržený tým"
- Pro každý úkol navržený freelancer (z mock dat):
  - Profilový avatar (generovaný z iniciál)
  - Jméno a příjmení (české)
  - Hlavní dovednost + další skill badges
  - Rating (4.2–5.0 hvězdiček)
  - Počet dokončených projektů
  - Hodinová sazba v CZK
  - Dostupnost: „Volný ihned" / „Od [datum]" / „Částečně obsazený"
  - Match score: procento shody s úkolem (85-99%)
  - Mini portfolio (2-3 thumbnaily)

#### Budget Estimate sekce
- Breakdown po úkolech (tabulka):
  - Úkol | Freelancer | Hodiny | Sazba | Cena
  - Mezisoučet
  - Platforma fee (8%)
  - **Celkem s DPH**
- Vizuální: donut chart rozdělení rozpočtu podle kategorií
- Srovnání: „Tržní průměr pro podobný projekt: X–Y Kč"

#### Timeline View sekce
- Horizontální Gantt-like chart
- Každý úkol jako barevný blok
- Zobrazení dependencies (šipky)
- Milestones (diamanty)
- Celková doba projektu
- Kritická cesta zvýrazněna

#### Approval Panel (sticky bottom bar)
- Souhrn: „5 úkolů · 3 freelanceři · 45 000 Kč · 4 týdny"
- Tlačítko: „Schválit a spustit projekt →" → naviguje na `/dashboard`
- Sekundární: „Upravit zadání" → zpět na `/new-project`

---

### 4.4 Dashboard Page (`/dashboard`)

Simulace řízení projektu po schválení.

#### Header
- Název projektu (z analýzy)
- Status badge: „V průběhu"
- Progress bar: celkový postup (%)
- Dropdown: přepínání mezi projekty (mock)

#### Kanban Board (hlavní sekce)
- 4 sloupce: **Backlog** → **V řešení** → **Ke schválení** → **Dokončeno**
- Drag & drop karty mezi sloupci
- Každá karta:
  - Název úkolu
  - Přiřazený freelancer (avatar + jméno)
  - Priority badge
  - Deadline
  - Skill tags
  - Komentáře count
  - Progress indicator (pro rozpracované)

#### Chat Panel (pravý sidebar nebo tab)
- Mock konverzace s AI agentem:
```
AI Agent (10:30): Projekt byl úspěšně rozdělen do 5 úkolů. Tým byl notifikován.
Vy (10:32): Jak probíhá práce na designu?
AI Agent (10:32): @Jana Nováková dokončila wireframy a začala s vizuálním návrhem. Odhadovaný progres: 40%. Chcete, abych vám poslal preview?
Vy (10:35): Ano, prosím.
AI Agent (10:35): Posílám link na Figma preview od Jany. Zároveň jsem požádal @Petra Dvořáka o přípravu databázové struktury, aby mohl začít s backendem hned po schválení designu.
```
- Input pole s placeholder: „Napište zprávu AI agentovi..."
- Nefunkční (jen UI), při odeslání zobrazit toast „Demo verze – chat bude dostupný v plné verzi"

#### Team Overview (sidebar nebo tab)
- Seznam členů týmu s:
  - Avatar, jméno
  - Role v projektu
  - Aktuální úkol
  - Stav: Online / Offline / Busy
  - Mini progress bar

#### Activity Feed
- Timeline posledních událostí:
  - „Jana nahrála wireframy" – před 2 hodinami
  - „AI agent aktualizoval harmonogram" – před 3 hodinami
  - „Petr dokončil databázový návrh" – před 5 hodinami
  - „Projekt zahájen" – včera

---

### 4.5 Freelancers Browse Page (`/freelancers`)

Ukázka katalogu freelancerů.

#### Filter Bar
- Search input: hledání podle jména nebo dovednosti
- Kategorie: dropdown nebo chips (Web dev, Design, Marketing, ...)
- Cena: range slider (200–2000 Kč/h)
- Rating: min rating slider (3.0–5.0)
- Dostupnost: checkbox „Pouze volní"
- Seřazení: Nejlepší match / Nejvyšší rating / Nejnižší cena / Nejvíce projektů

#### Freelancer Grid
- Karty v gridu (3 sloupce desktop, 2 tablet, 1 mobile)
- Každá karta:
  - Avatar (velký, kulatý, generovaný z iniciál s barevným pozadím)
  - Jméno
  - Hlavní role (Frontend Developer, Grafik, Copywriter...)
  - Rating (hvězdičky + číslo)
  - Lokace (město v ČR)
  - Top 3 skill badges
  - Hodinová sazba
  - Počet dokončených projektů
  - „Zobrazit profil" tlačítko → modal s detailem

#### Freelancer Profile Modal
- Detailní profil:
  - Velký avatar + jméno + role
  - Bio (2-3 věty)
  - Všechny dovednosti jako badges
  - Portfolio sekce (mockované thumbnaily)
  - Statistiky: dokončené projekty, průměrné hodnocení, doba na platformě
  - Recenze (2-3 mockované)
  - CTA: „Přidat do projektu"

---

### 4.6 404 Page

- Ilustrace (SVG nebo emoji)
- „Tato stránka neexistuje"
- Tlačítko zpět na úvodní stránku

---

## 5. AI Integrace – Claude API

### 5.1 Backend endpoint

```
POST /api/analyze
Content-Type: application/json

{
  "description": "string – popis projektu",
  "budget": "string | null – rozsah rozpočtu",
  "deadline": "string | null – časový rámec",
  "categories": ["string"] – vybrané kategorie
}
```

### 5.2 System prompt pro Claude

```
Jsi AI projektový manažer pro českou freelancer platformu. Tvým úkolem je analyzovat popis projektu od klienta a vytvořit strukturovaný plán.

Odpovídej VÝHRADNĚ validním JSON objektem v následující struktuře (bez markdown, bez komentářů):

{
  "projectName": "Krátký název projektu",
  "projectSummary": "Shrnutí projektu ve 2-3 větách",
  "complexity": "low" | "medium" | "high",
  "estimatedDuration": {
    "weeks": number,
    "description": "Textový popis časového rámce"
  },
  "tasks": [
    {
      "id": "task-1",
      "title": "Název úkolu",
      "description": "Detailní popis co je potřeba udělat",
      "skills": ["skill1", "skill2"],
      "difficulty": "easy" | "medium" | "hard",
      "estimatedHours": number,
      "priority": "high" | "medium" | "low",
      "dependencies": ["task-id"] nebo [],
      "category": "development" | "design" | "marketing" | "copywriting" | "video" | "other",
      "deliverables": ["Co bude výstupem"]
    }
  ],
  "suggestedTeam": [
    {
      "role": "Název role",
      "taskIds": ["task-1"],
      "requiredSkills": ["skill1"],
      "seniorityLevel": "junior" | "mid" | "senior",
      "estimatedHourlyRate": { "min": number, "max": number, "currency": "CZK" },
      "estimatedHours": number
    }
  ],
  "budget": {
    "breakdown": [
      { "category": "string", "amount": number, "percentage": number }
    ],
    "subtotal": number,
    "platformFee": number,
    "total": number,
    "currency": "CZK",
    "note": "Poznámka k rozpočtu"
  },
  "milestones": [
    {
      "title": "Název milníku",
      "weekNumber": number,
      "taskIds": ["task-1"],
      "description": "Popis"
    }
  ],
  "risks": [
    {
      "description": "Popis rizika",
      "mitigation": "Jak jej zmírnit",
      "severity": "low" | "medium" | "high"
    }
  ],
  "recommendations": ["Doporučení pro klienta"]
}

Pravidla:
- Všechny ceny v CZK
- Hodinové sazby reflektují český trh (300-2000 Kč/h podle seniority a oboru)
- Realistické odhady času
- Úkoly logicky navazují (dependencies)
- Maximálně 8 úkolů
- Vždy alespoň 2 milníky
- Vždy alespoň 1 riziko
```

### 5.3 Response handling

- Timeout: 30 sekund
- Retry: 1x při selhání
- Fallback: pokud API selže, nabídnout předpřipravený mock výsledek
- Validace JSON response před použitím
- Error handling s uživatelsky přátelskými zprávami

### 5.4 Model

- Použít `claude-sonnet-4-20250514` (nejlepší poměr cena/výkon pro strukturovaný output)
- `max_tokens`: 4096
- `temperature`: 0.3 (konzistentní, ale ne úplně deterministický)

---

## 6. Mock data

### 6.1 Freelancer databáze (15-20 profilů)

Generovat české profily s realistickými daty:

```javascript
const freelancers = [
  {
    id: "fr-001",
    name: "Jana Nováková",
    avatar: null, // generovat z iniciál
    role: "UI/UX Designér",
    bio: "Specializuji se na design webových a mobilních aplikací. 6 let zkušeností s Figma, Adobe XD a prototypováním.",
    location: "Praha",
    hourlyRate: 850,
    skills: ["UI/UX Design", "Figma", "Adobe XD", "Prototyping", "Design Systems"],
    rating: 4.9,
    completedProjects: 67,
    availability: "available",
    availableFrom: null,
    memberSince: "2022-03",
    portfolio: [
      { title: "E-shop redesign", thumbnail: null },
      { title: "Fitness app UI", thumbnail: null },
      { title: "SaaS dashboard", thumbnail: null }
    ],
    reviews: [
      { author: "Martin K.", rating: 5, text: "Perfektní práce, skvělá komunikace. Doporučuji!", date: "2024-11" },
      { author: "Lucie P.", rating: 5, text: "Jana dodala návrhy před termínem a přesně podle zadání.", date: "2024-09" }
    ]
  },
  // ... dalších 14-19 profilů pokrývajících:
  // Frontend dev, Backend dev, Fullstack dev, Mobile dev,
  // Grafický designér, Ilustrátor, Copywriter, SEO specialista,
  // Social media manager, Video editor, Fotograf, Překladatel,
  // Data analytik, DevOps, Marketingový stratég
]
```

Role, lokace a sazby by měly pokrývat:
- Lokace: Praha, Brno, Ostrava, Plzeň, Olomouc, remote
- Sazby: 300–2000 Kč/h
- Rating: 4.2–5.0
- Projekty: 5–120+

### 6.2 Testimonials

```javascript
const testimonials = [
  {
    name: "Tomáš Krejčí",
    role: "Zakladatel",
    company: "GreenBox s.r.o.",
    text: "Místo týdne hledání na různých platformách jsem měl tým sestavený za 5 minut. AI přesně pochopil, co potřebuji.",
    avatar: null
  },
  {
    name: "Petra Šimková",
    role: "Freelance designér",
    text: "Konečně platforma, kde nemusím soutěžit cenou. AI mi přiřazuje projekty, které odpovídají mým dovednostem.",
    avatar: null
  },
  {
    name: "Marek Dvořák",
    role: "Marketing Manager",
    company: "TechStart a.s.",
    text: "Automatické rozložení projektu na úkoly je game-changer. Ušetřili jsme hodiny projektového plánování.",
    avatar: null
  }
]
```

---

## 7. State management (Zustand)

### 7.1 Project Store

```javascript
// stores/projectStore.js
{
  // Input phase
  projectDescription: "",
  budget: null,
  deadline: null,
  categories: [],

  // Analysis phase
  isAnalyzing: false,
  analysisResult: null,   // AI response object
  analysisError: null,

  // Dashboard phase (mock state)
  dashboardState: {
    columns: {
      backlog: [],
      inProgress: [],
      review: [],
      done: []
    },
    chat: [],
    team: [],
    activities: []
  },

  // Actions
  setProjectDescription: (desc) => ...,
  setBudget: (budget) => ...,
  setDeadline: (deadline) => ...,
  toggleCategory: (cat) => ...,
  analyzeProject: async () => ...,  // API call
  resetProject: () => ...,
  moveTask: (taskId, from, to) => ...,
  initDashboard: () => ...  // populate from analysisResult
}
```

### 7.2 UI Store

```javascript
// stores/uiStore.js
{
  isMobileMenuOpen: false,
  activeTab: "kanban", // kanban | chat | team | activity
  isFreelancerModalOpen: false,
  selectedFreelancerId: null,
  toasts: [],

  // Actions
  toggleMobileMenu: () => ...,
  setActiveTab: (tab) => ...,
  openFreelancerModal: (id) => ...,
  closeFreelancerModal: () => ...,
  addToast: (toast) => ...,
  removeToast: (id) => ...
}
```

---

## 8. Routing

```javascript
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/new-project" element={<NewProjectPage />} />
  <Route path="/analysis" element={<AnalysisResultPage />} />
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/freelancers" element={<FreelancersPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

Navbar links: Domů, Zadat projekt, Freelanceři, Dashboard (visible jen po analýze)

---

## 9. Animace a UX detaily

### 9.1 Page transitions
- Framer Motion `AnimatePresence` s fade + translateY

### 9.2 Scroll animations
- Staggered fade-in pro karty a sekce na landing page
- Count-up animace pro stats

### 9.3 Loading states
- Skeleton loading pro karty
- Pulsující shimmer efekt
- AI analysis: stepped progress s checkmarky

### 9.4 Micro-interactions
- Hover efekty na kartách (lift shadow)
- Button press feedback
- Toast notifikace (slide in from top-right)
- Smooth scroll na anchor links

### 9.5 Typewriter efekt
- Custom hook `useTypewriter` pro hero section
- Postupně vypisuje a maže slova v cyklu

---

## 10. Spuštění a development

### 10.1 Environment variables

```env
# .env (root)
ANTHROPIC_API_KEY=sk-ant-...
PORT=3001
```

### 10.2 Scripts

```json
// root package.json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
    "dev:client": "cd client && npm run dev",
    "dev:server": "cd server && node index.js",
    "build": "cd client && npm run build",
    "start": "node server/index.js"
  }
}
```

### 10.3 Vite config

```javascript
// client/vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
```

---

## 11. Důležité implementační poznámky

### 11.1 Co MUSÍ fungovat (live)
- Zadání projektu v přirozeném jazyce
- Odeslání na Claude API a zpracování odpovědi
- Zobrazení strukturované analýzy (úkoly, tým, rozpočet, timeline)
- Navigace mezi stránkami
- Responsivní design
- Animace a přechody

### 11.2 Co je MOCK (vizuálně funkční, ale ne real)
- Profily freelancerů (statická data)
- Dashboard kanban (drag & drop funguje lokálně, ale neukládá)
- Chat panel (předpřipravené zprávy)
- Activity feed
- Filtrování freelancerů (funguje nad mock daty)
- Hodnocení a recenze

### 11.3 Error handling
- API timeout → zobrazit fallback mock data s upozorněním
- Nevalidní JSON z API → retry 1x, pak fallback
- Prázdný input → disabled submit + validační zpráva
- 404 → custom stránka
- Network error → toast s „Zkontrolujte připojení k internetu"

### 11.4 Přístupnost (a11y)
- Sémantické HTML elementy
- ARIA labels na interaktivních prvcích
- Klávesová navigace
- Dostatečný kontrast barev
- Focus states na všech interaktivních prvcích

### 11.5 SEO a meta
- Title tag na každé stránce
- Meta description
- Open Graph tagy (pro sdílení)
- Favicon

---

## 12. Budoucí rozšíření (mimo scope demo)

Pro kontext – toto NEIMPLEMENTOVAT, jen zmínka o plánech:
- Autentizace (Clerk/Auth0)
- Reálný escrow platební systém
- WebSocket real-time komunikace
- Napojení na českou platební bránu (GoPay/Comgate)
- Administrátorský panel
- Freelancer onboarding flow
- Notifikace (email, push)
- Multi-language (CZ/EN)
- Analytics dashboard
