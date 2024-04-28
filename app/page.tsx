"use client";

import PlaneSculpt from "@/components/index/PlaneSculpt";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";

export default function Page() {
    const { data: currentUser } = useCurrentUser();

    const launchLink = "/dashboard";

    return (
        <main className="w-full h-screen p-16">
            <section className="absolute w-5/12 h-1/2 top-[19%] flex flex-col gap-2">
                <Logo />
                <h2 className="text-2xl mt-4">Your classroom&apos;s personal assistant</h2>
                <h1 className="text-3xl font-extrabold tracking-tight">NewtonNotes</h1>
                <Button className="w-24 mt-4">
                    <Link href={launchLink}>Launch</Link>
                </Button>
            </section>
            <h2 className="text-xl absolute top-[calc(69%-1.25rem)] align-top">Take notes with LLMs</h2>
            <PlaneSculpt />
        </main>
    );
}
