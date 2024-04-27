import { create } from "zustand";

export type TabType = "record" | "gallery" | "profile";

interface TabStore {
    tab: TabType;
    setTab: (tab: TabType) => void;
}

const useTab = create<TabStore>((set) => ({
    tab: "record",
    setTab: (tab) => set({ tab }),
}));

export default useTab;
