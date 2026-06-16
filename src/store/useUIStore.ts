import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedBrandId: string | null;
  setSelectedBrandId: (id: string | null) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => {
        const root = window.document.documentElement;
        if (theme === "dark") {
          root.classList.add("dark");
          root.classList.remove("light");
        } else {
          root.classList.add("light");
          root.classList.remove("dark");
        }
        set({ theme });
      },
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      selectedBrandId: null,
      setSelectedBrandId: (id) => set({ selectedBrandId: id }),
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({
        theme: state.theme,
        selectedBrandId: state.selectedBrandId,
      }),
    },
  ),
);
