import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { Diamond } from 'lucide-react';

const TASK_COLORS = ['#2563EB', '#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#14B8A6'];

function buildGanttData(tasks = [], totalWeeks = 4) {
  const hoursPerWeek = 40;
  const taskMap = new Map();

  for (const task of tasks) {
    const durationWeeks = Math.max(1, Math.ceil((task.estimatedHours || 8) / hoursPerWeek));
    taskMap.set(task.id, { ...task, durationWeeks, startWeek: 0 });
  }

  const resolved = new Set();
  const result = [];

  function resolve(taskId) {
    if (resolved.has(taskId)) return;
    const t = taskMap.get(taskId);
    if (!t) return;

    let maxDepEnd = 0;
    for (const depId of t.dependencies || []) {
      resolve(depId);
      const dep = taskMap.get(depId);
      if (dep) {
        maxDepEnd = Math.max(maxDepEnd, dep.startWeek + dep.durationWeeks);
      }
    }
    t.startWeek = maxDepEnd;
    resolved.add(taskId);
    result.push(t);
  }

  for (const task of tasks) resolve(task.id);

  const actualTotal = Math.max(totalWeeks, ...result.map((t) => t.startWeek + t.durationWeeks));

  return {
    items: result.map((t, i) => ({
      name: t.title,
      start: t.startWeek,
      duration: t.durationWeeks,
      hours: t.estimatedHours,
      color: TASK_COLORS[i % TASK_COLORS.length],
      dependencies: t.dependencies || [],
    })),
    totalWeeks: actualTotal,
  };
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload;
  if (!data) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3">
      <p className="text-sm font-semibold text-slate-900">{data.name}</p>
      <div className="flex gap-4 mt-1">
        <p className="text-xs text-slate-500">
          Týden {data.start + 1} – {data.start + data.duration}
        </p>
        <p className="text-xs text-slate-500">{data.hours}h práce</p>
      </div>
    </div>
  );
}

export default function TimelineChart({ tasks = [], milestones = [], totalWeeks = 4 }) {
  const { items, totalWeeks: actualWeeks } = buildGanttData(tasks, totalWeeks);

  // Recharts stacked bar trick: start (invisible) + duration (visible)
  const chartData = items.map((item) => ({
    ...item,
    // The invisible spacer bar
    _start: item.start,
    _duration: item.duration,
  }));

  return (
    <div className="space-y-4">
      {/* Gantt Chart */}
      <div style={{ height: Math.max(180, items.length * 44 + 40) }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis
              type="number"
              domain={[0, actualWeeks]}
              ticks={Array.from({ length: actualWeeks + 1 }, (_, i) => i)}
              tickFormatter={(v) => (v > 0 ? `T${v}` : '')}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
              tick={{ fontSize: 12, fill: '#475569' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />

            {/* Milestones as reference lines */}
            {milestones.map((m, i) => (
              <ReferenceLine
                key={i}
                x={m.weekNumber}
                stroke="#F59E0B"
                strokeWidth={2}
                strokeDasharray="5 3"
                label={{
                  value: m.title,
                  position: 'top',
                  fill: '#92400e',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
            ))}

            {/* Invisible spacer bar */}
            <Bar dataKey="_start" stackId="gantt" fill="transparent" radius={0} isAnimationActive={false} />
            {/* Visible duration bar */}
            <Bar dataKey="_duration" stackId="gantt" radius={[4, 4, 4, 4]} animationDuration={800}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Milestone legend */}
      {milestones.length > 0 && (
        <div className="flex flex-wrap gap-4 px-2">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <Diamond className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-slate-600 font-medium">{m.title}</span>
              <span className="text-slate-500">Týden {m.weekNumber}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
