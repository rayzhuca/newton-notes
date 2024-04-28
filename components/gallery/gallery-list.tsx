import { ChevronLeft, ChevronRight, SquareArrowOutUpRight } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from "../ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import GalleryPagination from "./gallery-pagination";
import usePage from "@/hooks/usePage";
import { Skeleton } from "../ui/skeleton";

interface GalleryItem {
    title: string;
    course: string;
    lecture: number;
    professor: string;
    year: string;
    description: string;
}

interface GalleryListProps {
    items: GalleryItem[];
    isLoading?: boolean;
}

type GalleryItemProp = keyof GalleryItem;

const galleryColumns: GalleryItemProp[] = ["title", "course", "professor", "year", "description"];

const GalleryList: React.FC<GalleryListProps> = ({ items, isLoading }) => {
    const { page } = usePage();
    const itemsPerPage = 5;

    items = items || [];
    return (
        <div className="bg-background border border-border rounded-lg h-full pb-4 flex flex-col justify-between">
            <Table className="w-full h-1/2 table-fixed">
                <TableHeader>
                    <TableRow>
                        {galleryColumns.map((v, i) => (
                            <TableHead key={i} className={"first:pl-8 last:pr-8 capitalize hover:bg-inherit"}>
                                {v}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading
                        ? Array(5)
                              .fill(null)
                              .map((_, i) => (
                                  <TableRow key={i}>
                                      {galleryColumns.map((_, k) => (
                                          <TableCell key={k} className="first:pl-8">
                                              <Skeleton className="w-full h-10" />
                                          </TableCell>
                                      ))}
                                  </TableRow>
                              ))
                        : items.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((v, i) => (
                              <TableRow key={i}>
                                  {galleryColumns.map((col, k) => (
                                      <TableCell key={k} className="first:pl-8">
                                          {v[col]}
                                      </TableCell>
                                  ))}
                              </TableRow>
                          ))}
                </TableBody>
            </Table>
            <GalleryPagination maxPages={items.length / 5} />
        </div>
    );
};

export default GalleryList;
