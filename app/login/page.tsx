"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const LoginView = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (!res?.ok) {
                throw new Error("Unsuccessful signin");
            }

            router.push("/dashboard");
        } catch (error) {
            console.log(error);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast, router, email, password]);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <Button type="submit" onClick={() => onSubmit()} className="w-full" disabled={isLoading}>
                            Login
                        </Button>
                        <Button onClick={() => signIn("google")} variant="outline" className="w-full" disabled={isLoading}>
                            Login with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginView;
