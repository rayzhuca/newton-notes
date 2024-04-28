"use client";

import { Bot, Shapes, User } from "lucide-react";
import { Button } from "../ui/button";
import { TooltipContent, Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import useTab, { TabType } from "@/hooks/useTab";

interface TabInfo {
    title: string;
    Icon: React.FC<any>;
    description: string;
}

export const tabInfos: Map<TabType, TabInfo> = new Map([
    [
        "record",
        {
            title: "Record",
            Icon: Bot,
            description: "Record",
        },
    ],
    [
        "gallery",
        {
            title: "Gallery",
            Icon: Shapes,
            description: "Gallery",
        },
    ],
    [
        "profile",
        {
            title: "Profile",
            Icon: User,
            description: "Profile",
        },
    ],
]);

const Navigation: React.FC = () => {
    const { tab, setTab } = useTab();

    return (
        <aside className="inset-y fixed left-0 t-[56px] z-20 flex h-full flex-col border-r bg-background">
            <nav className="grid gap-1 p-2">
                <TooltipProvider>
                    {Array.from(tabInfos).map(([k, v]) => (
                        <Tooltip key={v.title}>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => {
                                        setTab(k);
                                    }}
                                    variant={k === tab ? "default" : "ghost"}
                                    size="icon"
                                    className="rounded-lg"
                                    aria-label="Models"
                                >
                                    <v.Icon className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>{v.description}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </nav>
        </aside>
    );
};

export default Navigation;
