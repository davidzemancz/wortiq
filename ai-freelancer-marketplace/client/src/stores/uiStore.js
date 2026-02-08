import { create } from 'zustand';

let toastIdCounter = 0;

const useUIStore = create((set) => ({
  isMobileMenuOpen: false,
  activeTab: 'kanban',
  isFreelancerModalOpen: false,
  selectedFreelancerId: null,
  toasts: [],

  // Actions
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  openFreelancerModal: (id) =>
    set({ isFreelancerModalOpen: true, selectedFreelancerId: id }),

  closeFreelancerModal: () =>
    set({ isFreelancerModalOpen: false, selectedFreelancerId: null }),

  addToast: (toast) =>
    set((state) => {
      const id = ++toastIdCounter;
      const newToast = {
        id,
        type: 'info',
        duration: 4000,
        ...toast,
      };

      // Auto-remove after duration
      if (newToast.duration > 0) {
        setTimeout(() => {
          set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
        }, newToast.duration);
      }

      return { toasts: [...state.toasts, newToast] };
    }),

  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export { useUIStore };
export default useUIStore;
