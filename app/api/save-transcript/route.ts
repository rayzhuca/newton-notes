import prisma from "@/libs/prismadb";

export async function POST(req: Request) {
    try {
        const { title, lecture, quarter, professor, course, desc, body } = await req.json();

        const note = await prisma.note.create({
            data: {
                title,
                lecture,
                quarter,
                professor,
                course,
                desc,
                body,
            },
        });

        return Response.json(note, {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response(null, {
            status: 400,
        });
    }
}
