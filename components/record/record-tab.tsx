"use client";

import { Clipboard } from "lucide-react";
import { Button } from "../ui/button";
import RecordSide from "./record-side";
import { Dispatch, useState } from "react";
import useNote from "@/hooks/useNote";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface RecordTabProps {
    transcript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
    dispatchRecord: Dispatch<{ type: string }>;
}

const RecordTab: React.FC<RecordTabProps> = ({
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    dispatchRecord,
}) => {
    const { title, desc, body } = useNote();

    if (!browserSupportsSpeechRecognition) {
        <div className="flex items-center align-middle">
            <div className="text-2xl">Your browser does not support speech recognition. Please switch to Chrome.</div>
        </div>;
    }

    return (
        <div className="flex w-full">
            <RecordSide transcript={transcript} resetTranscript={resetTranscript} listening={listening} dispatchRecord={dispatchRecord} />
            <div className="h-full grow py-4 px-32 flex flex-col gap-4 relative">
                <Tabs defaultValue="transcription" className="w-full h-full">
                    <TabsList className="h-8 p-1">
                        <TabsTrigger className="text-xs w-fit p-1 mr-2" value="transcription">
                            Transcription
                        </TabsTrigger>
                        <TabsTrigger className="text-xs w-fit p-1" value="compiled">
                            Compiled
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="transcription">
                        <div className="w-full *:w-full pt-2 last:mb-4 h-full">
                            <h3 className="text-2xl font-semibold tracking-tight pb-3">{title ? title : "Untitled"}</h3>
                            <p className="text-sm leading-6 font-normal">
                                {transcript ? transcript : "Your transcription will appear here"}
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent value="compiled">
                        <div className="w-full *:w-full pt-2 last:mb-4 h-full *:pt-2">
                            <h3 className="text-2xl font-semibold tracking-tight">{title ? title : "Untitled"}</h3>
                            <h5 className="text-lg font-semibold tracking-tight">Summary</h5>
                            <p className="text-sm">{`${desc}\n`}</p>
                            <h5 className="text-lg font-semibold tracking-tight">Content</h5>
                            <p className="text-sm leading-6 font-normal">
                                {body ? body : "Your compiled notes will appear here after you stop recording."}
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>
                {/* <div className="grow-[3] rounded-md bg-background relative flex flex-col overflow-auto">
                    <div className="flex justify-between items-center">
                        <Button variant="ghost" className="p-2 h-6 bg-background my-2 ml-4 rounded-md">
                            Output
                        </Button>
                        <Button variant="ghost" className="p-0 w-6 h-6 mr-4">
                            <Clipboard className="size-3" />
                        </Button>
                    </div>
                    <div className="w-full *:w-full px-6 pt-2 last:mb-4 h-full">
                        <h3 className="text-2xl font-semibold tracking-tight pb-3">{title}</h3>
                        <p className="text-sm leading-6 font-normal">{transcript}</p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default RecordTab;
