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
        const { prompt, version, scale } = body;

        if(!userId) {
            return new NextResponse('No autorizado', { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        if (!version) {
            return new NextResponse("Version is required", { status: 400 });
        }

        if (!scale) {
            return new NextResponse("Scale is required", { status: 400 });
        }

        const freeTrial = await checkApiLimit();

        if(!freeTrial) {
            return new NextResponse('Límite de prueba gratuito excedido', { status: 403 });
        }
        
        const response = await replicate.run(
            "tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
            {
              input: {
                img: prompt,
                scale: parseFloat(scale),
                version: version.toString(),
              }
            }
          );
          
        await increaseApiLimit();
        return NextResponse.json(response);

    } catch (error) {
        console.log('[MUSIC_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}