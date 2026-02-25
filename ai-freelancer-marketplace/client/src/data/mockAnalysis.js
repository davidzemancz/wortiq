import { projectTemplates, detectProjectType } from './projectTemplates';

/**
 * Budget caps in CZK based on quiz answer
 */
const BUDGET_CAPS = {
  micro: 30000,
  small: 80000,
  medium: 150000,
  large: 300000,
  enterprise: 600000,
};

/**
 * Timeline multipliers based on quiz answer
 */
const TIMELINE_MULTIPLIERS = {
  asap: 0.6,      // Faster = fewer features, more parallel work
  normal: 1.0,
  relaxed: 1.2,   // More time = more polish
  flexible: 1.0,
};

/**
 * Design level cost multipliers
 */
const DESIGN_MULTIPLIERS = {
  template: 0.4,
  basic: 0.5,
  mvp: 0.5,
  custom: 1.0,
  polished: 1.0,
  premium: 1.5,
};

/**
 * Scale factor based on budget tier
 */
function getScaleFactor(budgetCap) {
  if (budgetCap <= 30000) return 0.25;   // micro - MVP only
  if (budgetCap <= 80000) return 0.5;    // small - basic features
  if (budgetCap <= 150000) return 0.75;  // medium - standard
  if (budgetCap <= 300000) return 1.0;   // large - full featured
  return 1.2;                             // enterprise - premium
}

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
 * Scale tasks and team based on quiz answers
 */
function scaleProjectToQuiz(template, typeKey, quizAnswers) {
  const budgetKey = quizAnswers?.budget || 'medium';
  const timelineKey = quizAnswers?.timeline || 'normal';
  const designKey = quizAnswers?.designLevel || 'custom';

  const budgetCap = BUDGET_CAPS[budgetKey] || 150000;
  const scaleFactor = getScaleFactor(budgetCap);
  const timelineMultiplier = TIMELINE_MULTIPLIERS[timelineKey] || 1.0;
  const designMultiplier = DESIGN_MULTIPLIERS[designKey] || 1.0;

  console.log('📊 Scaling with:', { budgetCap, scaleFactor, timelineMultiplier, designMultiplier });

  // Scale tasks - prioritize high priority, reduce hours for lower budgets
  let scaledTasks = template.tasks.map((task, index) => {
    const isDesignTask = task.category === 'design';
    const taskMultiplier = isDesignTask ? designMultiplier : 1.0;

    // Scale hours based on budget and design level
    let scaledHours = Math.round(task.estimatedHours * scaleFactor * taskMultiplier);

    // Minimum hours to make sense
    scaledHours = Math.max(scaledHours, 8);

    return {
      ...task,
      id: `task-${index + 1}`,
      estimatedHours: scaledHours,
    };
  });

  // For very small budgets, remove lower priority tasks
  if (scaleFactor <= 0.5) {
    scaledTasks = scaledTasks.filter(task => task.priority === 'high' || task.category === 'design');
  }

  // Scale team hours based on remaining tasks
  const taskHoursByCategory = {};
  scaledTasks.forEach(task => {
    taskHoursByCategory[task.category] = (taskHoursByCategory[task.category] || 0) + task.estimatedHours;
  });

  let scaledTeam = template.team.map((member, index) => {
    // Calculate hours from tasks this member would work on
    const memberTasks = scaledTasks.filter(t => member.taskIds?.includes(t.id) ||
      member.requiredSkills?.some(skill => t.skills?.includes(skill)));

    let totalHours = memberTasks.reduce((sum, t) => sum + t.estimatedHours, 0);

    // Fallback: scale original hours
    if (totalHours === 0) {
      totalHours = Math.round(member.estimatedHours * scaleFactor);
    }

    // Adjust hourly rate based on seniority for smaller budgets
    let rateMultiplier = 1.0;
    if (scaleFactor <= 0.5) {
      // Use more junior rates for smaller budgets
      rateMultiplier = 0.8;
    }

    return {
      ...member,
      estimatedHours: Math.max(totalHours, 8),
      estimatedHourlyRate: {
        min: Math.round(member.estimatedHourlyRate.min * rateMultiplier),
        max: Math.round(member.estimatedHourlyRate.max * rateMultiplier),
        currency: 'CZK',
      },
    };
  });

  // For very small budgets, combine roles
  if (scaleFactor <= 0.25) {
    // Keep only essential roles
    scaledTeam = scaledTeam.filter((_, index) => index < 2);
  } else if (scaleFactor <= 0.5) {
    // Remove specialty roles
    scaledTeam = scaledTeam.filter((_, index) => index < 3);
  }

  // Calculate budget and ensure it fits within cap
  let budget = calculateBudget(scaledTeam, scaledTasks, template.complexity);

  // If over budget, scale down further
  let iterations = 0;
  while (budget.total > budgetCap && iterations < 5) {
    iterations++;
    const overageRatio = budgetCap / budget.total;

    // Scale down hours across the board
    scaledTeam = scaledTeam.map(member => ({
      ...member,
      estimatedHours: Math.max(Math.round(member.estimatedHours * overageRatio), 8),
    }));

    scaledTasks = scaledTasks.map(task => ({
      ...task,
      estimatedHours: Math.max(Math.round(task.estimatedHours * overageRatio), 4),
    }));

    budget = calculateBudget(scaledTeam, scaledTasks, template.complexity);
  }

  // Adjust timeline based on team size and hours
  const totalHours = scaledTeam.reduce((sum, m) => sum + m.estimatedHours, 0);
  const hoursPerWeek = scaledTeam.length * 30; // ~30 hours per person per week
  let weeks = Math.ceil(totalHours / hoursPerWeek);
  weeks = Math.round(weeks * timelineMultiplier);
  weeks = Math.max(weeks, 2); // Minimum 2 weeks

  // Scale milestones
  const scaledMilestones = template.milestones
    .filter((_, index) => index < Math.ceil(template.milestones.length * scaleFactor) || index === 0)
    .map((milestone, index) => ({
      ...milestone,
      weekNumber: Math.min(Math.round(milestone.weekNumber * (weeks / template.weeks)), weeks),
    }));

  // Generate context-aware recommendations
  const recommendations = generateScaledRecommendations(
    budgetKey,
    scaleFactor,
    template,
    quizAnswers,
    typeKey
  );

  return {
    tasks: scaledTasks,
    team: scaledTeam,
    budget,
    weeks,
    milestones: scaledMilestones,
    recommendations,
    complexity: scaleFactor <= 0.5 ? 'low' : (scaleFactor >= 1.0 ? template.complexity : 'medium'),
  };
}

