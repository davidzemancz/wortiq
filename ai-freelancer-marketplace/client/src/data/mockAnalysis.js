import { projectTemplates, detectProjectType } from './projectTemplates';

/**
 * Generate a smart project name from description and detected type.
 */
function generateProjectName(description, template, typeKey) {
  const desc = description.toLowerCase();

  // Try to extract a meaningful project name from the description
  const namePatterns = [
    /(?:chci|potřebuji|chceme)\s+(?:vytvořit|udělat|postavit|vyvinout|navrhnout)\s+(.{10,60}?)(?:\.|,|$)/i,
    /(?:projekt|aplikace|web|systém|platforma)\s+(?:pro|na)\s+(.{5,40}?)(?:\.|,|$)/i,
  ];

  for (const pattern of namePatterns) {
    const match = description.match(pattern);
    if (match) {
      const extracted = match[1].trim();
      if (extracted.length > 5 && extracted.length < 60) {
        // Capitalize first letter
        return extracted.charAt(0).toUpperCase() + extracted.slice(1);
      }
    }
  }

  // Fallback: use template prefix + first meaningful phrase
  const prefix = template?.namePrefix || 'Projekt';

  // Extract first meaningful subject from description
  const subjectPatterns = [
    /(?:e-shop|eshop)\s+(?:s|na|pro)\s+(\S+(?:\s+\S+){0,2})/i,
    /(?:aplikac\S*|app\S*)\s+(?:pro|na)\s+(\S+(?:\s+\S+){0,2})/i,
    /(?:web\S*)\s+(?:pro|na)\s+(\S+(?:\s+\S+){0,2})/i,
    /(?:kampaň\S*)\s+(?:pro|na)\s+(\S+(?:\s+\S+){0,2})/i,
  ];

  for (const pattern of subjectPatterns) {
    const match = description.match(pattern);
    if (match) {
      return `${prefix}: ${match[1].trim()}`;
    }
  }

  // Final fallback
  const typeNames = {
    ecommerce: 'E-commerce řešení',
    mobileApp: 'Mobilní aplikace',
    aiml: 'AI/ML řešení',
    saas: 'SaaS platforma',
    marketing: 'Marketingová kampaň',
    blockchain: 'Web3 projekt',
  };
  return typeNames[typeKey] || `${prefix} na míru`;
}

/**
 * Generate a smart summary that references the user's actual description.
 */
function generateProjectSummary(description, typeKey) {
  const shortDesc = description.length > 120 ? description.substring(0, 120) + '...' : description;

  const summaries = {
    ecommerce: `Na základě vaší specifikace navrhuji kompletní e-commerce řešení s důrazem na konverzní optimalizaci, bezpečné platby a spolehlivou logistiku. Projekt pokrývá vše od UX návrhu přes vývoj až po SEO a produktový obsah.`,
    mobileApp: `Analyzoval jsem požadavky a navrhuji cross-platform mobilní aplikaci s nativním uživatelským zážitkem. Projekt zahrnuje UX výzkum, design pro obě platformy, vývoj, testování na reálných zařízeních a publikaci do App Store a Google Play.`,
    aiml: `Na základě popisu navrhuji AI/ML řešení s kompletním data pipeline, od sběru a přípravy dat přes trénování modelu až po produkční API s monitoringem. Klíčový je iterativní přístup s důrazem na kvalitu dat.`,
    saas: `Projekt vyžaduje robustní SaaS platformu s multi-tenant architekturou, subscription billing a profesionálním UX. Navrhuji iterativní vývoj s důrazem na škálovatelnost a bezpečnost od prvního dne.`,
    marketing: `Navrhuji integrovanou marketingovou kampaň pokrývající strategii, vizuální materiály, content tvorbu, PPC reklamy a správu sociálních sítí. Důraz na měřitelné výsledky a ROI.`,
    blockchain: `Projekt vyžaduje komplexní Web3 řešení zahrnující smart contract vývoj, bezpečnostní audit, dApp frontend a community building. Bezpečnost a compliance jsou nejvyšší prioritou.`,
  };

  return summaries[typeKey] || `Projekt zahrnuje komplexní řešení podle vašeho zadání: "${shortDesc}" Navrhuji optimální rozdělení práce pro efektivní realizaci.`;
}

