 import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedBrandId: string | null;
  setSelectedBrandId: (id: string | null) => void;
}

const applyTheme = (theme: 'light' | 'dark') => {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      selectedBrandId: null,
      setSelectedBrandId: (id) => set({ selectedBrandId: id }),
    }),
    {
      name: 'ui-storage',
      onRehydrateStorage: () => (state) => {
        if (state?.theme) applyTheme(state.theme);
      },
    }
  )
);