/**
 * Generate recommendations based on quiz answers and scaling
 */
function generateScaledRecommendations(budgetKey, scaleFactor, template, quizAnswers, typeKey) {
  const recommendations = [];

  // Budget-based recommendations
  if (scaleFactor <= 0.25) {
    recommendations.push('S tímto rozpočtem doporučujeme začít s MVP verzí a postupně rozšiřovat funkcionalitu');
    recommendations.push('Zvažte použití hotových šablon a komponent pro urychlení vývoje');
  } else if (scaleFactor <= 0.5) {
    recommendations.push('Rozpočet pokrývá základní funkcionalitu. Prémiové funkce doporučujeme přidat v další fázi');
  } else if (scaleFactor >= 1.0) {
    recommendations.push('Rozpočet umožňuje komplexní řešení s důrazem na kvalitu a uživatelský zážitek');
  }

  // Timeline-based recommendations
  if (quizAnswers?.timeline === 'asap') {
    recommendations.push('Pro rychlé dodání doporučujeme paralelní práci více členů týmu');
  } else if (quizAnswers?.timeline === 'relaxed') {
    recommendations.push('Delší časový rámec umožní důkladnější testování a iterace designu');
  }

  // Type-specific recommendations based on quiz answers
  if (typeKey === 'ecommerce') {
    if (quizAnswers?.payments?.length > 0) {
      recommendations.push(`Integrace platebních bran (${quizAnswers.payments.join(', ')}) je zahrnuta v rozpočtu`);
    }
    if (quizAnswers?.productCount === 'large') {
      recommendations.push('Pro velký katalog doporučujeme implementovat pokročilé vyhledávání a filtry');
    }
  } else if (typeKey === 'mobileApp') {
    if (quizAnswers?.platforms === 'both') {
      recommendations.push('Cross-platform vývoj (iOS + Android) je cenově efektivnější než nativní vývoj');
    }
    if (quizAnswers?.backend === 'complex') {
      recommendations.push('Komplexní backend vyžaduje důkladnou API dokumentaci pro budoucí rozšíření');
    }
  } else if (typeKey === 'marketing') {
    if (quizAnswers?.adBudget && quizAnswers.adBudget !== 'none') {
      recommendations.push('Media spend (PPC rozpočet) není zahrnut v této kalkulaci – počítejte s ním zvlášť');
    }
  }

  // Add some from template if we have space
  const remaining = 5 - recommendations.length;
  if (remaining > 0) {
    recommendations.push(...template.recommendations.slice(0, remaining));
  }

  return recommendations.slice(0, 5);
}

