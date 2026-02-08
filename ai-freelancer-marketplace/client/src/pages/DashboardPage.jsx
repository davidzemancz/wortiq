import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, MessageSquare, Users, Activity, BarChart3, Bell } from 'lucide-react';
import useProjectStore from '../stores/projectStore';
import useUIStore from '../stores/uiStore';
import KanbanBoard from '../components/dashboard/KanbanBoard';
import ChatPanel from '../components/dashboard/ChatPanel';
import TeamOverview from '../components/dashboard/TeamOverview';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import ProjectProgress from '../components/dashboard/ProjectProgress';
import MetricsDashboard from '../components/dashboard/MetricsDashboard';
import Badge from '../components/ui/Badge';
import { DashboardSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';

const TABS = [
  { id: 'kanban', label: 'Kanban', icon: LayoutDashboard },
  { id: 'metrics', label: 'Metriky', icon: BarChart3, badge: 'Nové' },
  { id: 'chat', label: 'Chat', icon: MessageSquare, notification: true },
  { id: 'team', label: 'Tým', icon: Users },
  { id: 'activity', label: 'Aktivita', icon: Activity },
];

const tabContentVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const analysisResult = useProjectStore((s) => s.analysisResult);
  const dashboardState = useProjectStore((s) => s.dashboardState);
  const initDashboard = useProjectStore((s) => s.initDashboard);
  const activeTab = useUIStore((s) => s.activeTab);
  const setActiveTab = useUIStore((s) => s.setActiveTab);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!analysisResult) {
      navigate('/new-project');
      return;
    }
    initDashboard();
    // Brief skeleton loading for polished init feel
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [analysisResult, initDashboard, navigate]);

  if (!analysisResult) return null;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const projectName = analysisResult.projectName || 'Projekt';

  // Check if dashboard has data for empty states
  const hasKanbanTasks = dashboardState?.columns &&
    Object.values(dashboardState.columns).some((col) => col.length > 0);
  const hasChatMessages = dashboardState?.chat?.length > 0;
  const hasTeamMembers = dashboardState?.team?.length > 0;
  const hasActivities = dashboardState?.activities?.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {projectName}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge color="amber">V průběhu</Badge>
              <span className="text-sm text-slate-500">
                {analysisResult.estimatedDuration?.description || ''}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Oznámení"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
            </button>
          </div>
        </div>

        <ProjectProgress />
      </div>

      {/* Tab navigation with animated underline */}
      <div className="flex gap-1 mb-6 border-b border-slate-200 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'text-blue-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.badge && (
                <span className="text-[10px] bg-violet-100 text-violet-600 rounded-full px-1.5 py-0.5 font-medium leading-none">
                  {tab.badge}
                </span>
              )}
              {tab.notification && (
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="dashboardActiveTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content with animated transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabContentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'kanban' && (
            hasKanbanTasks ? <KanbanBoard /> : <EmptyState type="kanban" />
          )}
          {activeTab === 'metrics' && <MetricsDashboard />}
          {activeTab === 'chat' && (
            hasChatMessages ? (
              <div className="bg-white rounded-xl border border-slate-200 h-[600px] shadow-sm">
                <ChatPanel />
              </div>
            ) : (
              <EmptyState type="chat" />
            )
          )}
          {activeTab === 'team' && (
            hasTeamMembers ? (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Členové týmu
                </h2>
                <TeamOverview />
              </div>
            ) : (
              <EmptyState type="team" />
            )
          )}
          {activeTab === 'activity' && (
            hasActivities ? (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Aktivita projektu
                  </h2>
                  <span className="text-xs text-slate-500">
                    Posledních 24 hodin
                  </span>
                </div>
                <ActivityFeed />
              </div>
            ) : (
              <EmptyState type="activity" />
            )
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
