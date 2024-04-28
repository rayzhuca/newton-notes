import { create } from "zustand";

interface NoteStore {
    title: string;
    lecture: number;
    quarter: string;
    professor: string;
    course: string;
    body: string;
    desc: string;
    keypoints: string[];
    setTitle: (title: string) => void;
    setLecture: (lecture: number) => void;
    setQuarter: (quarter: string) => void;
    setProfessor: (professor: string) => void;
    setCourse: (course: string) => void;
    setDesc: (desc: string) => void;
    setBody: (body: string) => void;
    setKeypoints: (keypoints: string[]) => void;
}

const useNote = create<NoteStore>((set) => ({
    title: "",
    lecture: 1,
    quarter: "",
    professor: "",
    course: "",
    body: "",
    desc: "",
    keypoints: [],
    setTitle: (title) => set({ title }),
    setLecture: (lecture) => set({ lecture }),
    setQuarter: (quarter) => set({ quarter }),
    setProfessor: (professor) => set({ professor }),
    setCourse: (course) => set({ course }),
    setDesc: (desc) => set({ desc }),
    setBody: (body) => set({ body }),
    setKeypoints: (keypoints) => set({ keypoints }),
}));

export default useNote;
