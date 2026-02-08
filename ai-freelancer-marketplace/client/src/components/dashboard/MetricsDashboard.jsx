import {
  RadialBarChart, RadialBar, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  TrendingUp, Clock, Users, CheckCircle2, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Flame,
} from 'lucide-react';
import useProjectStore from '../../stores/projectStore';

const weeklyProductivity = [
  { týden: 'T1', hodiny: 32, úkoly: 4 },
  { týden: 'T2', hodiny: 45, úkoly: 6 },
  { týden: 'T3', hodiny: 38, úkoly: 5 },
  { týden: 'T4', hodiny: 52, úkoly: 8 },
];

const taskDistribution = [
  { name: 'Design', value: 25, color: '#8b5cf6' },
  { name: 'Frontend', value: 40, color: '#3b82f6' },
  { name: 'Backend', value: 25, color: '#06b6d4' },
  { name: 'DevOps', value: 10, color: '#10b981' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="font-medium text-slate-700 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }}>
          {entry.name}: <span className="font-semibold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

function KPICard({ icon: Icon, label, value, suffix, change, changeType, color, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5" style={{ background: color, transform: 'translate(30%, -30%)' }} />
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-0.5 text-xs font-medium ${changeType === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
            {changeType === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {change}%
          </div>
        )}
      </div>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <div className="flex items-end gap-1">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {suffix && <span className="text-sm text-slate-500 mb-0.5">{suffix}</span>}
      </div>
      {children}
    </div>
  );
}

function TeamMemberMetric({ name, hours, tasks, efficiency }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
        {name.split(' ').map(w => w[0]).join('').substring(0, 2)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 truncate">{name}</p>
        <p className="text-xs text-slate-500">{tasks} úkolů | {hours}h</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
            style={{ width: `${efficiency}%` }}
          />
        </div>
        <span className="text-xs font-medium text-slate-600 w-8 text-right">{efficiency}%</span>
      </div>
    </div>
  );
}

export default function MetricsDashboard() {
  const columns = useProjectStore((s) => s.dashboardState.columns);
  const analysisResult = useProjectStore((s) => s.analysisResult);
  const team = useProjectStore((s) => s.dashboardState.team);

  const totalTasks =
    (columns.backlog?.length || 0) +
    (columns.inProgress?.length || 0) +
    (columns.review?.length || 0) +
    (columns.done?.length || 0);
  const doneTasks = columns.done?.length || 0;
  const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const budget = analysisResult?.budget;
  const totalHours = analysisResult?.tasks?.reduce((sum, t) => sum + (t.estimatedHours || 0), 0) || 170;

  const radialData = [{ name: 'Progres', value: completionRate, fill: '#3b82f6' }];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={CheckCircle2}
          label="Dokončeno úkolů"
          value={doneTasks}
          suffix={`/ ${totalTasks}`}
          change={15}
          changeType="up"
          color="#3b82f6"
        />
        <KPICard
          icon={Clock}
          label="Odpracováno hodin"
          value={Math.round(totalHours * 0.35)}
          suffix={`/ ${totalHours}h`}
          change={8}
          changeType="up"
          color="#8b5cf6"
        />
        <KPICard
          icon={Flame}
          label="Streak"
          value={5}
          suffix="dní"
          color="#f59e0b"
        >
          <div className="flex gap-1 mt-2">
            {[1,2,3,4,5,6,7].map(d => (
              <div key={d} className={`w-3 h-3 rounded-sm ${d <= 5 ? 'bg-amber-400' : 'bg-slate-100'}`} />
            ))}
          </div>
        </KPICard>
        <KPICard
          icon={AlertTriangle}
          label="Rizika"
          value={analysisResult?.risks?.length || 0}
          suffix="identifikováno"
          color="#ef4444"
        >
          <div className="flex items-center gap-1 mt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs text-slate-500">1 střední priorita</span>
          </div>
        </KPICard>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Completion Radial */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Celkový progres</h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={180}>
              <RadialBarChart
                cx="50%" cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={12}
                data={radialData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  background={{ fill: '#f1f5f9' }}
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-slate-900">{completionRate}%</span>
              <span className="text-xs text-slate-500">dokončeno</span>
            </div>
          </div>
        </div>

        {/* Productivity Trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700">Produktivita týmu</h3>
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              +22%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={155}>
            <LineChart data={weeklyProductivity} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="týden" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="hodiny"
                name="Hodiny"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="úkoly"
                name="Úkoly"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Task Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Rozdělení práce</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={taskDistribution}
                cx="50%" cy="50%"
                innerRadius={35}
                outerRadius={60}
                paddingAngle={3}
                dataKey="value"
              >
                {taskDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
            {taskDistribution.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700">Efektivita týmu</h3>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-0">
            <TeamMemberMetric name="UI/UX Designér" hours={28} tasks={3} efficiency={92} />
            <TeamMemberMetric name="Frontend Developer" hours={35} tasks={4} efficiency={87} />
            <TeamMemberMetric name="Backend Developer" hours={22} tasks={2} efficiency={95} />
            <TeamMemberMetric name="DevOps Engineer" hours={8} tasks={1} efficiency={80} />
          </div>
        </div>

        {/* Budget Summary */}
        {budget && (
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Finanční přehled</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Celkový rozpočet</span>
                <span className="text-lg font-bold text-slate-900">{budget.total.toLocaleString('cs-CZ')} Kč</span>
              </div>
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-l-full"
                  style={{ width: '35%' }}
                  title="Vyčerpáno"
                />
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-300"
                  style={{ width: '20%' }}
                  title="Alokováno"
                />
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-blue-500" />
                  Vyčerpáno (35%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-amber-400" />
                  Alokováno (20%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-slate-100" />
                  Zbývá (45%)
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">{Math.round(budget.total * 0.35).toLocaleString('cs-CZ')}</p>
                  <p className="text-xs text-slate-500">Vyčerpáno</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-amber-500">{Math.round(budget.total * 0.20).toLocaleString('cs-CZ')}</p>
                  <p className="text-xs text-slate-500">Alokováno</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-600">{Math.round(budget.total * 0.45).toLocaleString('cs-CZ')}</p>
                  <p className="text-xs text-slate-500">Zbývá</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
