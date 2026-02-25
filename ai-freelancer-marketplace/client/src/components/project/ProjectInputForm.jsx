import { useState, useRef, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import useProjectStore from '../../stores/projectStore';

const MAX_CHARS = 2000;
const MIN_CHARS = 20;

const BUDGET_OPTIONS = [
  { value: '', label: 'Nechci specifikovat' },
  { value: '0-10000', label: 'Do 10 000 Kč' },
  { value: '10000-30000', label: '10–30 000 Kč' },
  { value: '30000-80000', label: '30–80 000 Kč' },
  { value: '80000-200000', label: '80–200 000 Kč' },
  { value: '200000+', label: '200 000+ Kč' },
];

const DEADLINE_OPTIONS = [
  { value: '', label: 'Flexibilní' },
  { value: '2weeks', label: 'Do 2 týdnů' },
  { value: '1month', label: 'Do měsíce' },
  { value: '3months', label: 'Do 3 měsíců' },
];

const CATEGORIES = [
  'Web development',
  'Mobilní aplikace',
  'Grafický design',
  'Marketing',
  'Copywriting',
  'Video',
  'Fotografie',
  'Překlady',
  'Data & Analytika',
  'AI & Automatizace',
];

const ProjectInputForm = forwardRef(function ProjectInputForm(props, ref) {
  const [showDetails, setShowDetails] = useState(false);
  const textareaRef = useRef(null);

  const {
    projectDescription,
    budget,
    deadline,
    categories,
    analysisError,
    setProjectDescription,
    setBudget,
    setDeadline,
    toggleCategory,
    startQuiz,
  } = useProjectStore();

  const charCount = projectDescription.length;
  const canSubmit = charCount >= MIN_CHARS && charCount <= MAX_CHARS;

  const autoExpand = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.max(textarea.scrollHeight, 120)}px`;
  }, []);

  useEffect(() => {
    autoExpand();
  }, [projectDescription, autoExpand]);

  const fillForm = useCallback((prompt, cats, promptBudget) => {
    setProjectDescription(prompt);
    if (cats) {
      cats.forEach(cat => {
        if (!categories.includes(cat)) {
          toggleCategory(cat);
        }
      });
    }
    if (promptBudget) {
      const match = BUDGET_OPTIONS.find((o) => o.label === promptBudget);
      if (match) setBudget(match.value);
    }
  }, [setProjectDescription, setBudget, toggleCategory, categories]);

  useImperativeHandle(ref, () => ({ fillForm }), [fillForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    console.log('🚀 Starting project quiz...', {
      description: projectDescription,
      budget,
      deadline,
      categories
    });

    // Start the quiz flow instead of direct analysis
    startQuiz();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={projectDescription}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              setProjectDescription(e.target.value);
            }
          }}
          placeholder="Popište svůj projekt... Např: Potřebuji moderní e-shop na prodej ručně vyráběných svíček. Chci platební bránu (Stripe nebo GoPay), napojení na Zásilkovnu, responsivní design a základní SEO optimalizaci."
          rows={3}
          className="w-full border border-slate-300 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-400 transition-colors duration-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-base leading-relaxed"
          style={{ minHeight: '120px' }}
        />
        <div className="absolute bottom-3 right-4 text-xs text-slate-400">
          <span className={charCount > MAX_CHARS * 0.9 ? 'text-amber-500' : ''}>
            {charCount}
          </span>
          /{MAX_CHARS}
        </div>
      </div>

      {/* Collapsible details section */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`}
          />
          Upřesnit detaily
        </button>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Rozpočet
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  >
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Deadline
                  </label>
                  <select
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  >
                    {DEADLINE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Kategorie
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className={`
                        rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 border
                        ${
                          categories.includes(category)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400 hover:text-blue-600'
                        }
                      `}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {analysisError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {analysisError}
        </div>
      )}

      <div className="mt-6">
        <Button
          type="submit"
          size="lg"
          disabled={!canSubmit}
          className="w-full md:w-auto"
        >
          <Sparkles className="w-5 h-5" />
          Pokračovat
        </Button>
        {charCount > 0 && charCount < MIN_CHARS && (
          <p className="mt-2 text-xs text-slate-400">
            Zadejte alespoň {MIN_CHARS} znaků ({MIN_CHARS - charCount} zbývá)
          </p>
        )}
      </div>
    </form>
  );
});

export default ProjectInputForm;
