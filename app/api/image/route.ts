import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limits";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "512x512" } = body;

        if(!userId) {
            return new NextResponse('No autorizado', { status: 401 });
        }

        if(!configuration.apiKey) {
            return new NextResponse('OpenAI API KEY no configurada', { status: 500 });
        }

        if(!prompt) {
            return new NextResponse('El Prompt es requerido', { status: 400 });
        }
        if(!amount) {
            return new NextResponse('La Cantidad es requerida', { status: 400 });
        }
        if(!resolution) {
            return new NextResponse('La Resolucion es requerida', { status: 400 });
        }

        const freeTrial = await checkApiLimit();

        if(!freeTrial) {
            return new NextResponse('Límite de prueba gratuito excedido', { status: 403 });
        }

        const response = await openai.createImage({
            prompt,
            n: parseInt(amount, 10),
            size: resolution
        });

        await increaseApiLimit();

        return NextResponse.json(response.data.data);

    } catch (error) {
        console.log('[IMAGE_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}