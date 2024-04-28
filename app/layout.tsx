"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "regenerator-runtime/runtime";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <title>Newton Notes</title>
            </head>
            <body className={inter.className}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
