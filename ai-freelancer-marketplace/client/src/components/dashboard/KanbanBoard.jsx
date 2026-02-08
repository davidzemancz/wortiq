import useProjectStore from '../../stores/projectStore';
import KanbanColumn from './KanbanColumn';

const COLUMN_ORDER = ['backlog', 'inProgress', 'review', 'done'];

export default function KanbanBoard() {
  const columns = useProjectStore((s) => s.dashboardState.columns);
  const moveTask = useProjectStore((s) => s.moveTask);

  const handleDrop = (taskId, toColumnId) => {
    // Find which column the task is currently in
    for (const colId of COLUMN_ORDER) {
      const col = columns[colId] || [];
      if (col.some((t) => t.id === taskId)) {
        if (colId !== toColumnId) {
          moveTask(taskId, colId, toColumnId);
        }
        break;
      }
    }
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {COLUMN_ORDER.map((colId) => (
          <KanbanColumn
            key={colId}
            columnId={colId}
            tasks={columns[colId] || []}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
}
