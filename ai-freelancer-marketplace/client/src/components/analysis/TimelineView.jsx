import { CalendarDays } from 'lucide-react';
import TimelineChart from './TimelineChart';

export default function TimelineView({ tasks = [], milestones = [], estimatedDuration }) {
  const totalWeeks = estimatedDuration?.weeks || 4;

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-cyan-50">
          <CalendarDays className="w-5 h-5 text-cyan-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Harmonogram projektu</h2>
        <span className="rounded-full px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600">
          {totalWeeks} týdnů
        </span>
      </div>

      <div className="rounded-xl shadow-sm border border-slate-200 bg-white p-6 overflow-hidden">
        <TimelineChart
          tasks={tasks}
          milestones={milestones}
          totalWeeks={totalWeeks}
        />
      </div>

      {estimatedDuration?.description && (
        <p className="mt-3 text-sm text-slate-500">
          {estimatedDuration.description}
        </p>
      )}
    </section>
  );
}
