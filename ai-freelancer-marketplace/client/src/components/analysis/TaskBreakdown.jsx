import { ListChecks, BarChart3 } from 'lucide-react';
import TaskCard from './TaskCard';

function StatCard({ label, value, sub, color }) {
  return (
    <div className="rounded-lg bg-white border border-slate-200 px-4 py-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

export default function TaskBreakdown({ tasks = [] }) {
  const totalHours = tasks.reduce((sum, t) => sum + (t.estimatedHours || 0), 0);
  const highPriority = tasks.filter((t) => t.priority === 'high').length;
  const hardTasks = tasks.filter((t) => t.difficulty === 'hard').length;

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-blue-50">
          <ListChecks className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Rozklad projektu na úkoly</h2>
        <span className="rounded-full px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600">
          {tasks.length} úkolů
        </span>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Celkem úkolů" value={tasks.length} color="text-blue-600" />
        <StatCard label="Odhadované hodiny" value={`${totalHours}h`} color="text-slate-900" />
        <StatCard label="Vysoká priorita" value={highPriority} sub={`z ${tasks.length}`} color="text-red-600" />
        <StatCard label="Náročné úkoly" value={hardTasks} sub={`z ${tasks.length}`} color="text-amber-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} allTasks={tasks} />
        ))}
      </div>
    </section>
  );
}
