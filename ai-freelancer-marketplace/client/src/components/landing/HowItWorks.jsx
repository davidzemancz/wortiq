import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, LayoutDashboard, Rocket } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Popište projekt',
    description: 'Zadejte projekt v přirozeném jazyce, jako byste psali kolegovi. Česky, slovensky – jak chcete.',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-600',
    detail: 'NLP analýza v reálném čase',
  },
  {
    icon: Sparkles,
    title: 'AI analyzuje',
    description: 'Umělá inteligence rozloží projekt na úkoly, stanoví rozpočet a navrhne optimální tým.',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
    textColor: 'text-violet-600',
    detail: 'Claude AI + vlastní algoritmy',
  },
  {
    icon: LayoutDashboard,
    title: 'Řiďte z dashboardu',
    description: 'Kanban board, real-time chat, automatické reporty a milníky na jednom místě.',
    color: 'cyan',
    gradient: 'from-cyan-500 to-teal-600',
    bgLight: 'bg-cyan-50',
    textColor: 'text-cyan-600',
    detail: 'Vše v jednom rozhraní',
  },
  {
    icon: Rocket,
    title: 'Doručte výsledky',
    description: 'Sledujte průběh, komunikujte s týmem a přijměte hotový výstup.',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-600',
    detail: 'Průměrně o 40 % rychleji',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-100/40 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Jak to funguje?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-lg">
            Čtyři jednoduché kroky od nápadu k hotovému projektu.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] z-0" aria-hidden="true">
                    <motion.div
                      className="border-t-2 border-dashed border-slate-300"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>
                )}

                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-full bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 text-center flex flex-col"
                >
                  {/* Step number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} mb-6 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed flex-1">{step.description}</p>

                  {/* Tech detail badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full ${step.bgLight} ${step.textColor} text-xs font-medium`}>
                    {step.detail}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
