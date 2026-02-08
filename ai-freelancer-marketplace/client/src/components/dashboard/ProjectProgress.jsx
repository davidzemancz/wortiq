import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from 'recharts';
import { TrendingDown, Zap, Target, ChevronDown, ChevronUp } from 'lucide-react';
import useProjectStore from '../../stores/projectStore';
import ProgressBar from '../ui/ProgressBar';

const burndownData = [
  { den: 'Po', plán: 170, skutečnost: 170 },
  { den: 'Út', plán: 145, skutečnost: 155 },
  { den: 'St', plán: 120, skutečnost: 135 },
  { den: 'Čt', plán: 95, skutečnost: 110 },
  { den: 'Pá', plán: 70, skutečnost: 80 },
  { den: 'So', plán: 45, skutečnost: null },
  { den: 'Ne', plán: 20, skutečnost: null },
];

const velocityData = [
  { sprint: 'S1', body: 18 },
  { sprint: 'S2', body: 24 },
  { sprint: 'S3', body: 21 },
  { sprint: 'S4', body: 30 },
  { sprint: 'S5', body: 28 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="font-medium text-slate-700 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }}>
          {entry.name}: <span className="font-semibold">{entry.value}h</span>
        </p>
      ))}
    </div>
  );
};

export default function ProjectProgress() {
  const [expanded, setExpanded] = useState(false);
  const columns = useProjectStore((s) => s.dashboardState.columns);
  const analysisResult = useProjectStore((s) => s.analysisResult);

  const totalTasks =
    (columns.backlog?.length || 0) +
    (columns.inProgress?.length || 0) +
    (columns.review?.length || 0) +
    (columns.done?.length || 0);

  const doneTasks = columns.done?.length || 0;
  const inProgressTasks = columns.inProgress?.length || 0;
  const reviewTasks = columns.review?.length || 0;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const budget = analysisResult?.budget;
  const spent = budget ? Math.round(budget.total * 0.35) : 0;
  const remaining = budget ? budget.total - spent : 0;
  const budgetPercent = budget ? Math.round((spent / budget.total) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Target className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-xs text-slate-500">Progres</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-slate-900">{progress}%</span>
            <span className="text-xs text-emerald-600 font-medium mb-1">+12%</span>
          </div>
          <ProgressBar value={progress} showLabel={false} className="mt-2" />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-xs text-slate-500">Velocity</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-slate-900">28</span>
            <span className="text-xs text-slate-500 mb-1">bodů/sprint</span>
          </div>
          <div className="flex gap-0.5 mt-2">
            {velocityData.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-amber-400"
                style={{ height: `${(v.body / 35) * 20}px`, opacity: 0.5 + (i / velocityData.length) * 0.5 }}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-violet-600" />
            </div>
            <span className="text-xs text-slate-500">Úkoly</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-slate-900">{doneTasks}/{totalTasks}</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {inProgressTasks} aktivní
            </span>
            <span className="text-slate-300 mx-1">|</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              {reviewTasks} review
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <span className="text-sm font-bold text-emerald-600">Kč</span>
            </div>
            <span className="text-xs text-slate-500">Rozpočet</span>
          </div>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-bold text-slate-900">
              {budget ? `${Math.round(spent / 1000)}k` : '—'}
            </span>
            <span className="text-xs text-slate-500 mb-1">
              / {budget ? `${Math.round(budget.total / 1000)}k Kč` : '—'}
            </span>
          </div>
          <ProgressBar value={budgetPercent} color="emerald" showLabel={false} className="mt-2" />
        </div>
      </div>

      {/* Expandable Charts Section */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors mx-auto"
      >
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {expanded ? 'Skrýt grafy' : 'Zobrazit detailní grafy'}
      </button>

      {expanded && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in duration-300">
          {/* Burndown Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Burndown Chart</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={burndownData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="planGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="den" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="plán"
                  name="Plán"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="url(#planGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="skutečnost"
                  name="Skutečnost"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fill="url(#actualGrad)"
                  connectNulls={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Velocity Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Velocity (body/sprint)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={velocityData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="sprint" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="body" name="Body" radius={[6, 6, 0, 0]} maxBarSize={40}>
                  {velocityData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={i === velocityData.length - 1 ? '#f59e0b' : '#fbbf24'}
                      opacity={0.6 + (i / velocityData.length) * 0.4}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Budget Breakdown */}
          {budget && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 lg:col-span-2">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Rozpočet - Čerpání vs. Zbývající</h3>
              <div className="space-y-3">
                {budget.breakdown.map((item, i) => {
                  const itemSpent = Math.round(item.amount * 0.35);
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-700 font-medium">{item.category}</span>
                        <span className="text-slate-500">
                          {itemSpent.toLocaleString('cs-CZ')} / {item.amount.toLocaleString('cs-CZ')} Kč
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                          style={{ width: `${35}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-sm">
                  <span className="font-semibold text-slate-900">Celkem</span>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-600 font-medium">
                      Zbývá: {remaining.toLocaleString('cs-CZ')} Kč
                    </span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-700 font-semibold">
                      {budget.total.toLocaleString('cs-CZ')} Kč
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
