import { ChevronLeft, ChevronRight, SquareArrowOutUpRight } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink} from "../ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { useState } from "react";

interface GalleryItem {
    title: string;
    course: string;
    lecture: number;
    professor: string;
    year: string;
    description: string;
}

interface GalleryListProps {
    items: GalleryItem[][];
    currentPage: number;
    pages: number;
}

type GalleryItemProp = keyof GalleryItem;

const galleryColumns: GalleryItemProp[] = ["title", "course", "professor", "year", "description"];

const GalleryList: React.FC<GalleryListProps> = ({ items, currentPage, pages }) => {
    const [curPage, changePage] = useState(currentPage);

    return (
        <div className="bg-background border border-border rounded-lg h-full pb-4 flex flex-col justify-between">
            <Table className="w-full h-1/2 table-fixed">
                <TableHeader>
                    <TableRow>
                        {galleryColumns.map((v, i) => (
                            <TableHead key={i} className={"first:pl-8 last:pr-8 capitalize"}>
                                {v}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items[curPage-1].map((v, i) => (
                        <TableRow key={i}>
                            {galleryColumns.map((col, k) => (
                                <TableCell key={i*k + k} className="first:pl-8">
                                    {v[col]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <Button className="w-10 p-3" variant="outline" disabled={curPage === 1} onClick={() => changePage(curPage-1)}>
                            <ChevronLeft />
                        </Button>
                    </PaginationItem>
                    {items.map((v, i) => {
                        return (
                            <PaginationItem key={i}>
                                <PaginationLink href="#" onClick={() => changePage(i+1)} isActive={i+1 == curPage}>
                                    {i+1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}
                    <PaginationItem>
                        <Button className="w-10 p-3" variant="outline" disabled={curPage === pages} onClick={() => changePage(curPage+1)}>
                            <ChevronRight />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default GalleryList;
