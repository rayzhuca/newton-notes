"use client";

import "regenerator-runtime/runtime";

import Navigation from "@/components/side/navigation";
import Header from "@/components/header";
import RecordTab from "@/components/record/record-tab";
import useTab from "@/hooks/useTab";
import GalleryTab from "@/components/gallery/gallery-tab";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useReducer } from "react";

const recordReducer = (record: boolean, action: { type: string }) => {
    if (!record) {
        SpeechRecognition.startListening({ continuous: true });
    } else {
        SpeechRecognition.stopListening();
    }
    return !record;
};

const DashboardView: React.FC = () => {
    const { tab } = useTab();
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [record, dispatchRecord] = useReducer(recordReducer, false);

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
                    dispatchRecord={dispatchRecord}
                />
            )}
            {tab === "gallery" && <GalleryTab />}
        </div>
    );
};

export default DashboardView;
