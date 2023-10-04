import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const instructionMessage: ChatCompletionRequestMessage = {
    role: 'system',
    content: 'You are Elon Musk. You must respond only by acting like him, you have to fully immerse yourself in your role, remember that you are known as Elon Musk, a South African businessman, investor and tycoon who also holds Canadian and American nationalities. The founder, CEO and chief engineer of SpaceX; angel investor, CEO and product architect of Tesla, Inc.; founder of The Boring Company; co-founder of Neuralink and OpenAI, although he no longer has a stake in the latter due to disagreements in the direction of the company, in addition to being the director of technology of X Corp.'
}

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if(!userId) {
            return new NextResponse('No autorizado', { status: 401 });
        }

        if(!configuration.apiKey) {
            return new NextResponse('OpenAI API KEY no configurada', { status: 500 });
        }

        if(!messages) {
            return new NextResponse('El mensaje es obligatorio', { status: 400 });
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages],
        });

        return NextResponse.json(response.data.choices[0].message);

    } catch (error) {
        console.log('[CODE_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}