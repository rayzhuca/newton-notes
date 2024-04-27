import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { typeEquals } from "@/libs/utils";

export async function POST(req: Request) {
    try {
        const { username, email, password } = await req.json();

        if (!typeEquals([username, email, password], ["string", "string", "string"])) {
            return Response.json("Invalid request", { status: 400 });
        }

        if (password.length < 6) {
            return Response.json("Password is too short", { status: 400 });
        }

        const [usernameExists, emailExists, hashedPassword] = await Promise.all([
            prisma.user.findUnique({
                where: { username },
            }),
            prisma.user.findUnique({
                where: { email },
            }),
            bcrypt.hash(password, 12),
        ]);

        if (usernameExists) {
            return Response.json("User with same username exists", { status: 400 });
        }

        if (emailExists) {
            return Response.json("User with same email exists", { status: 400 });
        }

        const user = await prisma.user.create({
            data: {
                username,
                email,
                hashedPassword,
            },
        });

        return Response.json(user, {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response(null, {
            status: 400,
        });
    }
}
