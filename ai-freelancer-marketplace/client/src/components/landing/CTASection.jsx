import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Clock, CheckCircle2 } from 'lucide-react';
import { useMemo } from 'react';
import Button from '../ui/Button';

const generateParticles = (count) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: (i * 41 + 17) % 100,
      y: (i * 59 + 11) % 100,
      size: 2 + (i % 3),
      duration: 4 + (i % 5),
      delay: (i * 0.4) % 4,
    });
  }
  return particles;
};

const benefits = [
  { icon: Zap, text: 'Výsledky do 3 minut' },
  { icon: Clock, text: 'Žádné čekání na nabídky' },
  { icon: CheckCircle2, text: 'Ověření freelanceři' },
];

const CTASection = () => {
  const particles = useMemo(() => generateParticles(15), []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Clean solid background */}
          <div className="absolute inset-0 bg-blue-600" />

          <div className="relative z-10 p-10 md:p-20 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-sm font-medium mb-8"
            >
              <Sparkles className="h-4 w-4" />
              Začněte zdarma – žádná kreditní karta
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Připraveni na budoucnost{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                freelancingu?
              </span>
            </h2>
            <p className="text-blue-100/90 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
              Popište svůj první projekt a nechte AI sestavit ideální tým freelancerů.
              Za méně než 3 minuty budete mít plán, rozpočet i tým.
            </p>

            {/* Benefits row */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.text} className="flex items-center gap-2 text-white/80 text-sm">
                    <Icon className="h-4 w-4 text-cyan-300" />
                    <span>{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            <Link to="/new-project">
              <Button
                variant="secondary"
                size="lg"
                className="!bg-white !text-blue-700 !border-white hover:!bg-blue-50 hover:!text-blue-800 shadow-lg hover:shadow-2xl !px-12 !py-5 !text-lg group"
              >
                Začít první projekt
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <p className="text-white/40 text-xs mt-6">
              Žádné závazky. Zrušte kdykoliv.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
