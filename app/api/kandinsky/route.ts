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
        const { prompt, num_outputs = 1, height = "512", width = "512", num_inference_steps = "75", num_inference_steps_prior = "25" } = body;

        if(!userId) {
            return new NextResponse('No autorizado', { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        if(!num_outputs) {
            return new NextResponse('La Cantidad es requerida', { status: 400 });
        }
        if(!height) {
            return new NextResponse('La Resolucion es requerida', { status: 400 });
        }
        if(!width) {
            return new NextResponse('La Resolucion es requerida', { status: 400 });
        }
        if(!num_inference_steps) {
            return new NextResponse('El Número de Pasos es requerido', { status: 400 });
        }
        if(!num_inference_steps_prior) {
            return new NextResponse('El Número de Pasos es requerido', { status: 400 });
        }

        const freeTrial = await checkApiLimit();

        if(!freeTrial) {
            return new NextResponse('Límite de prueba gratuito excedido', { status: 403 });
        }

        const response = await replicate.run(
            "ai-forever/kandinsky-2.2:ea1addaab376f4dc227f5368bbd8eff901820fd1cc14ed8cad63b29249e9d463",
            {
              input: {
                prompt: prompt,
                height: parseInt(height, 10),
                width: parseInt(width, 10),
                num_outputs: parseInt(num_outputs, 10),
                num_inference_steps: parseInt(num_inference_steps, 10),
                num_inference_steps_prior: parseInt(num_inference_steps_prior, 10),
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