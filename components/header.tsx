"use client";

import { Share } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import ProfileDropdown from "./profile/profile-dropdown";
import Logo from "./logo";
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 w-full left-0 flex justify-between border-b z-30 bg-background">
            <div className="flex flex-row items-center">
                <div className="border-r p-2">
                    <Link className={buttonVariants({ variant: "outline", size: "icon" })} href="/" aria-label="Home">
                        <Logo />
                    </Link>
                </div>
                <h1 className="text-xl font-semibold pl-4">Newton Notes</h1>
            </div>
            <div className="flex flex-row items-center gap-1 mr-4">
                <Button variant="outline" size="sm" className="gap-1.5 text-sm">
                    <Share className="size-3.5" />
                    Export
                </Button>
                <ProfileDropdown />
            </div>
        </header>
    );
};

export default Header;
