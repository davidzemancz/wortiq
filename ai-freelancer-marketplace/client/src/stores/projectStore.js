import { create } from 'zustand';
import { generateMockAnalysis } from '../data/mockAnalysis';
import { detectProjectType } from '../data/projectTemplates';

const useProjectStore = create((set, get) => ({
  // Input phase
  projectDescription: '',
  budget: null,
  deadline: null,
  categories: [],

  // Quiz phase
  detectedProjectType: null,
  quizAnswers: null,
  showQuiz: false,

  // Analysis phase
  isAnalyzing: false,
  analysisResult: null,
  analysisError: null,

  // Dashboard phase (mock state)
  dashboardState: {
    columns: {
      backlog: [],
      inProgress: [],
      review: [],
      done: [],
    },
    chat: [
      {
        id: 'msg-1',
        sender: 'AI Agent',
        text: 'Projekt byl úspěšně rozdělen do úkolů. Tým byl notifikován.',
        time: '10:30',
        isAgent: true,
      },
      {
        id: 'msg-2',
        sender: 'Vy',
        text: 'Jak probíhá práce na designu?',
        time: '10:32',
        isAgent: false,
      },
      {
        id: 'msg-3',
        sender: 'AI Agent',
        text: 'Design wireframů je v plném proudu. Odhadovaný progres: 40%. Chcete, abych vám poslal preview?',
        time: '10:32',
        isAgent: true,
      },
      {
        id: 'msg-4',
        sender: 'Vy',
        text: 'Ano, prosím.',
        time: '10:35',
        isAgent: false,
      },
      {
        id: 'msg-5',
        sender: 'AI Agent',
        text: 'Posílám link na Figma preview. Zároveň jsem požádal backendového vývojáře o přípravu databázové struktury, aby mohl začít s backendem hned po schválení designu.',
        time: '10:35',
        isAgent: true,
      },
    ],
    team: [],
    activities: [
      { id: 'act-1', text: 'Projekt zahájen', time: 'včera' },
      { id: 'act-2', text: 'AI agent aktualizoval harmonogram', time: 'před 3 hodinami' },
      { id: 'act-3', text: 'Designér nahrál wireframy', time: 'před 2 hodinami' },
      { id: 'act-4', text: 'Backend vývojář dokončil databázový návrh', time: 'před 1 hodinou' },
    ],
  },

  // Actions
  setProjectDescription: (desc) => set({ projectDescription: desc }),

  setBudget: (budget) => set({ budget }),

  setDeadline: (deadline) => set({ deadline }),

  toggleCategory: (cat) =>
    set((state) => ({
      categories: state.categories.includes(cat)
        ? state.categories.filter((c) => c !== cat)
        : [...state.categories, cat],
    })),

  // Quiz actions
  startQuiz: () => {
    const { projectDescription } = get();
    const detectedType = detectProjectType(projectDescription) || 'generic';

    console.log('🔍 Detected project type:', detectedType);

    set({
      detectedProjectType: detectedType,
      showQuiz: true,
    });
  },

  completeQuiz: (answers) => {
    console.log('📝 Quiz completed with answers:', answers);
    set({
      quizAnswers: answers,
      showQuiz: false,
    });
  },

  cancelQuiz: () => {
    set({
      showQuiz: false,
      detectedProjectType: null,
    });
  },

  analyzeProject: async () => {
    const { projectDescription, quizAnswers } = get();

    console.log('🎬 DEMO MODE: Using mock analysis data');
    console.log('📝 Project description:', projectDescription);
    console.log('📋 Quiz answers:', quizAnswers);

    set({ isAnalyzing: true, analysisError: null });

    try {
      // Simulate API delay for realistic demo experience
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock analysis with quiz answers
      const analysisData = generateMockAnalysis(projectDescription, quizAnswers);

      console.log('✨ Mock analysis generated!');
      console.log('📦 Analysis Result:', analysisData);

      // Log task breakdown
      if (analysisData?.tasks) {
        console.log(`📋 Tasks generated: ${analysisData.tasks.length}`);
        console.table(analysisData.tasks.map(t => ({
          id: t.id,
          title: t.title,
          difficulty: t.difficulty,
          hours: t.estimatedHours,
          priority: t.priority
        })));
      }

      // Log budget
      if (analysisData?.budget) {
        console.log(`💰 Total Budget: ${analysisData.budget.total} ${analysisData.budget.currency}`);
      }

      set({
        analysisResult: analysisData,
        isAnalyzing: false,
      });

      return { success: true, data: analysisData };
    } catch (error) {
      console.error('❌ Analysis failed:', error);
      set({
        analysisError: error.message || 'Došlo k chybě při analýze projektu.',
        isAnalyzing: false,
      });
      throw error;
    }
  },

  resetProject: () =>
    set({
      projectDescription: '',
      budget: null,
      deadline: null,
      categories: [],
      detectedProjectType: null,
      quizAnswers: null,
      showQuiz: false,
      isAnalyzing: false,
      analysisResult: null,
      analysisError: null,
    }),

  moveTask: (taskId, from, to) =>
    set((state) => {
      const columns = { ...state.dashboardState.columns };
      const fromCol = [...(columns[from] || [])];
      const toCol = [...(columns[to] || [])];

      const taskIndex = fromCol.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return state;

      const [task] = fromCol.splice(taskIndex, 1);
      toCol.push(task);

      return {
        dashboardState: {
          ...state.dashboardState,
          columns: {
            ...columns,
            [from]: fromCol,
            [to]: toCol,
          },
        },
      };
    }),

  initDashboard: () => {
    const { analysisResult } = get();
    if (!analysisResult) return;

    const tasks = analysisResult.tasks || [];
    const team = analysisResult.suggestedTeam || [];

    // Put first task in progress, rest in backlog
    const backlog = tasks.slice(1).map((t) => ({
      ...t,
      status: 'backlog',
    }));
    const inProgress = tasks.slice(0, 1).map((t) => ({
      ...t,
      status: 'inProgress',
    }));

    const teamMembers = team.map((member, i) => ({
      ...member,
      id: `member-${i + 1}`,
      status: i === 0 ? 'busy' : 'online',
      currentTask: i === 0 && tasks[0] ? tasks[0].title : null,
    }));

    set((state) => ({
      dashboardState: {
        ...state.dashboardState,
        columns: {
          backlog,
          inProgress,
          review: [],
          done: [],
        },
        team: teamMembers,
      },
    }));
  },
}));

export { useProjectStore };
export default useProjectStore;