/**
 * Calculate budget from team and adjust for project complexity.
 */
function calculateBudget(team, tasks, complexity) {
  const categories = {};

  team.forEach((member) => {
    const midRate = (member.estimatedHourlyRate.min + member.estimatedHourlyRate.max) / 2;
    const cost = Math.round(midRate * member.estimatedHours);
    const category = member.role;
    categories[category] = (categories[category] || 0) + cost;
  });

  const subtotal = Object.values(categories).reduce((sum, v) => sum + v, 0);

  // Build breakdown
  const breakdown = Object.entries(categories).map(([category, amount]) => ({
    category,
    amount,
    percentage: Math.round((amount / subtotal) * 100),
  }));

  // Sort by amount descending
  breakdown.sort((a, b) => b.amount - a.amount);

  const platformFeeRate = 0.08;
  const platformFee = Math.round(subtotal * platformFeeRate);

  return {
    breakdown,
    subtotal,
    platformFee,
    total: subtotal + platformFee,
    currency: 'CZK',
    note: complexity === 'high'
      ? 'Odhad na základě seniorních sazeb českého trhu. Obsahuje komplexní řešení vyžadující zkušený tým.'
      : 'Odhad na základě průměrných sazeb na českém trhu. Cena se může lišit dle konkrétních požadavků.',
  };
}

/**
 * Generate a fallback (generic) analysis for descriptions that don't match any template.
 */
function generateGenericAnalysis(description) {
  const tasks = [
    {
      id: 'task-1',
      title: 'Analýza požadavků a UX návrh',
      description: 'Detailní rozbor zadání, návrh informační architektury, wireframy klíčových obrazovek a interaktivní prototyp pro validaci s klientem.',
      skills: ['UX Research', 'UI/UX Design', 'Figma'],
      difficulty: 'medium',
      estimatedHours: 32,
      priority: 'high',
      dependencies: [],
      category: 'design',
      deliverables: ['Wireframy', 'Prototyp', 'Specifikace požadavků'],
    },
    {
      id: 'task-2',
      title: 'Vizuální design',
      description: 'Kompletní vizuální návrh včetně design systému, responsivních variant a interaktivního prototypu v Figma.',
      skills: ['UI/UX Design', 'Figma', 'Design Systems'],
      difficulty: 'medium',
      estimatedHours: 40,
      priority: 'high',
      dependencies: ['task-1'],
      category: 'design',
      deliverables: ['High-fidelity mockupy', 'Design systém', 'Klikací prototyp'],
    },
    {
      id: 'task-3',
      title: 'Frontend vývoj',
      description: 'Implementace uživatelského rozhraní podle schváleného designu. Responsivní layout, animace a napojení na API.',
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
      difficulty: 'medium',
      estimatedHours: 80,
      priority: 'high',
      dependencies: ['task-2'],
      category: 'development',
      deliverables: ['Funkční frontend', 'Responsivní layout', 'API integrace'],
    },
    {
      id: 'task-4',
      title: 'Backend a databáze',
      description: 'REST API, databázový model, autentifikace, business logika a integrace s externími službami.',
      skills: ['Node.js', 'PostgreSQL', 'REST API', 'Docker'],
      difficulty: 'hard',
      estimatedHours: 64,
      priority: 'high',
      dependencies: [],
      category: 'development',
      deliverables: ['REST API', 'Databázové schéma', 'Auth systém'],
    },
    {
      id: 'task-5',
      title: 'Testování a nasazení',
      description: 'End-to-end testování, performance optimalizace, SEO audit a deployment na produkční prostředí.',
      skills: ['Testing', 'DevOps', 'SEO'],
      difficulty: 'medium',
      estimatedHours: 24,
      priority: 'medium',
      dependencies: ['task-3', 'task-4'],
      category: 'development',
      deliverables: ['Test reporty', 'Performance audit', 'Production deployment'],
    },
  ];

  const team = [
    { role: 'UX/UI Designér', taskIds: ['task-1', 'task-2'], requiredSkills: ['UI/UX Design', 'Figma', 'UX Research'], seniorityLevel: 'mid', estimatedHourlyRate: { min: 800, max: 1100, currency: 'CZK' }, estimatedHours: 72 },
    { role: 'Frontend Developer', taskIds: ['task-3'], requiredSkills: ['React', 'TypeScript', 'Tailwind CSS'], seniorityLevel: 'mid', estimatedHourlyRate: { min: 900, max: 1200, currency: 'CZK' }, estimatedHours: 80 },
    { role: 'Backend Developer', taskIds: ['task-4'], requiredSkills: ['Node.js', 'PostgreSQL', 'REST API'], seniorityLevel: 'senior', estimatedHourlyRate: { min: 1000, max: 1400, currency: 'CZK' }, estimatedHours: 64 },
    { role: 'QA & DevOps', taskIds: ['task-5'], requiredSkills: ['Testing', 'DevOps'], seniorityLevel: 'mid', estimatedHourlyRate: { min: 800, max: 1200, currency: 'CZK' }, estimatedHours: 24 },
  ];

  const milestones = [
    { title: 'Design schválen', weekNumber: 2, taskIds: ['task-1', 'task-2'], description: 'Wireframy a vizuální design odsouhlaseny' },
    { title: 'MVP ready', weekNumber: 4, taskIds: ['task-3', 'task-4'], description: 'Funkční minimální produkt pro testování' },
    { title: 'Launch', weekNumber: 6, taskIds: ['task-5'], description: 'Otestovaný produkt nasazený na produkci' },
  ];

  const shortDesc = description.length > 100 ? description.substring(0, 100) + '...' : description;

  return {
    projectName: 'Webový projekt na míru',
    projectSummary: `Na základě vašeho zadání navrhuji projekt pokrývající kompletní vývoj od UX návrhu přes implementaci až po nasazení. Řešení je optimalizované pro český trh.`,
    complexity: 'medium',
    estimatedDuration: {
      weeks: 6,
      description: 'Přibližně 6 týdnů s 4členným týmem',
    },
    tasks,
    suggestedTeam: team,
    budget: calculateBudget(team, tasks, 'medium'),
    milestones,
    risks: [
      { description: 'Změny v požadavcích během vývoje mohou prodloužit harmonogram', mitigation: 'Jasná specifikace v discovery fázi a pravidelné review milníků', severity: 'medium' },
      { description: 'Integrace s externími systémy může přinést neočekávanou komplexitu', mitigation: 'Prototypování integrací v rané fázi projektu', severity: 'low' },
    ],
    recommendations: [
      'Doporučujeme začít discovery fází pro přesné zmapování požadavků',
      'Pravidelné týdenní standupy s celým týmem pomohou udržet projekt na správné cestě',
      'Zvažte MVP přístup – spusťte základní verzi a iterujte podle feedbacku',
    ],
  };
}

