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
        const { prompt, negative_prompt = "", num_outputs = 1, height = "512", width = "640", num_inference_steps = "20", guidance_scale = "7", scheduler = "DPMSolverMultistep", seed = ""} = body;
        
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
        if(!guidance_scale) {
            return new NextResponse('La Escala de Guía es requerida', { status: 400 });
        }
        if(!scheduler) {
            return new NextResponse('El Planificador es requerido', { status: 400 });
        }

        const freeTrial = await checkApiLimit();

        if(!freeTrial) {
            return new NextResponse('Límite de prueba gratuito excedido', { status: 403 });
        }

        const response = await replicate.run(
            "cjwbw/anything-v3-better-vae:09a5805203f4c12da649ec1923bb7729517ca25fcac790e640eaa9ed66573b65",
            {
              input: {
                prompt: prompt,
                negative_prompt: negative_prompt,
                height: parseInt(height, 10),
                width: parseInt(width, 10),
                num_outputs: parseInt(num_outputs, 10),
                num_inference_steps: parseInt(num_inference_steps, 10),
                guidance_scale: parseInt(guidance_scale, 10),
                scheduler: scheduler,
                seed: parseInt(seed) || undefined,
              }
            }
          );

        await increaseApiLimit();
        return NextResponse.json(response);

    } catch (error) {
        console.log('[ANYTHING_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}