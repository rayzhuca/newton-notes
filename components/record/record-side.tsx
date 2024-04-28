"use client";

import { Check, ChevronsUpDown, Mic } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { Dispatch, useReducer, useState } from "react";
import { cn } from "@/libs/utils";
import SideBreadCrumb from "../side/breadcrumb";

const languages = [{ value: "english", label: "English" }];

interface RecordSideProps {
    transcript: string;
    resetTranscript: () => void;
    listening: boolean;
    dispatchRecord: Dispatch<{ type: string }>;
}

const RecordSide: React.FC<RecordSideProps> = ({ listening, dispatchRecord }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
        <section className="h-full p-4 pr-6 flex flex-col gap-6 border-r">
            <SideBreadCrumb content={["Dashboard", "Record"]} />
            <fieldset className="flex gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">Control</legend>
                <div className="w-full flex flex-col gap-4">
                    <Button onClick={() => dispatchRecord({ type: "toggle" })}>
                        {listening ? "Stop" : "Record"}
                        <Mic className="ml-2 size-4" />
                    </Button>
                    <div className="grid gap-3">
                        <Label>Voice sensitivity</Label>
                        <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                    </div>
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
                    <div className="grid gap-3">
                        <Label>Lecture</Label>
                        <Input></Input>
                    </div>
                    <div className="grid gap-3">
                        <Label>Course</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                                    {value ? languages.find((v) => v.value === value)?.label : "Select language..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search framework..." />
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandGroup>
                                        {languages.map((v) => (
                                            <CommandItem
                                                key={v.value}
                                                value={v.value}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check className={cn("mr-2 h-4 w-4", value === v.value ? "opacity-100" : "opacity-0")} />
                                                {v.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </fieldset>
            <div className="flex justify-around *:px-6">
                <Button>Save</Button>
                <Button className="bg-red-500 hover:bg-red-400">Delete</Button>
            </div>
        </section>
    );
};

export default RecordSide;