/**
 * Main mock analysis generator.
 * Detects project type from description and returns appropriate template-based analysis.
 * @param {string} description - The project description
 * @param {object} quizAnswers - Answers from the requirements quiz (optional, for Phase 2)
 */
export const generateMockAnalysis = (description, quizAnswers = null) => {
  // Log quiz answers for debugging (Phase 2 will use these to scale the analysis)
  if (quizAnswers) {
    console.log('📊 Quiz answers received:', quizAnswers);
  }
  if (!description || description.trim().length < 10) {
    return generateGenericAnalysis(description || '');
  }

  const typeKey = detectProjectType(description);

  // No matching template – use improved generic
  if (!typeKey) {
    return generateGenericAnalysis(description);
  }

  const template = projectTemplates[typeKey];
  const projectName = generateProjectName(description, template, typeKey);
  const projectSummary = generateProjectSummary(description, typeKey);

  return {
    projectName,
    projectSummary,
    complexity: template.complexity,
    estimatedDuration: {
      weeks: template.weeks,
      description: `Přibližně ${template.weeks} týdnů s ${template.team.length}členným týmem`,
    },
    tasks: template.tasks.map((t) => ({ ...t })),
    suggestedTeam: template.team.map((m) => ({ ...m })),
    budget: calculateBudget(template.team, template.tasks, template.complexity),
    milestones: template.milestones.map((m) => ({ ...m })),
    risks: template.risks.map((r) => ({ ...r })),
    recommendations: [...template.recommendations],
  };
};
