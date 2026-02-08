import Avatar from '../ui/Avatar';
import useProjectStore from '../../stores/projectStore';

const statusLabels = {
  online: 'Online',
  offline: 'Offline',
  busy: 'Pracuje',
};

const statusColors = {
  online: 'bg-emerald-400',
  offline: 'bg-slate-300',
  busy: 'bg-amber-400',
};

export default function TeamOverview() {
  const team = useProjectStore((s) => s.dashboardState.team);

  if (team.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-slate-500">
        Tým bude zobrazen po spuštění projektu
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {team.map((member) => (
        <div
          key={member.id}
          className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <div className="relative">
            <Avatar name={member.role} size="md" />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                statusColors[member.status] || statusColors.offline
              }`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {member.role}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {member.currentTask || 'Žádný aktivní úkol'}
            </p>
          </div>

          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              member.status === 'busy'
                ? 'bg-amber-100 text-amber-700'
                : member.status === 'online'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {statusLabels[member.status] || 'Offline'}
          </span>
        </div>
      ))}
    </div>
  );
}
