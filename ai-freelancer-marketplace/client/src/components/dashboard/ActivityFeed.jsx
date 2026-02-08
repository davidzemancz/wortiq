import {
  Clock, PlayCircle, CheckCircle2, Upload, RefreshCw,
  GitBranch, MessageSquare, Star, AlertCircle,
} from 'lucide-react';
import useProjectStore from '../../stores/projectStore';

const activityIcons = {
  'zahájen': { icon: PlayCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  'aktualizoval': { icon: RefreshCw, color: 'text-blue-500', bg: 'bg-blue-50' },
  'nahrál': { icon: Upload, color: 'text-violet-500', bg: 'bg-violet-50' },
  'dokončil': { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  'komentoval': { icon: MessageSquare, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  'schválil': { icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
  'varování': { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  'default': { icon: GitBranch, color: 'text-slate-500', bg: 'bg-slate-50' },
};

function getActivityIcon(text) {
  for (const [keyword, config] of Object.entries(activityIcons)) {
    if (keyword !== 'default' && text.toLowerCase().includes(keyword)) {
      return config;
    }
  }
  return activityIcons.default;
}

export default function ActivityFeed() {
  const activities = useProjectStore((s) => s.dashboardState.activities);

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-slate-500">
        Zatím žádná aktivita
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[19px] top-6 bottom-6 w-px bg-slate-200" />

      <div className="space-y-0">
        {activities.map((activity, index) => {
          const iconConfig = getActivityIcon(activity.text);
          const Icon = iconConfig.icon;
          const isLast = index === activities.length - 1;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors relative group"
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${iconConfig.bg} flex items-center justify-center relative z-10`}>
                <Icon className={`w-4.5 h-4.5 ${iconConfig.color}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm text-slate-700 leading-snug">{activity.text}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-slate-300" />
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </div>
              </div>

              {/* Pulse for newest */}
              {index === 0 && (
                <span className="absolute left-[15px] top-[18px] flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
