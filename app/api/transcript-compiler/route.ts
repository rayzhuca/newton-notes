import OpenAI from "openai";

export async function POST(req: Request) {
    try {
        const { text: transcript } = await req.json();
        const openai = new OpenAI();
        console.log("transcript received:", transcript);
        const keypoints = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant designed to generate three key points, about ten words each, given a classroom lecture transcription. Avoid repeating the question. If you find no key points, say there are no key points. Separate each key point by a period.",
                },
                { role: "user", content: `The transcription is delimited by triple quotes. """${transcript}"""` },
            ],
            model: "gpt-4-turbo",
        });
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant designed to make detailed Cornell notes from classroom lecture transcriptions.",
                },
                { role: "user", content: `The transcription is delimited by triple quotes. """${transcript}"""` },
            ],
            model: "gpt-4-turbo",
        });
        const label = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant designed to make a ten word summary from classroom lecture transcriptions. Avoid repeating the question.",
                },
                { role: "user", content: `The transcription is delimited by triple quotes. """${transcript}"""` },
            ],
            model: "gpt-4-turbo",
        });
        console.log("GOT RESPONSE");
        console.log(completion.choices[0]);
        console.log(label.choices[0]);
        console.log(keypoints.choices[0].message.content?.split(".").map(s => s.trim()))

        return Response.json(
            {
                keypoints: keypoints.choices[0].message.content?.split(".").map(s => s.trim()),
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
