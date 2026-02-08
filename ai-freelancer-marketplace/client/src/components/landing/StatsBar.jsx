import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, FolderCheck, ThumbsUp, Clock } from 'lucide-react';

const stats = [
  { icon: Users, value: 1250, suffix: '+', label: 'Registrovaných freelancerů' },
  { icon: FolderCheck, value: 340, suffix: '+', label: 'Dokončených projektů' },
  { icon: ThumbsUp, value: 98, suffix: '%', label: 'Spokojenost klientů' },
  { icon: Clock, value: 3, suffix: ' min', label: 'Průměrný čas sestavení týmu' },
];

function useCountUp(target, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, shouldStart]);

  return count;
}

const StatItem = ({ icon: Icon, value, suffix, label, inView, index }) => {
  const count = useCountUp(value, 2000, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <Icon className="h-8 w-8 text-blue-600 mx-auto mb-3 transition-colors group-hover:text-violet-600" aria-hidden="true" />
      </motion.div>
      <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1 tabular-nums">
        {count.toLocaleString('cs-CZ')}
        <span className="text-blue-600">{suffix}</span>
      </div>
      <div className="text-sm text-slate-600">{label}</div>
    </motion.div>
  );
};

const StatsBar = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} {...stat} inView={inView} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
