import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { formatCurrency as formatCZK } from '../../utils/formatCurrency';

export default function ApprovalPanel({ tasks = [], freelancerCount = 0, budget = {}, estimatedDuration }) {
  const navigate = useNavigate();

  const total = budget.total || 0;
  const weeks = estimatedDuration?.weeks || 0;

  const summaryParts = [
    `${tasks.length} úkolů`,
    `${freelancerCount} freelancerů`,
    formatCZK(total),
    `${weeks} týdnů`,
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <span className="text-sm text-slate-600">
            {summaryParts.join(' · ')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/new-project')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Upravit zadání
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            Schválit a spustit projekt
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
