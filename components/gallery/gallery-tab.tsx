import SideBreadCrumb from "../side/breadcrumb";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import GalleryList from "./gallery-list";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const GalleryTab = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<any>(null);
    const [query, setQuery] = useState("");

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post("/api/gallery", {
                query,
            });
            setItems(data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoading, setItems, query]);

    return (
        <div className="w-full h-full bg-light relative flex justify-center items-center">
            <SideBreadCrumb content={["Dashboard", "Gallery"]} className="absolute top-4 left-4" />
            <div className="w-2/3 h-full py-12 flex flex-col gap-2">
                <h2 className="text-xl font-semibold">Results</h2>
                <div className="flex gap-4 items-center">
                    <Input
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-1/2"
                        type="text"
                        placeholder="Search for any note title here"
                    />
                    <Button onClick={() => onSubmit()}>Search</Button>
                </div>
                <GalleryList items={items} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default GalleryTab;
