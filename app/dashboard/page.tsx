"use client";

import Navigation from "@/components/side/navigation";
import Header from "@/components/header";
import RecordTab from "@/components/record/record-tab";
import useTab, { TabType } from "@/hooks/useTab";

const tabMap: Map<TabType, React.FC> = new Map([["record", RecordTab]]);

const DashboardView: React.FC = () => {
    const { tab } = useTab();

    const Tab = tabMap.get(tab) || (() => <></>);

    return (
        <div className="flex h-screen w-full pl-[56px] pt-[56px]">
            <Header />
            <Navigation />
            <Tab />
        </div>
    );
};

export default DashboardView;
