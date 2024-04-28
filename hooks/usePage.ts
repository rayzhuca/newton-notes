import { create } from "zustand";

interface PageStore {
    page: number;
    increasePage: () => void;
    decreasePage: () => void;
}

const useTab = create<PageStore>((set) => ({
    page: 1,
    increasePage: () => set((state) => ({ page: state.page + 1 })),
    decreasePage: () => set((state) => ({ page: Math.max(1, state.page - 1) })),
}));

export default useTab;
