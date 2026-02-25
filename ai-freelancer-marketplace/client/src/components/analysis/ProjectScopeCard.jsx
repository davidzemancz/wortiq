import { motion } from 'framer-motion';
import { Check, X, Zap, TrendingUp, Clock, Wallet, Target, Lightbulb } from 'lucide-react';

// Budget tier labels in Czech
const BUDGET_LABELS = {
  micro: { label: 'Do 30 000 Kč', scope: 'MVP verze' },
  small: { label: '30 – 80 000 Kč', scope: 'Základní verze' },
  medium: { label: '80 – 150 000 Kč', scope: 'Standardní řešení' },
  large: { label: '150 – 300 000 Kč', scope: 'Komplexní řešení' },
  enterprise: { label: '300 000+ Kč', scope: 'Enterprise řešení' },
};

const TIMELINE_LABELS = {
  asap: 'Co nejdříve',
  normal: '1-2 měsíce',
  relaxed: '3+ měsíce',
  flexible: 'Flexibilní',
};

// Features that could be included/excluded based on budget
const SCOPE_FEATURES = {
  ecommerce: {
    included: {
      micro: ['Základní katalog produktů', 'Jednoduchý košík', 'Responsivní design'],
      small: ['Katalog s kategoriemi', 'Platební brána', 'Základní SEO', 'Responsivní design'],
      medium: ['Pokročilý katalog', 'Více platebních metod', 'Napojení na dopravu', 'SEO optimalizace', 'Admin panel'],
      large: ['Kompletní e-shop', 'Všechny platební metody', 'Integrace dopravců', 'Pokročilé SEO', 'Marketing automatizace'],
      enterprise: ['Enterprise e-commerce', 'ERP integrace', 'Multi-jazyčnost', 'A/B testování', 'Personalizace'],
    },
    excluded: {
      micro: ['Platební brána', 'Napojení na dopravu', 'SEO optimalizace', 'Admin panel'],
      small: ['Pokročilé vyhledávání', 'Multi-jazyčnost', 'A/B testování'],
      medium: ['ERP integrace', 'Personalizace', 'Marketing automatizace'],
      large: ['ERP integrace', 'Pokročilá analytika'],
      enterprise: [],
    },
    upgrades: {
      micro: 'Platební brána, integrace dopravy, SEO',
      small: 'Pokročilé vyhledávání, více platebních metod',
      medium: 'Marketing automatizace, A/B testování',
      large: 'ERP integrace, personalizace',
    },
  },
  mobileApp: {
    included: {
      micro: ['Jedna platforma (iOS nebo Android)', 'Základní UI', '3-5 obrazovek'],
      small: ['Jedna platforma', 'Custom design', 'Offline podpora', 'Push notifikace'],
      medium: ['Obě platformy', 'Custom design', 'Backend API', 'Push notifikace', 'Analytics'],
      large: ['iOS + Android', 'Premium UX', 'Komplexní backend', 'Real-time funkce', 'App Store publikace'],
      enterprise: ['Enterprise mobilní řešení', 'MDM integrace', 'Pokročilá bezpečnost', 'CI/CD pipeline'],
    },
    excluded: {
      micro: ['Druhá platforma', 'Backend', 'Push notifikace', 'Offline režim'],
      small: ['Druhá platforma', 'Komplexní backend', 'In-app platby'],
      medium: ['Premium animace', 'Pokročilá bezpečnost'],
      large: ['MDM integrace', 'Enterprise funkce'],
      enterprise: [],
    },
    upgrades: {
      micro: 'Push notifikace, backend, druhá platforma',
      small: 'Obě platformy, komplexní backend',
      medium: 'Premium UX, pokročilé animace',
      large: 'Enterprise bezpečnost, CI/CD',
    },
  },
  saas: {
    included: {
      micro: ['Landing page', 'Základní dashboard', 'Uživatelské účty'],
      small: ['Dashboard', 'CRUD operace', 'Základní reporty', 'Email notifikace'],
      medium: ['Komplexní dashboard', 'Role a oprávnění', 'API', 'Billing integrace'],
      large: ['Multi-tenant architektura', 'Subscription billing', 'Pokročilé reporty', 'API dokumentace'],
      enterprise: ['Enterprise SaaS', 'SSO/SAML', 'Audit log', 'SLA monitoring', 'White-label'],
    },
    excluded: {
      micro: ['Billing', 'API', 'Role a oprávnění', 'Reporty'],
      small: ['Subscription billing', 'Multi-tenancy', 'Pokročilé API'],
      medium: ['White-label', 'SSO/SAML', 'Audit log'],
      large: ['White-label možnost', 'Enterprise SSO'],
      enterprise: [],
    },
    upgrades: {
      micro: 'Billing integrace, API, reporty',
      small: 'Subscription model, multi-tenancy',
      medium: 'SSO, audit log, white-label',
      large: 'Enterprise SSO, SLA monitoring',
    },
  },
  marketing: {
    included: {
      micro: ['Strategie', 'Základní grafiky', 'Social media šablony'],
      small: ['Strategie', 'Grafický balíček', 'Copywriting', 'Nastavení PPC'],
      medium: ['Komplexní strategie', 'Video obsah', 'PPC kampaně', 'Social media správa'],
      large: ['Integrovaná kampaň', 'Influencer marketing', 'PR aktivity', 'Pokročilá analytika'],
      enterprise: ['360° marketing', 'Brand refresh', 'Multi-channel kampaně', 'Marketing automatizace'],
    },
    excluded: {
      micro: ['Video produkce', 'PPC správa', 'Influencer marketing'],
      small: ['Video produkce', 'Influencer outreach', 'PR'],
      medium: ['Influencer kampaně', 'PR aktivity'],
      large: ['Brand refresh', 'Automatizace'],
      enterprise: [],
    },
    upgrades: {
      micro: 'Video obsah, PPC kampaně, správa sítí',
      small: 'Video produkce, influencer marketing',
      medium: 'PR aktivity, influencer kampaně',
      large: 'Marketing automatizace, brand refresh',
    },
  },
  aiml: {
    included: {
      micro: ['ChatGPT/Claude API integrace', 'Základní UI', 'Jednoduché workflow'],
      small: ['AI API integrace', 'Custom prompty', 'Základní dashboard', 'Uživatelské účty'],
      medium: ['Fine-tuning modelu', 'Data pipeline', 'API endpoint', 'Monitoring'],
      large: ['Vlastní ML model', 'Kompletní MLOps', 'A/B testování', 'Produkční nasazení'],
      enterprise: ['Enterprise AI', 'Škálovatelná infrastruktura', 'Real-time inference', 'Model versioning'],
    },
    excluded: {
      micro: ['Fine-tuning', 'Vlastní model', 'MLOps', 'Monitoring'],
      small: ['Vlastní ML model', 'MLOps pipeline', 'A/B testování'],
      medium: ['Enterprise škálování', 'Real-time inference'],
      large: ['Enterprise MLOps', 'Multi-model orchestrace'],
      enterprise: [],
    },
    upgrades: {
      micro: 'Fine-tuning, monitoring, dashboard',
      small: 'Vlastní model, MLOps, A/B testování',
      medium: 'Enterprise škálování, real-time',
      large: 'Multi-model orchestrace, auto-scaling',
    },
  },
  blockchain: {
    included: {
      micro: ['Jednoduchý smart contract', 'Testnet deployment', 'Základní dokumentace'],
      small: ['Smart contracts', 'Základní dApp UI', 'Wallet integrace', 'Testnet'],
      medium: ['Komplexní smart contracts', 'dApp frontend', 'Mainnet deployment', 'Základní audit'],
      large: ['Auditované smart contracts', 'Plnohodnotná dApp', 'Tokenomics', 'Community setup'],
      enterprise: ['Enterprise Web3', 'Kompletní audit', 'DAO governance', 'Cross-chain'],
    },
    excluded: {
      micro: ['dApp frontend', 'Security audit', 'Mainnet', 'Tokenomics'],
      small: ['Profesionální audit', 'Mainnet', 'Community management'],
      medium: ['Kompletní audit', 'DAO', 'Cross-chain'],
      large: ['Cross-chain', 'Enterprise governance'],
      enterprise: [],
    },
    upgrades: {
      micro: 'dApp frontend, wallet integrace, mainnet',
      small: 'Security audit, mainnet deployment',
      medium: 'Kompletní audit, DAO, tokenomics',
      large: 'Cross-chain, enterprise governance',
    },
  },
  generic: {
    included: {
      micro: ['Landing page', 'Responsivní design', 'Kontaktní formulář'],
      small: ['Vícestránkový web', 'CMS', 'Základní SEO', 'Responsivní design'],
      medium: ['Webová aplikace', 'Backend', 'Uživatelské účty', 'SEO optimalizace'],
      large: ['Komplexní web', 'Pokročilý backend', 'Integrace', 'Analytics'],
      enterprise: ['Enterprise řešení', 'Škálovatelná architektura', 'CI/CD', 'Monitoring'],
    },
    excluded: {
      micro: ['CMS', 'Backend', 'Uživatelské účty', 'SEO'],
      small: ['Komplexní backend', 'Integrace třetích stran'],
      medium: ['Enterprise funkce', 'Pokročilé integrace'],
      large: ['Enterprise architektura'],
      enterprise: [],
    },
    upgrades: {
      micro: 'CMS, více stránek, SEO optimalizace',
      small: 'Backend, uživatelské účty, integrace',
      medium: 'Pokročilé integrace, škálování',
      large: 'Enterprise architektura, monitoring',
    },
  },
};

