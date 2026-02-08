import { motion } from 'framer-motion';
import {
  Brain, Zap, Shield, Clock,
  TrendingUp, Globe, MessageCircle, BarChart3
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI orchestrace',
    description: 'Umělá inteligence analyzuje zadání a navrhne optimální rozdělení práce.',
    gradient: 'from-blue-500 to-blue-600',
    bgLight: 'bg-blue-50',
  },
  {
    icon: Zap,
    title: 'Bleskový start',
    description: 'Od popisu projektu k hotovému týmu za méně než 3 minuty.',
    gradient: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50',
  },
  {
    icon: Shield,
    title: 'Ověření freelanceři',
    description: 'Každý freelancer prochází verifikací portfolia a referencí.',
    gradient: 'from-green-500 to-emerald-600',
    bgLight: 'bg-green-50',
  },
  {
    icon: Clock,
    title: 'Reálné odhady',
    description: 'AI stanoví rozpočet a harmonogram na základě skutečných dat z trhu.',
    gradient: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
  },
  {
    icon: TrendingUp,
    title: 'Optimalizace nákladů',
    description: 'Chytré přiřazení úkolů minimalizuje náklady při zachování kvality.',
    gradient: 'from-cyan-500 to-teal-600',
    bgLight: 'bg-cyan-50',
  },
  {
    icon: Globe,
    title: 'Český trh',
    description: 'Lokalizováno pro ČR – ceny v CZK, čeští freelanceři, česká podpora.',
    gradient: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
  },
  {
    icon: MessageCircle,
    title: 'Integrovaný chat',
    description: 'Komunikace s celým týmem na jednom místě, bez přepínání mezi nástroji.',
    gradient: 'from-indigo-500 to-blue-600',
    bgLight: 'bg-indigo-50',
  },
  {
    icon: BarChart3,
    title: 'Automatické reporty',
    description: 'Přehled o postupu projektu v reálném čase s vizualizacemi.',
    gradient: 'from-slate-600 to-slate-700',
    bgLight: 'bg-slate-50',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const FeaturesHighlight = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 text-cyan-700 text-sm font-medium mb-4">
            <Zap className="h-3.5 w-3.5" />
            Klíčové výhody
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Všechno, co potřebujete. Nic navíc.
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-lg">
            Platforma, která řeší celý životní cyklus projektu od zadání po dodání.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-xl hover:border-slate-300 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bgLight} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`bg-gradient-to-br ${feature.gradient} rounded-lg p-2`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>

                {/* Hover gradient accent */}
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesHighlight;
