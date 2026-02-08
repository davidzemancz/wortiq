import { useState } from 'react';
import { Clock, MessageSquare, GripVertical, AlertCircle } from 'lucide-react';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';

const priorityColors = {
  high: 'red',
  medium: 'amber',
  low: 'emerald',
};

const priorityLabels = {
  high: 'Vysoká',
  medium: 'Střední',
  low: 'Nízká',
};

const categoryIcons = {
  design: '🎨',
  development: '💻',
  testing: '🧪',
  devops: '🚀',
};

const categoryBorders = {
  design: 'border-l-violet-400',
  development: 'border-l-blue-400',
  testing: 'border-l-amber-400',
  devops: 'border-l-emerald-400',
};

export default function KanbanCard({ task, onDragStart }) {
  const [isDragging, setIsDragging] = useState(false);
  const assignedMember = task.assignedTo;

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('taskId', task.id);
        e.dataTransfer.effectAllowed = 'move';
        setIsDragging(true);
        onDragStart?.(task.id);
      }}
      onDragEnd={() => setIsDragging(false)}
      className={`
        bg-white rounded-lg border border-slate-200 border-l-[3px]
        ${categoryBorders[task.category] || 'border-l-slate-300'}
        p-4 shadow-sm hover:shadow-md transition-all duration-200
        cursor-grab active:cursor-grabbing group
        ${isDragging ? 'opacity-50 rotate-2 scale-95' : 'opacity-100'}
      `}
    >
      {/* Drag Handle + Title */}
      <div className="flex items-start gap-2 mb-2">
        <GripVertical className="w-4 h-4 text-slate-300 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
        <div className="flex-1 flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {task.category && (
              <span className="text-sm flex-shrink-0">{categoryIcons[task.category] || '📋'}</span>
            )}
            <h4 className="text-sm font-medium text-slate-900 leading-snug">
              {task.title}
            </h4>
          </div>
          {task.priority && (
            <Badge color={priorityColors[task.priority]}>
              {priorityLabels[task.priority]}
            </Badge>
          )}
        </div>
      </div>

      {/* Skills */}
      {task.skills && task.skills.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3 ml-6">
          {task.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[11px] bg-slate-50 text-slate-500 rounded-md px-2 py-0.5 border border-slate-100"
            >
              {skill}
            </span>
          ))}
          {task.skills.length > 3 && (
            <span className="text-[11px] text-slate-400">+{task.skills.length - 3}</span>
          )}
        </div>
      )}

      {/* Dependencies Warning */}
      {task.dependencies && task.dependencies.length > 0 && task.status === 'backlog' && (
        <div className="flex items-center gap-1.5 mb-2 ml-6 text-[11px] text-amber-600 bg-amber-50 rounded-md px-2 py-1">
          <AlertCircle className="w-3 h-3" />
          Závislosti: {task.dependencies.length}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 ml-6">
        <div className="flex items-center gap-3">
          {task.estimatedHours && (
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3 h-3" />
              {task.estimatedHours}h
            </span>
          )}
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            {task.comments || 0}
          </span>
        </div>

        {assignedMember && (
          <Avatar name={assignedMember} size="xs" />
        )}
      </div>
    </div>
  );
}
