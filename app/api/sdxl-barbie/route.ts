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
        const { prompt, negative_prompt, image, mask, num_outputs = 1, height = "1024", width = "1024", scheduler, num_inference_steps = 50, guidance_scale = 7.5, prompt_strength = 0.8, refine = "no_refiner", high_noise_frac = 0.8, apply_watermark, lora_scale = 0.6, seed } = body;      

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
            "fofr/sdxl-barbie:657c074cdd0e0098e39dae981194c4e852ad5bc88c7fbbeb0682afae714a6b0e",
            {
              input: {
                prompt: prompt,
                negative_prompt: negative_prompt,
                image: image ? image : undefined,
                mask: mask ? mask : undefined,
                num_outputs: parseInt(num_outputs, 10),
                height: parseInt(height, 10),
                width: parseInt(width, 10),
                scheduler: scheduler,
                num_inference_steps: num_inference_steps,
                guidance_scale: guidance_scale,
                prompt_strength: prompt_strength,
                refine: refine,
                high_noise_frac: high_noise_frac,
                apply_watermark: apply_watermark,
                lora_scale: lora_scale,
                seed: seed ? parseInt(seed, 10) : undefined,
              }
            }
          );

        await increaseApiLimit();
          
        return NextResponse.json(response);

    } catch (error) {
        console.log('SDXLBARBIE_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}