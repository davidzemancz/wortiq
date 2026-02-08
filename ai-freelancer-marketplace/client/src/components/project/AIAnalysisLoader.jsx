import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Check, Sparkles } from 'lucide-react';

const STEPS = [
  'Analyzuji požadavky...',
  'Identifikuji potřebné dovednosti...',
  'Hledám nejlepší freelancery...',
  'Sestavuji harmonogram...',
  'Kalkuluji rozpočet...',
];

const STEP_DELAY = 800;

export default function AIAnalysisLoader({ onComplete }) {
  const [completedSteps, setCompletedSteps] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (completedSteps >= STEPS.length) {
      // Show success animation before completing
      const timer = setTimeout(() => {
        setShowSuccess(true);
      }, 400);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCompletedSteps((prev) => prev + 1);
    }, STEP_DELAY);

    return () => clearTimeout(timer);
  }, [completedSteps]);

  useEffect(() => {
    if (showSuccess && onComplete) {
      const timer = setTimeout(onComplete, 1200);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div
            key="loading"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* Pulsing AI icon with orbital ring */}
            <div className="relative mb-8">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/25"
              >
                <Brain className="w-8 h-8 text-white" />
              </motion.div>
              {/* Orbital ring */}
              <motion.div
                className="absolute -inset-3 rounded-full border-2 border-violet-300/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-violet-400" />
              </motion.div>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">
              AI analyzuje váš projekt
            </h2>
            <p className="text-sm text-slate-500 mb-8">
              Prosím počkejte, zpracováváme váš požadavek...
            </p>

            {/* Progress bar */}
            <div className="w-full max-w-sm mb-6">
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(completedSteps / STEPS.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Steps list */}
            <div className="w-full max-w-sm space-y-3">
              {STEPS.map((step, index) => {
                const isCompleted = index < completedSteps;
                const isCurrent = index === completedSteps;

                return (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isCurrent || isCompleted ? 1 : 0.3, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`
                        w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300
                        ${isCompleted ? 'bg-emerald-500' : isCurrent ? 'bg-blue-500' : 'bg-slate-200'}
                      `}
                    >
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <Check className="w-3.5 h-3.5 text-white" />
                        </motion.div>
                      ) : isCurrent ? (
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-white"
                        />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-400" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        isCompleted
                          ? 'text-emerald-700 font-medium'
                          : isCurrent
                            ? 'text-slate-900 font-medium'
                            : 'text-slate-400'
                      }`}
                    >
                      {isCompleted ? step.replace('...', '') : step}
                      {isCompleted && ' ✓'}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex flex-col items-center"
          >
            {/* Success checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
              className="relative mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </motion.div>
              </div>
              {/* Success ring pulse */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-emerald-400"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-emerald-300"
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 text-emerald-600 mb-2">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Hotovo!</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Analýza dokončena
              </h2>
              <p className="text-sm text-slate-500">
                Přesměrování na výsledky...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
