import OpenAI from "openai";

const openaiApiKey = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
    try {
        const { text: transcript } = await req.json();
        const openai = new OpenAI();
        console.log("transcript received:", transcript)
        const completion = await openai.chat.completions.create({
            messages: [
                {
                role: "system",
                content: "You are a helpful assistant designed to translate classroom lecture transcriptions into notes.",
                },
                { role: "user", content: transcript },
            ],
            model: "gpt-3.5-turbo",
          });
        console.log("GOT RESPONSE")
        console.log(completion.choices[0]);

        return Response.json(completion.choices[0], {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response(null, {
            status: 400,
        });
    }
}
