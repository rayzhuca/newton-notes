"use client";

import Navigation from "@/components/side/navigation";
import Header from "@/components/header";
import RecordTab from "@/components/record/record-tab";
import useTab, { TabType } from "@/hooks/useTab";
import GalleryTab from "@/components/gallery/gallery-tab";
import { useSpeechRecognition } from "react-speech-recognition";

const DashboardView: React.FC = () => {
    const { tab } = useTab();
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    return (
        <div className="flex h-screen w-full pl-[56px] pt-[56px]">
            <Header />
            <Navigation />
            {tab === "record" && (
                <RecordTab
                    transcript={transcript}
                    listening={listening}
                    resetTranscript={resetTranscript}
                    browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
                />
            )}
            {tab === "gallery" && <GalleryTab />}
        </div>
    );
};

export default DashboardView;
