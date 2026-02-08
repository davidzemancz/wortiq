import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useMemo } from 'react';
import Button from '../ui/Button';
import useTypewriter from '../../hooks/useTypewriter';

const words = ['tým', 'plán', 'rozpočet', 'harmonogram'];

// Generate floating particles with stable positions
const generateParticles = (count) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: (i * 37 + 13) % 100,
      y: (i * 53 + 7) % 100,
      size: 2 + (i % 4),
      duration: 3 + (i % 4) * 1.5,
      delay: (i * 0.3) % 3,
    });
  }
  return particles;
};

const FloatingParticle = ({ particle }) => (
  <motion.div
    className="absolute rounded-full bg-white/20"
    style={{
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: particle.size,
      height: particle.size,
    }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      opacity: [0.2, 0.6, 0.2],
    }}
    transition={{
      duration: particle.duration,
      delay: particle.delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const HeroSection = () => {
  const displayText = useTypewriter(words, { typeSpeed: 120, deleteSpeed: 80, pauseTime: 2000 });
  const particles = useMemo(() => generateParticles(20), []);

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Solid background */}
      <div className="absolute inset-0 bg-blue-600" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {particles.map((particle) => (
          <FloatingParticle key={particle.id} particle={particle} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
        >
          Popište projekt.{' '}
          <span className="block mt-2">
            AI sestaví{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                {displayText}
                <span className="text-cyan-300 animate-pulse">|</span>
              </span>
              <motion.span
                className="absolute -inset-x-2 -inset-y-1 bg-white/5 rounded-lg -z-0"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl lg:text-2xl text-blue-100/90 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          První AI-powered freelancer marketplace v Česku. Žádné hledání, žádné
          pohovory – jen výsledky.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/new-project">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto !bg-white !text-blue-700 !border-white hover:!bg-blue-50 hover:!text-blue-800 shadow-lg hover:shadow-2xl !px-10 !py-5 !text-lg group"
            >
              Zkusit zdarma
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="lg"
            onClick={scrollToHowItWorks}
            className="w-full sm:w-auto !text-white !border-white/30 hover:!bg-white/10 hover:!border-white/50 hover:!text-white !px-10 !py-5 !text-lg"
          >
            Jak to funguje
            <ChevronDown className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/40 text-sm"
        >
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Bez kreditní karty
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Výsledky do 3 minut
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            1 250+ freelancerů
          </span>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default HeroSection;
