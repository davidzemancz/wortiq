import { Sparkles } from 'lucide-react';

const confidenceLevels = [
  { min: 90, label: 'Velmi vysoká', color: 'text-emerald-600', bg: 'bg-emerald-500', ring: 'ring-emerald-200' },
  { min: 75, label: 'Vysoká', color: 'text-blue-600', bg: 'bg-blue-500', ring: 'ring-blue-200' },
  { min: 60, label: 'Střední', color: 'text-amber-600', bg: 'bg-amber-500', ring: 'ring-amber-200' },
  { min: 0, label: 'Nízká', color: 'text-red-600', bg: 'bg-red-500', ring: 'ring-red-200' },
];

function getConfidenceLevel(score) {
  return confidenceLevels.find((l) => score >= l.min) || confidenceLevels[confidenceLevels.length - 1];
}

export default function ConfidenceIndicator({ score = 87, label = 'AI spolehlivost analýzy' }) {
  const level = getConfidenceLevel(score);

  return (
    <div className="rounded-xl shadow-sm border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-violet-500" />
        <span className="text-sm font-semibold text-slate-700">{label}</span>
      </div>

      {/* Circular progress */}
      <div className="flex items-center gap-5">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              className={level.bg.replace('bg-', 'stroke-')}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42 * (score / 100)} ${2 * Math.PI * 42}`}
              style={{
                transition: 'stroke-dasharray 1s ease-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-lg font-bold ${level.color}`}>{score}%</span>
          </div>
        </div>

        <div className="flex-1">
          <p className={`text-sm font-semibold ${level.color}`}>{level.label}</p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            AI model vyhodnotil zadání s vysokou mírou porozumění požadavkům projektu.
          </p>

          {/* Mini progress bars */}
          <div className="mt-3 space-y-1.5">
            {[
              { label: 'Porozumění zadání', value: Math.min(100, score + 5) },
              { label: 'Přesnost odhadu', value: Math.max(60, score - 8) },
              { label: 'Kvalita doporučení', value: Math.max(70, score - 3) },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-28 flex-shrink-0">{item.label}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${level.bg}`}
                    style={{
                      width: `${item.value}%`,
                      transition: 'width 1s ease-out',
                    }}
                  />
                </div>
                <span className="text-xs text-slate-500 w-8 text-right">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
