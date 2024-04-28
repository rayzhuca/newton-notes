import SideBreadCrumb from "../side/breadcrumb";
import { Input } from "../ui/input";
import GalleryList from "./gallery-list";
import axios from "axios";
import { useEffect, useState } from 'react';

const lol = {
    title: "A1",
    course: "B1",
    lecture: 11,
    professor: "C1",
    year: "D1",
    description: "E1",
};

const demoItems = [
    {
        title: "A",
        course: "B",
        lecture: 1,
        professor: "C",
        year: "D",
        description: "E",
    },
    lol,
    lol,
    lol,
    lol,
];

const GalleryTab = () => {
    const [items, setItems] = useState<any[]>();
    
    useEffect(() => {
        const fetcher = async () => {
            try {
                const response = await axios.post("/api/gallery");
                setItems(response.data);
            } catch (error) {
                console.error("Fetching Issue:", error);
            }
        };
        fetcher();
    }, []);

    return (
        <div className="w-full h-full bg-light relative flex justify-center items-center">
            <SideBreadCrumb content={["Dashboard", "Gallery"]} className="absolute top-4 left-4" />
            <div className="w-2/3 h-full py-8 flex flex-col gap-2">
                <h2 className="text-xl font-semibold">Results</h2>
                <div className="flex">
                    <Input className="w-1/2" type="text" placeholder="Search here" />
                </div>
                {items?.length && <GalleryList items={items} pages={items.length} currentPage={1} />}
            </div>
        </div>
    );
};

export default GalleryTab;
