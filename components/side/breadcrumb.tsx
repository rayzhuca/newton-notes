import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";

interface SideBreadCrumbProps {
    content: string[];
    className?: string;
}

const SideBreadCrumb: React.FC<SideBreadCrumbProps> = ({ content, className }) => {
    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                {content
                    .map((v) => [v, null])
                    .flat()
                    .slice(0, -1)
                    .map((v, i) => {
                        if (i % 2 == 0) {
                            return (
                                <BreadcrumbItem key={2 * i}>
                                    <BreadcrumbLink>{v}</BreadcrumbLink>
                                </BreadcrumbItem>
                            );
                        } else {
                            return <BreadcrumbSeparator key={2 * i + 1} />;
                        }
                    })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default SideBreadCrumb;
