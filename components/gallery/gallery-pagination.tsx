import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "../ui/pagination";
import usePage from "@/hooks/usePage";
import { Input } from "../ui/input";

interface GalleryPaginationProps {
    maxPages: number;
}

const GalleryPagination: React.FC<GalleryPaginationProps> = ({ maxPages }) => {
    const { page, decreasePage, increasePage } = usePage();

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button onClick={decreasePage} className="w-10 p-3" variant="outline" disabled={page === 1}>
                        <ChevronLeft />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        {page}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <Button onClick={increasePage} className="w-10 p-3" variant="outline" disabled={page >= maxPages}>
                        <ChevronRight />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default GalleryPagination;