export default function ProjectScopeCard({ quizContext, projectType }) {
  if (!quizContext) return null;

  const { budgetTier, timeline, answers } = quizContext;
  const budgetInfo = BUDGET_LABELS[budgetTier] || BUDGET_LABELS.medium;
  const timelineLabel = TIMELINE_LABELS[timeline] || 'Flexibilní';

  // Get scope features for this project type and budget
  const type = projectType || 'generic';
  const scopeData = SCOPE_FEATURES[type] || SCOPE_FEATURES.generic;
  const included = scopeData.included[budgetTier] || scopeData.included.medium;
  const excluded = scopeData.excluded[budgetTier] || [];
  const upgradeHint = scopeData.upgrades[budgetTier];

  return (
    <div className="space-y-6 mb-10">
      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl border border-blue-200 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-900">Váš projekt</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-3 border border-blue-100">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Wallet className="w-4 h-4" />
              <span className="text-xs font-medium">Rozpočet</span>
            </div>
            <p className="font-semibold text-slate-900">{budgetInfo.label}</p>
          </div>

          <div className="bg-white rounded-lg p-3 border border-violet-100">
            <div className="flex items-center gap-2 text-violet-600 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium">Rozsah</span>
            </div>
            <p className="font-semibold text-slate-900">{budgetInfo.scope}</p>
          </div>

          <div className="bg-white rounded-lg p-3 border border-cyan-100">
            <div className="flex items-center gap-2 text-cyan-600 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium">Časový rámec</span>
            </div>
            <p className="font-semibold text-slate-900">{timelineLabel}</p>
          </div>

          <div className="bg-white rounded-lg p-3 border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-medium">Design</span>
            </div>
            <p className="font-semibold text-slate-900">
              {answers?.designLevel === 'premium' ? 'Premium' :
               answers?.designLevel === 'template' || answers?.designLevel === 'basic' ? 'Základní' :
               'Na míru'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Scope Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Included Features */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-emerald-100 rounded-lg">
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="font-semibold text-slate-900">Zahrnuto v rozpočtu</h4>
          </div>
          <ul className="space-y-2">
            {included.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Excluded Features */}
        {excluded.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-100 rounded-lg">
                <X className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="font-semibold text-slate-900">Nad rámec rozpočtu</h4>
            </div>
            <ul className="space-y-2">
              {excluded.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <X className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  <span className="text-slate-400">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/* Upgrade Hint */}
      {upgradeHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">S vyšším rozpočtem získáte</h4>
              <p className="text-sm text-slate-600">{upgradeHint}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
