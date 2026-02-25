import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Lightbulb, TrendingUp, Clock, Check } from 'lucide-react';
import Button from '../ui/Button';
import { getQuestionsForType, projectTypeLabels } from '../../data/quizQuestions';

export default function RequirementsQuiz({ projectType, onComplete, onBack }) {
  const { marketInfo, questions } = getQuestionsForType(projectType);
  const [currentStep, setCurrentStep] = useState(0); // 0 = market info, 1+ = questions
  const [answers, setAnswers] = useState({});

  const totalSteps = questions.length + 1; // +1 for market info
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleSingleSelect = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMultiSelect = (questionId, value) => {
    setAnswers(prev => {
      const current = prev[questionId] || [];
      if (current.includes(value)) {
        return { ...prev, [questionId]: current.filter(v => v !== value) };
      }
      return { ...prev, [questionId]: [...current, value] };
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Quiz complete
      onComplete(answers);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    if (currentStep === 0) return true; // Market info has no required selection

    const question = questions[currentStep - 1];
    const answer = answers[question.id];

    if (question.type === 'multi') {
      return true; // Multi-select is optional
    }
    return !!answer; // Single select needs a value
  };

  const renderMarketInfo = () => (
    <motion.div
      key="market-info"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">
          {projectTypeLabels[projectType] || 'Projekt'}
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {marketInfo.title}
        </h2>
        <p className="text-slate-600 max-w-lg mx-auto">
          {marketInfo.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-slate-900">Typický rozpočet</span>
          </div>
          <p className="text-xl font-bold text-blue-700">{marketInfo.averageBudget}</p>
          <p className="text-sm text-slate-500 mt-1">na českém trhu</p>
        </div>

        <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-xl p-5 border border-violet-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-violet-600 rounded-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-slate-900">Obvyklá doba</span>
          </div>
          <p className="text-xl font-bold text-violet-700">{marketInfo.averageTimeline}</p>
          <p className="text-sm text-slate-500 mt-1">včetně designu a testování</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-amber-800">
            <strong>Tip:</strong> V následujících krocích vám pomůžeme upřesnit požadavky.
            Na základě vašich odpovědí vytvoříme realistický odhad rozpočtu a týmu.
          </p>
        </div>
      </div>
    </motion.div>
  );

  const renderQuestion = (question) => (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          {question.question}
        </h2>
        {question.description && (
          <p className="text-slate-500">{question.description}</p>
        )}
        {question.type === 'multi' && (
          <p className="text-sm text-blue-600 mt-2">Můžete vybrat více možností</p>
        )}
      </div>

      <div className="grid gap-3">
        {question.options.map((option) => {
          const isSelected = question.type === 'multi'
            ? (answers[question.id] || []).includes(option.value)
            : answers[question.id] === option.value;

          return (
            <button
              key={option.value}
              onClick={() => {
                if (question.type === 'multi') {
                  handleMultiSelect(question.id, option.value);
                } else {
                  handleSingleSelect(question.id, option.value);
                }
              }}
              className={`
                relative text-left p-4 rounded-xl border-2 transition-all duration-200
                ${isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center transition-all
                    ${isSelected
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300'
                    }
                  `}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1">
                  <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                    {option.label}
                  </span>
                  {option.description && (
                    <p className={`text-sm mt-0.5 ${isSelected ? 'text-blue-700' : 'text-slate-500'}`}>
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>Krok {currentStep + 1} z {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          {currentStep === 0
            ? renderMarketInfo()
            : renderQuestion(questions[currentStep - 1])
          }
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="ghost"
          onClick={handlePrev}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {currentStep === 0 ? 'Upravit popis' : 'Zpět'}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="gap-2"
        >
          {currentStep === totalSteps - 1 ? 'Zobrazit výsledky' : 'Pokračovat'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
