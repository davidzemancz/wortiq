import { motion } from 'framer-motion';
import { Inbox, MessageSquare, Users, Activity, LayoutDashboard } from 'lucide-react';

const presets = {
  kanban: {
    icon: LayoutDashboard,
    title: 'Žádné úkoly',
    description: 'Kanban board je prázdný. Schvalte analýzu projektu pro přidání úkolů.',
  },
  chat: {
    icon: MessageSquare,
    title: 'Žádné zprávy',
    description: 'Zatím žádná komunikace. Zprávy se zde zobrazí po zahájení projektu.',
  },
  team: {
    icon: Users,
    title: 'Žádní členové týmu',
    description: 'Tým ještě nebyl sestaven. Schvalte analýzu pro automatické přiřazení freelancerů.',
  },
  activity: {
    icon: Activity,
    title: 'Žádná aktivita',
    description: 'Historie aktivit je prázdná. Události se budou zobrazovat průběžně.',
  },
  default: {
    icon: Inbox,
    title: 'Nic k zobrazení',
    description: 'Zde zatím nejsou žádná data.',
  },
};

export default function EmptyState({ type = 'default', title, description, action }) {
  const preset = presets[type] || presets.default;
  const Icon = preset.icon;
  const displayTitle = title || preset.title;
  const displayDescription = description || preset.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
        className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-5"
      >
        <Icon className="w-8 h-8 text-slate-400" />
      </motion.div>
      <h3 className="text-lg font-semibold text-slate-700 mb-1">
        {displayTitle}
      </h3>
      <p className="text-sm text-slate-500 max-w-xs">
        {displayDescription}
      </p>
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </motion.div>
  );
}
