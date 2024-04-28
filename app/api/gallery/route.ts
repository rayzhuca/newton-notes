import prisma from "@/libs/prismadb";

export async function POST(req: Request) {
    try {
        // const { title, lecture, quarter, professor, course, body } = await req.json();
        const gallery = await prisma.note.findMany();
        console.log(gallery);

        return Response.json(gallery, {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response(null, {
            status: 400,
        });
    }
}
