// Quiz questions for each project type
// Questions are designed to be non-technical but help determine scope and budget

export const quizQuestions = {
  // Common questions asked for all project types
  common: [
    {
      id: 'budget',
      question: 'Jaký máte rozpočet na tento projekt?',
      description: 'Pomůže nám navrhnout realistický rozsah projektu',
      type: 'single',
      options: [
        { value: 'micro', label: 'Do 30 000 Kč', description: 'MVP nebo jednoduchý prototyp' },
        { value: 'small', label: '30 000 – 80 000 Kč', description: 'Menší projekt se základními funkcemi' },
        { value: 'medium', label: '80 000 – 150 000 Kč', description: 'Standardní projekt s rozšířenými funkcemi' },
        { value: 'large', label: '150 000 – 300 000 Kč', description: 'Komplexní řešení na míru' },
        { value: 'enterprise', label: '300 000+ Kč', description: 'Rozsáhlý enterprise projekt' },
      ],
    },
    {
      id: 'timeline',
      question: 'Kdy potřebujete projekt hotový?',
      description: 'Časový tlak ovlivňuje velikost týmu a prioritizaci funkcí',
      type: 'single',
      options: [
        { value: 'asap', label: 'Co nejdříve (2-4 týdny)', description: 'Menší rozsah, rychlé dodání' },
        { value: 'normal', label: '1-2 měsíce', description: 'Standardní tempo vývoje' },
        { value: 'relaxed', label: '3+ měsíce', description: 'Dostatek času na kvalitu a iterace' },
        { value: 'flexible', label: 'Flexibilní', description: 'Záleží hlavně na kvalitě' },
      ],
    },
  ],

  // E-commerce specific questions
  ecommerce: {
    marketInfo: {
      title: 'E-shop na českém trhu',
      description: 'Základní e-shop začíná kolem 60-100k Kč. Komplexnější řešení s napojením na platby, dopravu a ERP systémy se pohybuje od 150k výše.',
      averageBudget: '80 000 – 200 000 Kč',
      averageTimeline: '6-10 týdnů',
    },
    questions: [
      {
        id: 'productCount',
        question: 'Kolik produktů plánujete prodávat?',
        description: 'Ovlivňuje náročnost katalogové struktury a vyhledávání',
        type: 'single',
        options: [
          { value: 'small', label: 'Do 50 produktů', description: 'Jednoduchý katalog' },
          { value: 'medium', label: '50-500 produktů', description: 'Kategorizace a filtry' },
          { value: 'large', label: '500+ produktů', description: 'Pokročilé vyhledávání, importy' },
        ],
      },
      {
        id: 'payments',
        question: 'Jaké platební metody potřebujete?',
        description: 'Integrace platebních bran je klíčová pro konverze',
        type: 'multi',
        options: [
          { value: 'card', label: 'Platební karty', description: 'Visa, Mastercard' },
          { value: 'gopay', label: 'GoPay', description: 'Oblíbené v ČR' },
          { value: 'stripe', label: 'Stripe', description: 'Mezinárodní, Apple/Google Pay' },
          { value: 'cod', label: 'Dobírka', description: 'Platba při převzetí' },
          { value: 'transfer', label: 'Bankovní převod', description: 'Klasická platba' },
        ],
      },
      {
        id: 'shipping',
        question: 'Jakou dopravu budete nabízet?',
        description: 'Napojení na dopravce vyžaduje API integrace',
        type: 'multi',
        options: [
          { value: 'zasilkovna', label: 'Zásilkovna', description: 'Výdejní místa, populární v ČR' },
          { value: 'ppl', label: 'PPL / DPD', description: 'Kurýrní služby' },
          { value: 'cp', label: 'Česká pošta', description: 'Balík na poštu, do ruky' },
          { value: 'pickup', label: 'Osobní odběr', description: 'Vlastní výdejní místo' },
        ],
      },
      {
        id: 'designLevel',
        question: 'Jaký design očekáváte?',
        description: 'Design výrazně ovlivňuje celkovou cenu projektu',
        type: 'single',
        options: [
          { value: 'template', label: 'Úprava šablony', description: 'Rychlé, cenově dostupné (10-25k)' },
          { value: 'custom', label: 'Design na míru', description: 'Unikátní vzhled (40-80k)' },
          { value: 'premium', label: 'Premium branding', description: 'Kompletní brand identita (80k+)' },
        ],
      },
    ],
  },

  // Mobile app specific questions
  mobileApp: {
    marketInfo: {
      title: 'Mobilní aplikace',
      description: 'Jednoduchá aplikace pro jednu platformu začíná kolem 100k Kč. Cross-platform aplikace s backendem a pokročilými funkcemi se pohybuje od 200k výše.',
      averageBudget: '150 000 – 400 000 Kč',
      averageTimeline: '8-14 týdnů',
    },
    questions: [
      {
        id: 'platforms',
        question: 'Pro jaké platformy chcete aplikaci?',
        description: 'Vývoj pro obě platformy je dražší, ale osloví více uživatelů',
        type: 'single',
        options: [
          { value: 'ios', label: 'Pouze iOS (iPhone)', description: 'Jednodušší vývoj, prémiová audience' },
          { value: 'android', label: 'Pouze Android', description: 'Větší tržní podíl v ČR' },
          { value: 'both', label: 'iOS i Android', description: 'Maximální dosah (+40-60% nákladů)' },
        ],
      },
      {
        id: 'features',
        question: 'Jaké funkce jsou pro vás klíčové?',
        description: 'Některé funkce výrazně prodražují vývoj',
        type: 'multi',
        options: [
          { value: 'auth', label: 'Přihlášení uživatelů', description: 'Email, sociální sítě' },
          { value: 'push', label: 'Push notifikace', description: 'Upozornění pro uživatele' },
          { value: 'offline', label: 'Offline režim', description: 'Funguje bez internetu' },
          { value: 'payments', label: 'Platby v aplikaci', description: 'In-app purchases, subscription' },
          { value: 'camera', label: 'Kamera / fotky', description: 'Focení, galerie, úpravy' },
          { value: 'location', label: 'GPS / mapy', description: 'Lokalizace, navigace' },
        ],
      },
      {
        id: 'backend',
        question: 'Potřebujete backend (server)?',
        description: 'Pokud chcete ukládat data uživatelů nebo synchronizovat mezi zařízeními',
        type: 'single',
        options: [
          { value: 'none', label: 'Ne, vše lokálně', description: 'Data jen v telefonu' },
          { value: 'simple', label: 'Jednoduchý backend', description: 'Uživatelé, základní data' },
          { value: 'complex', label: 'Komplexní backend', description: 'API, real-time, integrace' },
        ],
      },
      {
        id: 'designLevel',
        question: 'Jaká úroveň designu?',
        description: 'Design aplikace ovlivňuje první dojem uživatelů',
        type: 'single',
        options: [
          { value: 'basic', label: 'Funkční základ', description: 'Systémové komponenty (15-30k)' },
          { value: 'custom', label: 'Custom design', description: 'Vlastní vizuál (50-100k)' },
          { value: 'premium', label: 'Premium UX', description: 'Animace, micro-interactions (100k+)' },
        ],
      },
    ],
  },

  // SaaS platform specific questions
  saas: {
    marketInfo: {
      title: 'SaaS platforma',
      description: 'MVP SaaS aplikace začíná kolem 150k Kč. Plnohodnotná platforma s multi-tenancy, billing a pokročilými funkcemi od 300k výše.',
      averageBudget: '200 000 – 500 000 Kč',
      averageTimeline: '10-16 týdnů',
    },
    questions: [
      {
        id: 'users',
        question: 'Kolik uživatelů očekáváte v prvním roce?',
        description: 'Ovlivňuje architekturu a infrastrukturu',
        type: 'single',
        options: [
          { value: 'small', label: 'Do 100 uživatelů', description: 'Jednoduchá infrastruktura' },
          { value: 'medium', label: '100-1000 uživatelů', description: 'Škálovatelná architektura' },
          { value: 'large', label: '1000+ uživatelů', description: 'Enterprise infrastruktura' },
        ],
      },
      {
        id: 'billing',
        question: 'Potřebujete platební systém?',
        description: 'Subscription billing přidává komplexitu',
        type: 'single',
        options: [
          { value: 'none', label: 'Ne, zatím free', description: 'Bez plateb, možné přidat později' },
          { value: 'simple', label: 'Jednorázové platby', description: 'Základní Stripe checkout' },
          { value: 'subscription', label: 'Předplatné', description: 'Měsíční/roční plány, trial' },
        ],
      },
      {
        id: 'integrations',
        question: 'Jaké integrace potřebujete?',
        description: 'Každá integrace přidává čas na vývoj',
        type: 'multi',
        options: [
          { value: 'google', label: 'Google (login, calendar)', description: 'OAuth, API integrace' },
          { value: 'slack', label: 'Slack / Teams', description: 'Notifikace, boti' },
          { value: 'email', label: 'Email marketing', description: 'Mailchimp, SendGrid' },
          { value: 'analytics', label: 'Analytics', description: 'Mixpanel, Amplitude' },
          { value: 'api', label: 'Vlastní API', description: 'Pro integraci třetích stran' },
        ],
      },
      {
        id: 'designLevel',
        question: 'Jakou kvalitu UI/UX očekáváte?',
        description: 'SaaS produkty soutěží hlavně na uživatelském zážitku',
        type: 'single',
        options: [
          { value: 'mvp', label: 'MVP / funkční', description: 'Základní UI, rychle na trh' },
          { value: 'polished', label: 'Profesionální', description: 'Kvalitní design, standardní UX' },
          { value: 'premium', label: 'Premium produkt', description: 'Špičkový UX, konkurenční výhoda' },
        ],
      },
    ],
  },

  // Marketing campaign specific questions
  marketing: {
    marketInfo: {
      title: 'Marketingová kampaň',
      description: 'Jednorázová kampaň začíná kolem 30k Kč. Komplexní kampaň s video produkcí, PPC a influencer marketingem od 80k výše.',
      averageBudget: '40 000 – 150 000 Kč',
      averageTimeline: '2-6 týdnů',
    },
    questions: [
      {
        id: 'channels',
        question: 'Na jakých kanálech chcete být?',
        description: 'Každý kanál vyžaduje specifický obsah a strategii',
        type: 'multi',
        options: [
          { value: 'instagram', label: 'Instagram', description: 'Vizuální obsah, Stories, Reels' },
          { value: 'facebook', label: 'Facebook', description: 'Širší audience, skupiny' },
          { value: 'linkedin', label: 'LinkedIn', description: 'B2B, profesionální obsah' },
          { value: 'tiktok', label: 'TikTok', description: 'Mladší audience, trendy' },
          { value: 'google', label: 'Google Ads', description: 'Vyhledávání, display' },
          { value: 'email', label: 'Email marketing', description: 'Newslettery, automatizace' },
        ],
      },
      {
        id: 'content',
        question: 'Jaký obsah potřebujete vytvořit?',
        description: 'Video a fotografie zvyšují engagement, ale i cenu',
        type: 'multi',
        options: [
          { value: 'graphics', label: 'Grafiky a bannery', description: 'Statický vizuál' },
          { value: 'photos', label: 'Produktové fotky', description: 'Profesionální focení' },
          { value: 'video', label: 'Video obsah', description: 'Reels, promo videa' },
          { value: 'copy', label: 'Texty a copywriting', description: 'Příspěvky, reklamy' },
        ],
      },
      {
        id: 'adBudget',
        question: 'Jaký máte budget na reklamu (PPC)?',
        description: 'Kromě tvorby je potřeba počítat s media spendem',
        type: 'single',
        options: [
          { value: 'none', label: 'Pouze organický dosah', description: 'Bez placené reklamy' },
          { value: 'small', label: '5-15k Kč/měsíc', description: 'Testovací kampaně' },
          { value: 'medium', label: '15-50k Kč/měsíc', description: 'Standardní kampaně' },
          { value: 'large', label: '50k+ Kč/měsíc', description: 'Agresivní růst' },
        ],
      },
      {
        id: 'goal',
        question: 'Jaký je hlavní cíl kampaně?',
        description: 'Cíl určuje strategii a metriky úspěchu',
        type: 'single',
        options: [
          { value: 'awareness', label: 'Brand awareness', description: 'Dostat značku do povědomí' },
          { value: 'leads', label: 'Generování leadů', description: 'Kontakty, registrace' },
          { value: 'sales', label: 'Přímé prodeje', description: 'Konverze, objednávky' },
          { value: 'engagement', label: 'Engagement', description: 'Komunita, interakce' },
        ],
      },
    ],
  },

  // AI/ML project specific questions
  aiml: {
    marketInfo: {
      title: 'AI / Machine Learning projekt',
      description: 'Jednoduchá AI integrace (např. ChatGPT API) začíná kolem 50k Kč. Vlastní ML model s tréninkem a production deployem od 200k výše.',
      averageBudget: '100 000 – 400 000 Kč',
      averageTimeline: '8-16 týdnů',
    },
    questions: [
      {
        id: 'aiType',
        question: 'O jaký typ AI řešení se jedná?',
        description: 'Různé přístupy mají různou náročnost',
        type: 'single',
        options: [
          { value: 'api', label: 'Integrace existující AI', description: 'ChatGPT, Claude API (nejrychlejší)' },
          { value: 'finetune', label: 'Fine-tuning modelu', description: 'Přizpůsobení na vaše data' },
          { value: 'custom', label: 'Vlastní ML model', description: 'Trénink od nuly (nejdražší)' },
        ],
      },
      {
        id: 'data',
        question: 'Jaká je situace s daty?',
        description: 'Data jsou klíčová pro kvalitu ML modelu',
        type: 'single',
        options: [
          { value: 'ready', label: 'Máme připravená data', description: 'Strukturovaná, očištěná' },
          { value: 'raw', label: 'Máme surová data', description: 'Vyžadují zpracování' },
          { value: 'none', label: 'Data nemáme', description: 'Budeme sbírat nebo kupovat' },
          { value: 'notNeeded', label: 'Nepotřebujeme', description: 'Využijeme existující model' },
        ],
      },
      {
        id: 'useCase',
        question: 'Jaký je hlavní use case?',
        description: 'Pomůže nám zvolit správný přístup',
        type: 'single',
        options: [
          { value: 'chatbot', label: 'Chatbot / asistent', description: 'Konverzační AI' },
          { value: 'analysis', label: 'Analýza textu/dat', description: 'Kategorizace, sumarizace' },
          { value: 'prediction', label: 'Predikce', description: 'Forecasting, doporučování' },
          { value: 'vision', label: 'Rozpoznávání obrazu', description: 'Klasifikace, detekce' },
          { value: 'automation', label: 'Automatizace procesů', description: 'RPA s AI' },
        ],
      },
      {
        id: 'deployment',
        question: 'Kde má AI běžet?',
        description: 'Ovlivňuje náklady na infrastrukturu',
        type: 'single',
        options: [
          { value: 'cloud', label: 'Cloud API', description: 'Nejjednodušší, platíte za použití' },
          { value: 'dedicated', label: 'Dedikovaný server', description: 'Vlastní infrastruktura' },
          { value: 'edge', label: 'Edge / on-device', description: 'Běží přímo na zařízení' },
        ],
      },
    ],
  },

  // Blockchain/Web3 specific questions
  blockchain: {
    marketInfo: {
      title: 'Web3 / Blockchain projekt',
      description: 'Jednoduchý smart contract začíná kolem 80k Kč. Kompletní dApp s auditem a frontend od 250k výše. Security audit je nutnost (+50-100k).',
      averageBudget: '200 000 – 600 000 Kč',
      averageTimeline: '10-18 týdnů',
    },
    questions: [
      {
        id: 'blockchain',
        question: 'Na jakém blockchainu chcete stavět?',
        description: 'Ethereum je nejrozšířenější, ale dražší na transakce',
        type: 'single',
        options: [
          { value: 'ethereum', label: 'Ethereum mainnet', description: 'Nejvíc uživatelů, vyšší gas fees' },
          { value: 'polygon', label: 'Polygon (L2)', description: 'Nízké fees, rychlé transakce' },
          { value: 'arbitrum', label: 'Arbitrum / Optimism', description: 'Ethereum L2, dobrá kompatibilita' },
          { value: 'solana', label: 'Solana', description: 'Velmi rychlé, jiný ekosystém' },
          { value: 'other', label: 'Jiný / nevím', description: 'Poradíme nejlepší volbu' },
        ],
      },
      {
        id: 'contractType',
        question: 'O jaký typ projektu jde?',
        description: 'Různé typy mají různou komplexitu',
        type: 'single',
        options: [
          { value: 'token', label: 'Token (ERC-20)', description: 'Vlastní kryptoměna' },
          { value: 'nft', label: 'NFT kolekce', description: 'ERC-721/1155, minting' },
          { value: 'defi', label: 'DeFi protokol', description: 'Staking, swaps, lending' },
          { value: 'dao', label: 'DAO', description: 'Governance, hlasování' },
          { value: 'dapp', label: 'Obecná dApp', description: 'Custom smart contracts' },
        ],
      },
      {
        id: 'audit',
        question: 'Potřebujete bezpečnostní audit?',
        description: 'Pro produkční nasazení s reálnými financemi je audit nutný',
        type: 'single',
        options: [
          { value: 'full', label: 'Ano, kompletní audit', description: 'Profesionální firma (+80-150k)' },
          { value: 'basic', label: 'Základní review', description: 'Interní kontrola (+30-50k)' },
          { value: 'none', label: 'Ne, jen testnet', description: 'Pro prototyp/testování' },
        ],
      },
      {
        id: 'frontend',
        question: 'Potřebujete webovou aplikaci (dApp frontend)?',
        description: 'Uživatelské rozhraní pro interakci s kontrakty',
        type: 'single',
        options: [
          { value: 'full', label: 'Ano, kompletní dApp', description: 'Wallet connect, transakce, dashboard' },
          { value: 'simple', label: 'Jednoduchý interface', description: 'Základní interakce' },
          { value: 'none', label: 'Ne, pouze smart contracts', description: 'Interakce přes Etherscan apod.' },
        ],
      },
    ],
  },

  // Generic/other project questions
  generic: {
    marketInfo: {
      title: 'Webový projekt',
      description: 'Jednoduchý web/landing page začíná kolem 20-40k Kč. Komplexnější webová aplikace s backendem od 80k výše.',
      averageBudget: '40 000 – 150 000 Kč',
      averageTimeline: '4-8 týdnů',
    },
    questions: [
      {
        id: 'projectType',
        question: 'O jaký typ webu se jedná?',
        description: 'Pomůže nám lépe odhadnout rozsah',
        type: 'single',
        options: [
          { value: 'landing', label: 'Landing page', description: 'Jednorázová stránka, propagace' },
          { value: 'corporate', label: 'Firemní web', description: 'Více stránek, o nás, kontakt' },
          { value: 'webapp', label: 'Webová aplikace', description: 'Interaktivní funkce, uživatelé' },
          { value: 'portal', label: 'Portál / systém', description: 'Komplexní řešení' },
        ],
      },
      {
        id: 'pages',
        question: 'Kolik stránek/sekcí očekáváte?',
        description: 'Ovlivňuje rozsah designu a vývoje',
        type: 'single',
        options: [
          { value: 'small', label: '1-5 stránek', description: 'Malý web' },
          { value: 'medium', label: '5-15 stránek', description: 'Střední rozsah' },
          { value: 'large', label: '15+ stránek', description: 'Rozsáhlý web' },
        ],
      },
      {
        id: 'features',
        question: 'Jaké funkce potřebujete?',
        description: 'Vyberte vše, co se hodí',
        type: 'multi',
        options: [
          { value: 'cms', label: 'Editace obsahu', description: 'Sami měnit texty a obrázky' },
          { value: 'forms', label: 'Formuláře', description: 'Kontakt, poptávka' },
          { value: 'blog', label: 'Blog / aktuality', description: 'Pravidelný obsah' },
          { value: 'auth', label: 'Přihlašování', description: 'Uživatelské účty' },
          { value: 'booking', label: 'Rezervace', description: 'Kalendář, booking' },
          { value: 'multilang', label: 'Více jazyků', description: 'CZ + další jazyky' },
        ],
      },
      {
        id: 'designLevel',
        question: 'Jakou úroveň designu očekáváte?',
        description: 'Design je často největší část rozpočtu',
        type: 'single',
        options: [
          { value: 'template', label: 'Úprava šablony', description: 'Rychle a levně (10-25k)' },
          { value: 'custom', label: 'Design na míru', description: 'Vlastní vizuál (40-80k)' },
          { value: 'premium', label: 'Premium design', description: 'Unikátní, animace (80k+)' },
        ],
      },
    ],
  },
};

/**
 * Get quiz questions for a detected project type
 */
export function getQuestionsForType(projectType) {
  const typeQuestions = quizQuestions[projectType] || quizQuestions.generic;

  return {
    marketInfo: typeQuestions.marketInfo,
    questions: [
      ...quizQuestions.common,
      ...typeQuestions.questions,
    ],
  };
}

/**
 * Map project type key to Czech label
 */
export const projectTypeLabels = {
  ecommerce: 'E-shop',
  mobileApp: 'Mobilní aplikace',
  saas: 'SaaS platforma',
  marketing: 'Marketing',
  aiml: 'AI / Machine Learning',
  blockchain: 'Web3 / Blockchain',
  generic: 'Webový projekt',
};
