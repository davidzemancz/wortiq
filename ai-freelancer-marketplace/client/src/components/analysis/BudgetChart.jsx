import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency as formatCZK } from '../../utils/formatCurrency';

const COLORS = ['#2563EB', '#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3">
      <p className="text-sm font-semibold text-slate-900">{data.category}</p>
      <p className="text-sm text-slate-600">{formatCZK(data.amount)}</p>
      <p className="text-xs text-slate-500">{data.percentage}% z rozpočtu</p>
    </div>
  );
}

function CenterLabel({ viewBox, total }) {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text x={cx} y={cy - 8} textAnchor="middle" className="text-lg font-bold fill-slate-900">
        {formatCZK(total)}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" className="text-xs fill-slate-500">
        celkem
      </text>
    </g>
  );
}

export default function BudgetChart({ breakdown = [], total = 0 }) {
  if (breakdown.length === 0) return null;

  const chartTotal = total || breakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={breakdown}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="amount"
              stroke="none"
              animationBegin={200}
              animationDuration={800}
            >
              {breakdown.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
              <CenterLabel viewBox={{ cx: 0, cy: 0 }} total={chartTotal} />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {breakdown.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="text-slate-600">{item.category}</span>
            <span className="font-medium text-slate-900">{formatCZK(item.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
