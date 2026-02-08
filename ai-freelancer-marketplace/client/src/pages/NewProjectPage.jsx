import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ProjectInputForm from '../components/project/ProjectInputForm';
import AIAnalysisLoader from '../components/project/AIAnalysisLoader';
import Tooltip from '../components/ui/Tooltip';

export default function NewProjectPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (isAnalyzing) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <AIAnalysisLoader />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-10">
        <Tooltip content="AI analyzuje text a rozloží projekt na úkoly, tým a rozpočet" position="bottom">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4 cursor-help">
            <Sparkles className="w-4 h-4" />
            AI-powered analýza
          </div>
        </Tooltip>
        <h1 className="text-3xl font-bold text-slate-900">
          Popište svůj projekt
        </h1>
        <p className="text-slate-500 mt-2 max-w-lg mx-auto">
          Napište, co potřebujete – jako byste psali kolegovi. AI analyzuje
          požadavky a navrhne optimální tým i rozpočet.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <ProjectInputForm onLoadingChange={setIsAnalyzing} />
      </div>
    </motion.div>
  );
}
