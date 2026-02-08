import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Sparkles, LayoutDashboard, Users,
  ArrowRight, CheckCircle2, Brain, Zap
} from 'lucide-react';

const TypewriterText = ({ text }) => {
  return (
    <motion.span
      className="text-sm text-slate-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.02, duration: 0 }}
        >
          {char}
        </motion.span>
      ))}
      <span className="animate-pulse text-blue-500">|</span>
    </motion.span>
  );
};

const showcaseSteps = [
  {
    id: 'input',
    label: 'Zadání projektu',
    icon: MessageSquare,
    color: 'blue',
    title: 'Popíšete projekt přirozeným jazykem',
    description: 'Žádné formuláře, žádné kategorie. Prostě napíšete, co potřebujete – jako byste psali kolegovi.',
    mockUI: (
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-slate-400 ml-2">Nový projekt</span>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <div className="text-sm font-medium text-slate-700 mb-2">Popis projektu</div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <TypewriterText text='Potřebuji redesign e-shopu s kosmetikou. Nový moderní design, mobilní responsivita, napojení na Shoptet API a SEO optimalizace...' />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">Web Design</div>
            <div className="px-3 py-1.5 bg-violet-50 text-violet-700 rounded-full text-xs font-medium">E-commerce</div>
            <div className="px-3 py-1.5 bg-cyan-50 text-cyan-700 rounded-full text-xs font-medium">SEO</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'analysis',
    label: 'AI analýza',
    icon: Brain,
    color: 'violet',
    title: 'AI rozloží projekt na úkoly a najde tým',
    description: 'Umělá inteligence analyzuje zadání, vytvoří strukturu projektu, stanoví rozpočet a najde ideální freelancery.',
    mockUI: (
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-slate-400 ml-2">Analýza projektu</span>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">5 úkolů identifikováno</div>
              <div className="text-xs text-slate-500">Odhadovaný čas: 6–8 týdnů</div>
            </div>
          </div>
          {['UX/UI Design', 'Frontend vývoj', 'Shoptet integrace', 'SEO optimalizace', 'Testování'].map((task, i) => (
            <motion.div
              key={task}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
            >
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-sm text-slate-700">{task}</span>
              <span className="ml-auto text-xs text-slate-400">{[2, 3, 1, 1, 1][i]} týd.</span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'team',
    label: 'Tým & Dashboard',
    icon: LayoutDashboard,
    color: 'cyan',
    title: 'Řídíte projekt z jednoho místa',
    description: 'Kanban board, real-time chat, automatické reporty a sledování průběhu. Vše na jednom místě.',
    mockUI: (
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-slate-400 ml-2">Dashboard projektu</span>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'To Do', count: 2, color: 'bg-slate-100' },
              { label: 'In Progress', count: 2, color: 'bg-blue-50' },
              { label: 'Done', count: 1, color: 'bg-green-50' },
            ].map((col) => (
              <div key={col.label} className={`${col.color} rounded-lg p-3`}>
                <div className="text-xs font-semibold text-slate-700 mb-2">{col.label} ({col.count})</div>
                {Array.from({ length: col.count }).map((_, i) => (
                  <div key={i} className="bg-white rounded-md p-2 mb-2 shadow-sm border border-slate-100">
                    <div className="h-2 bg-slate-200 rounded w-3/4 mb-1.5" />
                    <div className="h-2 bg-slate-100 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-xs text-blue-700 font-medium">3 freelanceři přiřazeni</span>
            <div className="ml-auto flex -space-x-2">
              {['bg-blue-500', 'bg-violet-500', 'bg-cyan-500'].map((bg, i) => (
                <div key={i} className={`w-6 h-6 rounded-full ${bg} border-2 border-white`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const ProductShowcase = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-3xl opacity-50" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
            <Zap className="h-3.5 w-3.5" />
            Jak to funguje v praxi
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Od popisu k hotovému projektu
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-lg">
            Podívejte se, jak jednoduše zvládnete celý projekt od A do Z.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Steps navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {showcaseSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              const colorMap = {
                blue: { bg: 'bg-blue-100', text: 'text-blue-600', activeBg: 'bg-blue-600', ring: 'ring-blue-200' },
                violet: { bg: 'bg-violet-100', text: 'text-violet-600', activeBg: 'bg-violet-600', ring: 'ring-violet-200' },
                cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', activeBg: 'bg-cyan-600', ring: 'ring-cyan-200' },
              };
              const colors = colorMap[step.color];

              return (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-5 rounded-xl transition-all duration-300 border-2 ${
                    isActive
                      ? `border-slate-200 bg-white shadow-lg ring-4 ${colors.ring}/30`
                      : 'border-transparent hover:bg-slate-50'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      isActive ? `${colors.activeBg} text-white` : `${colors.bg} ${colors.text}`
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Krok {index + 1}</span>
                      </div>
                      <h3 className={`font-bold text-lg mb-1 transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                        {step.title}
                      </h3>
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-slate-500 text-sm"
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <ArrowRight className={`h-5 w-5 mt-1 flex-shrink-0 transition-all ${
                      isActive ? 'text-blue-600 translate-x-1' : 'text-slate-300'
                    }`} />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Mock UI Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 via-violet-50 to-cyan-50 rounded-2xl blur-xl opacity-60" />
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {showcaseSteps[activeStep].mockUI}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
