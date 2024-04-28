"use client";

import { Clipboard } from "lucide-react";
import { Button } from "../ui/button";
import RecordSide from "./record-side";

interface RecordTabProps {
    transcript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
}

const RecordTab: React.FC<RecordTabProps> = ({ transcript, listening, resetTranscript, browserSupportsSpeechRecognition }) => {
    if (!browserSupportsSpeechRecognition) {
        <div className="flex items-center align-middle">
            <div className="text-2xl">Your browser does not support speech recognition. Please switch to Chrome.</div>
        </div>;
    }

    return (
        <div className="flex">
            <RecordSide transcript={transcript} resetTranscript={resetTranscript} />
            <div className="h-full grow-[2] py-4 px-32 flex flex-col gap-4 relative">
                <div className="grow-[3] rounded-md bg-background relative flex flex-col overflow-auto">
                    <div className="flex justify-between items-center">
                        <Button variant="ghost" className="p-2 h-6 bg-background my-2 ml-4 rounded-md">
                            Output
                        </Button>
                        <Button variant="ghost" className="p-0 w-6 h-6 mr-4">
                            <Clipboard className="size-3" />
                        </Button>
                    </div>
                    <div className="w-full *:w-full px-6 pt-2 last:mb-4 h-full">
                        <h3 className="text-2xl font-semibold tracking-tight pb-3">Notes on Earth</h3>
                        <p className="text-sm leading-6 font-normal">{transcript}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecordTab;
