"use client";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Input } from "../ui/input";
import { Dispatch, useCallback, useReducer, useState } from "react";
import SideBreadCrumb from "../side/breadcrumb";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Mic } from "lucide-react";
import { toastErrorAction } from "@/libs/toastUtils";
import useNote from "@/hooks/useNote";

interface RecordSideProps {
    transcript: string;
    resetTranscript: () => void;
    listening: boolean;
    dispatchRecord: Dispatch<{ type: string }>;
}

const RecordSide: React.FC<RecordSideProps> = ({ transcript, resetTranscript, listening, dispatchRecord }) => {
    const {
        title,
        setTitle,
        lecture,
        setLecture,
        quarter,
        setQuarter,
        professor,
        setProfessor,
        course,
        setCourse,
        desc,
        setDesc,
        body,
        setBody,
    } = useNote();

    const { toast } = useToast();

    const onSave = useCallback(async () => {
        try {
            await axios.post("/api/save-transcript", {
                title,
                lecture,
                quarter,
                professor,
                course,
                desc,
                body: body || transcript,
            });
            toast({
                title: "Note saved!",
            });
        } catch (err) {
            console.log(err);
            toast(toastErrorAction(onSave));
        }
    }, [toast, body, desc, transcript, course, lecture, professor, quarter, title]);

    const onCompile = useCallback(async () => {
        try {
            let { data } = await axios.post("/api/transcript-compiler/", { text: transcript });
            let { desc, text: compiled } = data;
            setDesc(desc);
            setBody(compiled);
            toast({
                title: "Note compiled!",
            });
        } catch (err) {
            console.log(err);
            toast(toastErrorAction(onCompile));
        }
    }, [toast, transcript, setBody, setDesc]);

    const onDelete = useCallback(async () => {
        try {
            dispatchRecord({ type: "disable" });
            resetTranscript();
            setBody("");
        } catch (err) {
            console.log(err);
            toast(toastErrorAction(onDelete));
        }
    }, [toast, setBody, resetTranscript, dispatchRecord]);

    const onRecordToggle = () => {
        try {
            dispatchRecord({ type: "toggle" });
            if (listening) onCompile();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="min-w-[280px] h-full p-4 pr-6 flex flex-col gap-6 border-r overflow-auto">
            <SideBreadCrumb content={["Dashboard", "Record"]} />
            <fieldset className="flex gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">Control</legend>
                <div className="w-full flex flex-col gap-4">
                    <Button onClick={onRecordToggle}>
                        {listening ? "Stop" : "Record"}
                        <Mic className="ml-2 size-4" />
                    </Button>
                    <div className="grid gap-3">
                        <Label>Conciseness</Label>
                        <ToggleGroup type="single" defaultValue="s" variant="outline">
                            <ToggleGroupItem value="s">S</ToggleGroupItem>
                            <ToggleGroupItem value="m">M</ToggleGroupItem>
                            <ToggleGroupItem value="l">L</ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
            </fieldset>
            <fieldset className="flex gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">Organization</legend>
                <div className="w-full flex flex-col gap-4">
                    <div className="grid gap-1.5">
                        <Label>Title</Label>
                        <Input onChange={(e) => setTitle(e.target.value)} placeholder="Semaphores"></Input>
                    </div>
                    <div className="grid gap-1.5">
                        <Label>Course</Label>
                        <Input onChange={(e) => setCourse(e.target.value)} placeholder="ECS 150"></Input>
                    </div>
                    <div className="grid gap-1.5">
                        <Label>Professor</Label>
                        <Input onChange={(e) => setProfessor(e.target.value)} placeholder="Porquet"></Input>
                    </div>
                    <div className="grid gap-1.5">
                        <Label>Lecture</Label>
                        <Input onChange={(e) => setLecture(Number(e.target.value))} placeholder="1"></Input>
                    </div>
                    <div className="grid gap-1.5">
                        <Label>Quarter</Label>
                        <Input onChange={(e) => setQuarter(e.target.value)} placeholder="Fall"></Input>
                    </div>
                </div>
            </fieldset>
            <div className="flex justify-around *:px-6">
                <Button onClick={() => onSave()}>Save</Button>
                <Button onClick={() => onDelete()} className="bg-red-500 hover:bg-red-400">
                    Delete
                </Button>
            </div>
        </section>
    );
};

export default RecordSide;
