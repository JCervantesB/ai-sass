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
        const { prompt, scale, face_enhance = false } = body;

        if(!userId) {
            return new NextResponse('No autorizado', { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }        

        if (!scale) {
            return new NextResponse("Scale is required", { status: 400 });
        }

        const freeTrial = await checkApiLimit();

        if(!freeTrial) {
            return new NextResponse('Límite de prueba gratuito excedido', { status: 403 });
        }
        
        const response = await replicate.run(
            "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
            {
              input: {
                image: prompt,
                scale: parseFloat(scale),
                face_enhance: face_enhance,
              }
            }
          );
          
        await increaseApiLimit();
        return NextResponse.json(response);

    } catch (error) {
        console.log('[RESCALESR_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}