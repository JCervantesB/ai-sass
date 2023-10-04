import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limits";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, history_prompt, text_temp, waveform_temp } = body;

        if(!userId) {
            return new NextResponse('No autorizado', { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        const freeTrial = await checkApiLimit();

        if(!freeTrial) {
            return new NextResponse('Límite de prueba gratuito excedido', { status: 403 });
        }

        const response = await replicate.run(
            "suno-ai/bark:b76242b40d67c76ab6742e987628a2a9ac019e11d56ab96c4e91ce03b79b2787",
            {
              input: {
                prompt: prompt,
                history_prompt: history_prompt,
                text_temp: parseFloat(text_temp),
                waveform_temp: parseFloat(waveform_temp),
              }
            }
          );
        
        await increaseApiLimit();
        return NextResponse.json(response);

    } catch (error) {
        console.log('BARK_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}