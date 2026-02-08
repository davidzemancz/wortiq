import { Wallet, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import BudgetChart from './BudgetChart';
import { formatCurrency as formatCZK } from '../../utils/formatCurrency';

function MarketComparison({ total }) {
  const marketLow = Math.round(total * 0.9);
  const marketHigh = Math.round(total * 1.3);
  const midpoint = (marketLow + marketHigh) / 2;
  const position = Math.max(0, Math.min(100, ((total - marketLow) / (marketHigh - marketLow)) * 100));

  let trendIcon, trendColor, trendLabel;
  if (total < midpoint * 0.95) {
    trendIcon = <TrendingDown className="w-4 h-4" />;
    trendColor = 'text-emerald-600';
    trendLabel = 'Pod průměrem trhu';
  } else if (total > midpoint * 1.05) {
    trendIcon = <TrendingUp className="w-4 h-4" />;
    trendColor = 'text-amber-600';
    trendLabel = 'Nad průměrem trhu';
  } else {
    trendIcon = <Minus className="w-4 h-4" />;
    trendColor = 'text-blue-600';
    trendLabel = 'V průměru trhu';
  }

  return (
    <div className="mt-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-slate-700">Srovnání s trhem</span>
        <span className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
          {trendIcon}
          {trendLabel}
        </span>
      </div>

      {/* Visual range bar */}
      <div className="relative">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span>{formatCZK(marketLow)}</span>
          <span>{formatCZK(marketHigh)}</span>
        </div>
        <div className="h-2.5 bg-gradient-to-r from-emerald-200 via-blue-200 to-amber-200 rounded-full relative">
          {/* Project price indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-md"
            style={{ left: `${position}%`, transform: `translate(-50%, -50%)` }}
          />
        </div>
        <div
          className="text-xs font-semibold text-blue-600 mt-1.5"
          style={{ marginLeft: `${Math.max(5, Math.min(85, position))}%`, transform: 'translateX(-50%)', width: 'fit-content' }}
        >
          Váš projekt
        </div>
      </div>
    </div>
  );
}

export default function BudgetEstimate({ budget = {}, tasks = [], assignments = [] }) {
  const breakdown = budget.breakdown || [];

  const lineItems = tasks.map((task) => {
    const assignment = assignments.find((a) => a.task.id === task.id);
    const freelancer = assignment?.freelancer;
    const rate = freelancer?.hourlyRate || 800;
    const hours = task.estimatedHours || 0;
    const cost = rate * hours;

    return {
      task: task.title,
      freelancer: freelancer?.name || '—',
      hours,
      rate,
      cost,
    };
  });

  const subtotal = budget.subtotal || lineItems.reduce((sum, item) => sum + item.cost, 0);
  const platformFee = budget.platformFee || Math.round(subtotal * 0.08);
  const total = budget.total || subtotal + platformFee;

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-emerald-50">
          <Wallet className="w-5 h-5 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Odhad rozpočtu</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2 rounded-xl shadow-sm border border-slate-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-4 py-3 font-semibold text-slate-700">Úkol</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Freelancer</th>
                  <th className="px-4 py-3 font-semibold text-slate-700 text-right">Hodiny</th>
                  <th className="px-4 py-3 font-semibold text-slate-700 text-right">Sazba</th>
                  <th className="px-4 py-3 font-semibold text-slate-700 text-right">Cena</th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, i) => (
                  <tr key={i} className="border-t border-slate-100 hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 text-slate-900 font-medium">{item.task}</td>
                    <td className="px-4 py-3 text-slate-600">{item.freelancer}</td>
                    <td className="px-4 py-3 text-slate-600 text-right">{item.hours}h</td>
                    <td className="px-4 py-3 text-slate-600 text-right">{formatCZK(item.rate)}/h</td>
                    <td className="px-4 py-3 text-slate-900 font-medium text-right">
                      {formatCZK(item.cost)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-200">
                  <td colSpan={4} className="px-4 py-3 text-slate-600 text-right">
                    Mezisoučet
                  </td>
                  <td className="px-4 py-3 text-slate-900 font-medium text-right">
                    {formatCZK(subtotal)}
                  </td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td colSpan={4} className="px-4 py-3 text-slate-600 text-right">
                    Platforma fee (8%)
                  </td>
                  <td className="px-4 py-3 text-slate-900 font-medium text-right">
                    {formatCZK(platformFee)}
                  </td>
                </tr>
                <tr className="border-t-2 border-slate-300 bg-gradient-to-r from-blue-50 to-violet-50">
                  <td colSpan={4} className="px-4 py-3 text-slate-900 font-bold text-right">
                    Celkem s DPH
                  </td>
                  <td className="px-4 py-3 text-blue-600 font-bold text-right text-base">
                    {formatCZK(total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {budget.note && (
            <div className="px-4 py-3 bg-blue-50 border-t border-blue-100 text-xs text-blue-700">
              {budget.note}
            </div>
          )}
        </div>

        {/* Recharts Donut Chart */}
        <div className="rounded-xl shadow-sm border border-slate-200 bg-white p-6 flex items-center justify-center">
          {breakdown.length > 0 ? (
            <BudgetChart breakdown={breakdown} total={total} />
          ) : (
            <p className="text-sm text-slate-500 text-center">
              Rozdělení rozpočtu
            </p>
          )}
        </div>
      </div>

      <MarketComparison total={total} />
    </section>
  );
}
