import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, Shield, Clock, Users as UsersIcon, Wallet } from 'lucide-react';
import TaskBreakdown from '../components/analysis/TaskBreakdown';
import FreelancerSuggestions, {
  matchFreelancersToTasks,
} from '../components/analysis/FreelancerSuggestions';
import BudgetEstimate from '../components/analysis/BudgetEstimate';
import TimelineView from '../components/analysis/TimelineView';
import ApprovalPanel from '../components/analysis/ApprovalPanel';
import ConfidenceIndicator from '../components/analysis/ConfidenceIndicator';
import ProjectScopeCard from '../components/analysis/ProjectScopeCard';
import { freelancers } from '../data/freelancers';
import useProjectStore from '../stores/projectStore';
import { formatCurrency as formatCZK } from '../utils/formatCurrency';

function QuickStat({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
      <Icon className={`w-5 h-5 ${color}`} />
      <div>
        <p className="text-xs text-blue-200">{label}</p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function AnalysisResultPage() {
  const navigate = useNavigate();
  const analysisResult = useProjectStore((state) => state.analysisResult);
  const detectedProjectType = useProjectStore((state) => state.detectedProjectType);

  // Redirect to new-project if there's no analysis result
  useEffect(() => {
    if (!analysisResult) {
      navigate('/new-project', { replace: true });
    }
  }, [analysisResult, navigate]);

  // Match freelancers to tasks based on skills
  const assignments = useMemo(() => {
    if (!analysisResult?.tasks) return [];
    return matchFreelancersToTasks(analysisResult.tasks, freelancers);
  }, [analysisResult?.tasks]);

  const uniqueFreelancerCount = useMemo(() => {
    return new Set(assignments.map((a) => a.freelancer.id)).size;
  }, [assignments]);

  if (!analysisResult) return null;

  const {
    projectName,
    projectSummary,
    complexity,
    estimatedDuration,
    tasks = [],
    budget = {},
    milestones = [],
    risks = [],
    recommendations = [],
    quizContext,
  } = analysisResult;

  const complexityConfig = {
    low: { label: 'Nízká složitost', color: 'bg-emerald-100 text-emerald-700' },
    medium: { label: 'Střední složitost', color: 'bg-amber-100 text-amber-700' },
    high: { label: 'Vysoká složitost', color: 'bg-red-100 text-red-700' },
  };

  const comp = complexityConfig[complexity] || complexityConfig.medium;
  const totalHours = tasks.reduce((sum, t) => sum + (t.estimatedHours || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header with entrance animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-700 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-2 mb-3"
          >
            <Sparkles className="w-5 h-5 text-blue-200" />
            <span className="text-sm text-blue-200 font-medium">AI Analýza dokončena</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-3xl font-bold mb-2"
          >
            {projectName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-blue-100 text-base max-w-2xl"
          >
            {projectSummary}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-center gap-3 mt-4 flex-wrap"
          >
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${comp.color}`}>
              {comp.label}
            </span>
            {estimatedDuration && (
              <span className="rounded-full px-3 py-1 text-xs font-medium bg-white/20 text-white">
                {estimatedDuration.weeks} týdnů
              </span>
            )}
            <span className="rounded-full px-3 py-1 text-xs font-medium bg-white/20 text-white">
              {tasks.length} úkolů
            </span>
          </motion.div>

          {/* Quick stats row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6"
          >
            <QuickStat icon={Clock} label="Celkový čas" value={`${totalHours}h`} color="text-cyan-300" />
            <QuickStat icon={UsersIcon} label="Velikost týmu" value={`${uniqueFreelancerCount} lidí`} color="text-violet-300" />
            <QuickStat icon={Wallet} label="Rozpočet" value={formatCZK(budget.total || 0)} color="text-emerald-300" />
            <QuickStat icon={Shield} label="Rizika" value={`${risks.length} identifikováno`} color="text-amber-300" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main content with staggered section animations */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Project Scope Card - shows quiz context and what's included */}
        {quizContext && (
          <motion.div variants={sectionVariants}>
            <ProjectScopeCard
              quizContext={quizContext}
              projectType={detectedProjectType}
            />
          </motion.div>
        )}

        {/* AI Confidence + project overview */}
        <motion.div variants={sectionVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <ConfidenceIndicator score={87} label="AI spolehlivost analýzy" />
          </div>
          <div className="rounded-xl shadow-sm border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Přehled projektu</h3>
            <div className="space-y-3">
              {[
                { label: 'Složitost', value: comp.label, color: complexity === 'high' ? 'text-red-600' : complexity === 'low' ? 'text-emerald-600' : 'text-amber-600' },
                { label: 'Doba dodání', value: `${estimatedDuration?.weeks || '?'} týdnů`, color: 'text-blue-600' },
                { label: 'Milníky', value: `${milestones.length} klíčových bodů`, color: 'text-violet-600' },
                { label: 'Závislosti', value: `${tasks.filter(t => t.dependencies?.length > 0).length} úkolů`, color: 'text-slate-600' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{item.label}</span>
                  <span className={`font-semibold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={sectionVariants}>
          <TaskBreakdown tasks={tasks} />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <FreelancerSuggestions assignments={assignments} />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <BudgetEstimate budget={budget} tasks={tasks} assignments={assignments} />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <TimelineView
            tasks={tasks}
            milestones={milestones}
            estimatedDuration={estimatedDuration}
          />
        </motion.div>

        {/* Risks & Recommendations */}
        {(risks.length > 0 || recommendations.length > 0) && (
          <motion.div
            variants={sectionVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10"
          >
            {risks.length > 0 && (
              <div className="rounded-xl shadow-sm border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-bold text-slate-900">Rizika</h3>
                </div>
                <ul className="space-y-3">
                  {risks.map((risk, i) => (
                    <li key={i} className="text-sm">
                      <div className="flex items-start gap-2">
                        <span
                          className={`mt-0.5 rounded-full px-2 py-0.5 text-xs font-medium flex-shrink-0 ${
                            risk.severity === 'high'
                              ? 'bg-red-100 text-red-700'
                              : risk.severity === 'medium'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {risk.severity === 'high' ? 'Vysoké' : risk.severity === 'medium' ? 'Střední' : 'Nízké'}
                        </span>
                        <div>
                          <p className="text-slate-900">{risk.description}</p>
                          <p className="text-slate-500 text-xs mt-1">{risk.mitigation}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recommendations.length > 0 && (
              <div className="rounded-xl shadow-sm border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-violet-500" />
                  <h3 className="text-lg font-bold text-slate-900">Doporučení</h3>
                </div>
                <ul className="space-y-2">
                  {recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-violet-500 font-bold mt-0.5">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Sticky approval panel */}
      <ApprovalPanel
        tasks={tasks}
        freelancerCount={uniqueFreelancerCount}
        budget={budget}
        estimatedDuration={estimatedDuration}
      />
    </div>
  );
}
