"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toastErrorAction } from "@/libs/toastUtils";
import { useRouter } from "next/navigation";

const SignupView = () => {
    const router = useRouter();
    const { toast } = useToast();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.post("/api/signup", {
                username,
                email,
                password,
            });

            toast({
                title: "Account created",
            });

            const res = await signIn("credentials", {
                email,
                password,
            });

            if (!res?.ok) {
                throw new Error("Unsuccessful signin");
            }

            router.push("/dashboard");
        } catch (error: any) {
            console.log(error);
            let toastParams = toastErrorAction(() => onSubmit());

            if (error?.response.data || error?.message) {
                toastParams.description = error?.response.data || error?.message;
            }

            toast(toastParams);
        } finally {
            setIsLoading(false);
        }
    }, [router, toast, username, email, password]);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>Enter your information to create an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">Username</Label>
                            <Input id="first-name" placeholder="Max" onChange={(e) => setUsername(e.target.value)} required />
                        </div>
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
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button type="submit" className="w-full" onClick={onSubmit} disabled={isLoading}>
                            Create an account
                        </Button>
                        <Button variant="outline" className="w-full" disabled={isLoading}>
                            Sign up with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignupView;
