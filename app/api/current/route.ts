import serverAuth from "@/libs/serverAuth";

export async function GET() {
    try {
        const { currentUser } = await serverAuth();

        return Response.json(currentUser, {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return Response.json(null, {
            status: 400,
        });
    }
}
