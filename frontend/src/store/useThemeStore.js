import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("Livelink-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("Livelink-theme", theme);
    set({ theme });
  },
}));
