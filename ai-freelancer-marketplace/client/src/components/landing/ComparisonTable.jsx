import { motion } from 'framer-motion';
import { Check, X, Minus, Sparkles, Trophy } from 'lucide-react';

const features = [
  {
    name: 'AI analýza projektu',
    wortiq: true,
    upwork: false,
    fiverr: false,
  },
  {
    name: 'Automatické sestavení týmu',
    wortiq: true,
    upwork: false,
    fiverr: false,
  },
  {
    name: 'Rozklad na úkoly s rozpočtem',
    wortiq: true,
    upwork: false,
    fiverr: false,
  },
  {
    name: 'Zadání v přirozeném jazyce',
    wortiq: true,
    upwork: false,
    fiverr: false,
  },
  {
    name: 'Integrovaný projektový management',
    wortiq: true,
    upwork: 'partial',
    fiverr: false,
  },
  {
    name: 'Český trh & CZK',
    wortiq: true,
    upwork: 'partial',
    fiverr: 'partial',
  },
  {
    name: 'Čas do prvního výsledku',
    wortiq: '3 min',
    upwork: 'dny',
    fiverr: 'hodiny',
  },
  {
    name: 'Nutnost pohovorů',
    wortiq: 'Ne',
    upwork: 'Ano',
    fiverr: 'Ano',
  },
];

const ValueCell = ({ value }) => {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100">
        <Check className="h-4 w-4 text-green-600" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-50">
        <X className="h-4 w-4 text-red-400" />
      </span>
    );
  }
  if (value === 'partial') {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-50">
        <Minus className="h-4 w-4 text-amber-500" />
      </span>
    );
  }
  return <span className="text-sm font-medium text-slate-700">{value}</span>;
};

const ComparisonTable = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.05)_0%,_transparent_70%)]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 text-sm font-medium mb-4">
            <Trophy className="h-3.5 w-3.5" />
            Srovnání platforem
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Proč ne Upwork nebo Fiverr?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-lg">
            Tradiční platformy vám dají seznam lidí. My vám dáme hotový tým a plán.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-4 gap-0 border-b border-slate-200">
            <div className="p-5">
              <span className="text-sm font-medium text-slate-500">Funkce</span>
            </div>
            <div className="p-5 text-center bg-gradient-to-b from-blue-50 to-white border-x border-blue-100">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                Wortiq
              </div>
            </div>
            <div className="p-5 text-center">
              <span className="text-sm font-semibold text-slate-700">Upwork</span>
            </div>
            <div className="p-5 text-center">
              <span className="text-sm font-semibold text-slate-700">Fiverr</span>
            </div>
          </div>

          {/* Rows */}
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`grid grid-cols-4 gap-0 ${
                index < features.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <div className="p-4 pl-5 flex items-center">
                <span className="text-sm text-slate-700 font-medium">{feature.name}</span>
              </div>
              <div className="p-4 flex items-center justify-center bg-blue-50/30 border-x border-blue-50">
                <ValueCell value={feature.wortiq} />
              </div>
              <div className="p-4 flex items-center justify-center">
                <ValueCell value={feature.upwork} />
              </div>
              <div className="p-4 flex items-center justify-center">
                <ValueCell value={feature.fiverr} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
