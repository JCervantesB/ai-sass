import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limits";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const instructionMessage: ChatCompletionRequestMessage = {
    role: 'system',
    content: 'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.'
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

        const freeTrial = await checkApiLimit();

        if(!freeTrial) {
            return new NextResponse('Límite de prueba gratuito excedido', { status: 403 });
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages],
        });

        await increaseApiLimit();

        return NextResponse.json(response.data.choices[0].message);

    } catch (error) {
        console.log('[CODE_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}