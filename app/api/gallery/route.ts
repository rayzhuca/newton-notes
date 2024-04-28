import prismadb from "@/libs/prismadb";

export async function POST(req: Request) {
    try {
        let { query } = await req.json();

        if (!query) {
            query = "";
        }

        const notes = await prismadb.note.findMany({
            where: {
                title: {
                    contains: query,
                    mode: "insensitive",
                },
            },
        });

        return Response.json(notes, {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return Response.json(null, {
            status: 400,
        });
    }
}
