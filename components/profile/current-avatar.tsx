"use client";

import { UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CurrentAvatar: React.FC = () => {
    return (
        <Avatar className="ml-2 border">
            <AvatarImage className="size-5" />
            <AvatarFallback>
                <UserCircle2 className="size-5" />
            </AvatarFallback>
        </Avatar>
    );
};

export default CurrentAvatar;
