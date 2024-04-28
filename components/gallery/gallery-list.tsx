import { ChevronLeft, ChevronRight, SquareArrowOutUpRight } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from "../ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import GalleryPagination from "./gallery-pagination";
import usePage from "@/hooks/usePage";
import { Skeleton } from "../ui/skeleton";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface GalleryItem {
    title: string;
    course: string;
    lecture: number;
    professor: string;
    createdAt: string;
    desc?: string;
    body: string;
    keypoints?: string[];
}

interface GalleryListProps {
    items: GalleryItem[];
    isLoading?: boolean;
}

type GalleryItemProp = keyof GalleryItem;

const galleryColumns: GalleryItemProp[] = ["title", "course", "professor", "createdAt", "desc"];
const galleryColumnDisplay: { [key: string]: string } = {
    title: "Title",
    course: "Course",
    professor: "Professor",
    createdAt: "Created",
    desc: "Description",
};
const galleryColumnMap: { [key: string]: any } = {
    createdAt: (s: string) => {
        return new Date(s).toLocaleDateString("en-gb", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    },
    desc: (s: string | undefined) => {
        return s || "N/A";
    },
};
const transformColumn = (col: string, v: string | number | undefined | string[]) => {
    if (col in galleryColumnMap) {
        return galleryColumnMap[col](v);
    }
    return v;
};

const download = (filename: string, text: string) => {
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

const GalleryList: React.FC<GalleryListProps> = ({ items, isLoading }) => {
    const { page } = usePage();
    const itemsPerPage = 5;

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [itemClicked, setItemClicked] = useState<number>(0);

    const validItemClicked = itemClicked >= 0 && itemClicked < items?.length;

    items = items || [];
    return (
        <div className="bg-background border border-border rounded-lg h-full pb-4 flex flex-col justify-between">
            <Table className="w-full h-1/2 table-fixed">
                <TableHeader>
                    <TableRow>
                        {galleryColumns.map((v, i) => (
                            <TableHead key={i} className={"first:pl-8 last:pr-8 capitalize hover:bg-inherit"}>
                                {galleryColumnDisplay[v]}
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
                              <TableRow key={i} className="cursor-pointer">
                                  {galleryColumns.map((col, k) => (
                                      <TableCell
                                          onClick={() => {
                                              setDialogOpen(true);
                                              setItemClicked((page - 1) * itemsPerPage + i);
                                          }}
                                          key={k}
                                          className="first:pl-8 h-8"
                                      >
                                          {col === "desc" ? (
                                              <TooltipProvider>
                                                  <Tooltip>
                                                      <TooltipTrigger asChild>
                                                          <div className="max-h-24 w-30 overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer">
                                                              {transformColumn(col, v[col])}
                                                          </div>
                                                      </TooltipTrigger>
                                                      <TooltipContent className="w-96">
                                                          <p>{transformColumn(col, v[col])}</p>
                                                      </TooltipContent>
                                                  </Tooltip>
                                              </TooltipProvider>
                                          ) : (
                                              <div className="max-h-24 overflow-auto">{transformColumn(col, v[col])}</div>
                                          )}
                                      </TableCell>
                                  ))}
                              </TableRow>
                          ))}
                </TableBody>
            </Table>
            <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
                <DialogContent className="sm:w-1/2">
                    <DialogHeader>
                        <DialogTitle>{validItemClicked ? items[itemClicked].title : "Untitled"}</DialogTitle>
                        <DialogDescription className="pt-2">{validItemClicked ? items[itemClicked].body : "Empty"}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={() =>
                                download(
                                    validItemClicked ? items[itemClicked].title : "Untitled",
                                    validItemClicked ? `${items[itemClicked].keypoints ? `Key points: \n${(items[itemClicked].keypoints || []).join("\n") }\n`: ""}${items[itemClicked].body}` : "Empty.",
                                )
                            }
                        >
                            Download
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <GalleryPagination maxPages={items.length / 5} />
        </div>
    );
};

export default GalleryList;
