import { ToastAction } from "@/components/ui/toast";
import { ToasterToast } from "@/components/ui/use-toast";
import { MouseEventHandler } from "react";

export const toastError = {
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: "There was a problem with your request.",
};

export const toastErrorAction = (onClick?: MouseEventHandler<HTMLButtonElement> | undefined): Omit<ToasterToast, "id"> => {
    return {
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (
            <ToastAction onClick={onClick} altText="Try again">
                Try again
            </ToastAction>
        ),
    };
};