/**
 * Generate summary based on quiz answers
 */
function generateScaledSummary(typeKey, quizAnswers, scaleFactor) {
  const budgetDescriptions = {
    micro: 'MVP verzi',
    small: 'základní verzi',
    medium: 'standardní řešení',
    large: 'komplexní řešení',
    enterprise: 'enterprise řešení',
  };

  const budgetKey = quizAnswers?.budget || 'medium';
  const scope = budgetDescriptions[budgetKey] || 'řešení';

  const typeDescriptions = {
    ecommerce: `Na základě vašich požadavků navrhuji ${scope} e-shopu`,
    mobileApp: `Navrhuji ${scope} mobilní aplikace`,
    saas: `Projekt zahrnuje ${scope} SaaS platformy`,
    marketing: `Připravili jsme ${scope} marketingové kampaně`,
    aiml: `Navrhuji ${scope} AI/ML integrace`,
    blockchain: `Projekt pokrývá ${scope} Web3 aplikace`,
  };

  let summary = typeDescriptions[typeKey] || `Navrhuji ${scope} na míru`;

  // Add context based on quiz answers
  if (scaleFactor <= 0.5) {
    summary += '. Důraz je kladen na klíčové funkce s možností rozšíření v budoucnu.';
  } else if (scaleFactor >= 1.0) {
    summary += '. Zahrnuje kompletní funkcionalitu včetně pokročilých funkcí a optimalizace.';
  } else {
    summary += '. Vyvážený poměr funkcí a rozpočtu pro solidní základ projektu.';
  }

  return summary;
}

/**
 * Main mock analysis generator.
 * Detects project type from description and returns appropriate template-based analysis.
 * @param {string} description - The project description
 * @param {object} quizAnswers - Answers from the requirements quiz
 */
export const generateMockAnalysis = (description, quizAnswers = null) => {
  console.log('📊 Generating analysis with quiz answers:', quizAnswers);

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

  // If we have quiz answers, scale the project accordingly
  if (quizAnswers) {
    const scaled = scaleProjectToQuiz(template, typeKey, quizAnswers);
    const scaleFactor = getScaleFactor(BUDGET_CAPS[quizAnswers.budget] || 150000);
    const projectSummary = generateScaledSummary(typeKey, quizAnswers, scaleFactor);

    return {
      projectName,
      projectSummary,
      complexity: scaled.complexity,
      estimatedDuration: {
        weeks: scaled.weeks,
        description: `Přibližně ${scaled.weeks} týdnů s ${scaled.team.length}členným týmem`,
      },
      tasks: scaled.tasks,
      suggestedTeam: scaled.team,
      budget: scaled.budget,
      milestones: scaled.milestones,
      risks: template.risks.slice(0, 3).map((r) => ({ ...r })),
      recommendations: scaled.recommendations,
      // Include quiz context for display
      quizContext: {
        budgetTier: quizAnswers.budget,
        timeline: quizAnswers.timeline,
        answers: quizAnswers,
      },
    };
  }

  // Fallback to original behavior without quiz
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
