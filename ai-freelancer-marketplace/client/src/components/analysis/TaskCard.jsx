import { Clock, AlertTriangle, ArrowRight, GitBranch, Sparkles } from 'lucide-react';

const difficultyConfig = {
  easy: { label: 'Snadné', color: 'bg-emerald-100 text-emerald-700', barColor: 'bg-emerald-500', width: '33%' },
  medium: { label: 'Střední', color: 'bg-amber-100 text-amber-700', barColor: 'bg-amber-500', width: '66%' },
  hard: { label: 'Náročné', color: 'bg-red-100 text-red-700', barColor: 'bg-red-500', width: '100%' },
};

const priorityConfig = {
  high: { label: 'Vysoká', color: 'bg-red-50 text-red-600 border-red-200', icon: '!' },
  medium: { label: 'Střední', color: 'bg-amber-50 text-amber-600 border-amber-200', icon: '~' },
  low: { label: 'Nízká', color: 'bg-slate-50 text-slate-600 border-slate-200', icon: '-' },
};

const categoryColors = {
  design: 'from-pink-500 to-violet-500',
  development: 'from-blue-500 to-cyan-500',
  testing: 'from-emerald-500 to-teal-500',
  devops: 'from-amber-500 to-orange-500',
};

export default function TaskCard({ task, index, allTasks = [] }) {
  const difficulty = difficultyConfig[task.difficulty] || difficultyConfig.medium;
  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const categoryGradient = categoryColors[task.category] || 'from-blue-500 to-violet-500';

  // Resolve dependency names
  const dependencyNames = (task.dependencies || [])
    .map((depId) => allTasks.find((t) => t.id === depId))
    .filter(Boolean);

  // AI confidence for this task (simulated)
  const confidence = 80 + Math.floor((task.title.length * 7) % 18);

  return (
    <div className="group rounded-xl shadow-sm border border-slate-200 bg-white hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Color top bar */}
      <div className={`h-1 bg-gradient-to-r ${categoryGradient}`} />

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-bold text-slate-500">
              {index + 1}
            </span>
            <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
              {task.title}
            </h4>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium border flex-shrink-0 ${priority.color}`}>
            {priority.label}
          </span>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">{task.description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {task.skills?.map((skill) => (
            <span
              key={skill}
              className="rounded-full px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Dependency visualization */}
        {dependencyNames.length > 0 && (
          <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <GitBranch className="w-3.5 h-3.5" />
              <span className="font-medium">Závisí na:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {dependencyNames.map((dep) => (
                <span
                  key={dep.id}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs bg-white border border-slate-200 text-slate-600"
                >
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  {dep.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom stats */}
        <div className="mt-auto pt-3 border-t border-slate-100 space-y-2">
          {/* Difficulty bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 w-16">Náročnost</span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${difficulty.barColor}`}
                style={{ width: difficulty.width }}
              />
            </div>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${difficulty.color}`}>
              {difficulty.label}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {task.estimatedHours}h
              </span>
              {dependencyNames.length > 0 && (
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <GitBranch className="w-3 h-3" />
                  {dependencyNames.length}
                </span>
              )}
            </div>

            {/* AI confidence mini indicator */}
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Sparkles className="w-3 h-3 text-violet-400" />
              <span>{confidence}%</span>
            </div>
          </div>
        </div>

        {/* Deliverables */}
        {task.deliverables?.length > 0 && (
          <div className="text-xs text-slate-500">
            <span className="font-medium">Výstupy:</span>{' '}
            {task.deliverables.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}
