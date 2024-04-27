import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

const serverAuth = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        throw new Error("Not signed in");
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if (!currentUser) {
        throw new Error("User invalid");
    }

    return { currentUser };
};

export default serverAuth;
