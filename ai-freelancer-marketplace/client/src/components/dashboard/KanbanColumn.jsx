import { useState } from 'react';
import { Plus } from 'lucide-react';
import KanbanCard from './KanbanCard';

const columnLabels = {
  backlog: 'Backlog',
  inProgress: 'V řešení',
  review: 'Ke schválení',
  done: 'Dokončeno',
};

const columnColors = {
  backlog: 'bg-slate-400',
  inProgress: 'bg-amber-400',
  review: 'bg-blue-400',
  done: 'bg-emerald-400',
};

const columnBgColors = {
  backlog: 'bg-slate-50',
  inProgress: 'bg-amber-50/30',
  review: 'bg-blue-50/30',
  done: 'bg-emerald-50/30',
};

const dropIndicatorColors = {
  backlog: 'ring-slate-300 bg-slate-50',
  inProgress: 'ring-amber-300 bg-amber-50/50',
  review: 'ring-blue-300 bg-blue-50/50',
  done: 'ring-emerald-300 bg-emerald-50/50',
};

export default function KanbanColumn({ columnId, tasks, onDrop }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onDrop?.(taskId, columnId);
    }
  };

  return (
    <div
      className={`flex flex-col min-w-[280px] max-w-[320px] flex-1 transition-all duration-200 rounded-xl ${
        isDragOver ? `ring-2 ${dropIndicatorColors[columnId]} ring-offset-2 scale-[1.02]` : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${columnColors[columnId]}`} />
          <h3 className="text-sm font-semibold text-slate-700">
            {columnLabels[columnId]}
          </h3>
          <span className="text-xs text-slate-400 bg-slate-100 rounded-full px-2 py-0.5 font-medium">
            {tasks.length}
          </span>
        </div>
        <button
          className="min-w-[44px] min-h-[44px] rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Přidat úkol"
        >
          <Plus className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      <div className={`flex flex-col gap-3 ${columnBgColors[columnId]} rounded-xl p-3 min-h-[200px] transition-colors duration-200`}>
        {tasks.map((task) => (
          <KanbanCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className={`text-center py-8 text-sm text-slate-400 border-2 border-dashed rounded-lg transition-colors ${
            isDragOver ? 'border-blue-300 text-blue-400 bg-blue-50/50' : 'border-slate-200'
          }`}>
            {isDragOver ? 'Pusťte úkol zde' : 'Přetáhněte úkol sem'}
          </div>
        )}
        {isDragOver && tasks.length > 0 && (
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center text-sm text-blue-400 bg-blue-50/50 animate-pulse">
            Pusťte úkol zde
          </div>
        )}
      </div>
    </div>
  );
}
