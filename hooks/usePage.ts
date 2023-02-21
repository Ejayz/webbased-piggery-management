import { create } from "zustand";

export const usePage = create((set, get) => ({
  page: 1,
  incrementPage: async () => set((state: any) => ({ page: state.page + 1 })),
  resetPage: async () => set({ page: 1 }),
  decrementPage: async () =>
    set((state: any) => ({ page: state.page == 0 ? 1 : state.page - 1 })),
}));
