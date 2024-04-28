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
                    content: "You are a helpful assistant designed to generate three key points, about ten words each given a classroom lecture transcription. Avoid repeating the question. If you find no key points, say there are no key points. An example of a response could be the following statement: Leviathan was written by Thomas Hobbes. Hobbes was not a liberalist thinker. Hobbes believed in Erastianism or that the church should be ruled by the state.",
                },
                { role: "user", content: `The transcription is delimited by triple quotes.\n"""${transcript}"""` },
            ],
            model: "gpt-3.5-turbo",
        });
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant designed to make detailed Cornell notes from classroom lecture transcriptions.",
                },
                { role: "user", content: `The transcription is delimited by triple quotes.\n"""${transcript}"""` },
            ],
            model: "gpt-3.5-turbo",
        });
        const label = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant designed to make ten word summaries from classroom lecture transcriptions. Avoid repeating the question. An example of a response",
                },
                { role: "user", content: `The transcription is delimited by triple quotes.\n"""${transcript}"""` },
            ],
            model: "gpt-3.5-turbo",
        });
        console.log("GOT RESPONSE");
        console.log(completion.choices[0]);
        console.log(label.choices[0]);
        console.log(keypoints.choices[0])

        return Response.json(
            {
                keypoints: keypoints.choices[0].message.content?.split(". "),
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
