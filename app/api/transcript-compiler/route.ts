import OpenAI from "openai";

export async function POST(req: Request) {
    try {
        const { text: transcript } = await req.json();
        const openai = new OpenAI();
        console.log("transcript received:", transcript);
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant designed to make useful notes from classroom lecture transcriptions.",
                },
                { role: "user", content: `The transcription is delimited by triple quotes.\n"""${transcript}"""` },
            ],
            model: "gpt-3.5-turbo",
        });
        const label = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant designed to make one sentence summaries from classroom lecture transcriptions.",
                },
                { role: "user", content: `The transcription is delimited by triple quotes.\n"""${transcript}"""` },
            ],
            model: "gpt-3.5-turbo",
        });
        console.log("GOT RESPONSE");
        console.log(completion.choices[0]);
        console.log(label.choices[0]);

        return Response.json(
            {
                desc: label.choices[0].message.content,
                text: completion.choices[0].message.content,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log(error);
        return new Response(null, {
            status: 400,
        });
    }
}
