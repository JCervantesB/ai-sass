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
        const { image, prompt, negative_prompt, product_size, pixel, image_num, scale, manual_seed } = body;

        if (!userId) {
            return new NextResponse('No autorizado', { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        if (!image) {
            return new NextResponse("Image is required", { status: 400 });
        }
        if (!product_size) {
            return new NextResponse("Product size is required", { status: 400 });
        }
        if (!pixel) {
            return new NextResponse("Pixel is required", { status: 400 });
        }

        if (!scale) {
            return new NextResponse("Scale is required", { status: 400 });
        }

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse('Límite de prueba gratuito excedido', { status: 403 });
        }

        const response = await replicate.run(
            "logerzhu/ad-inpaint:b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df",
            {
                input: {
                    image_path: image,
                    prompt: prompt,
                    negative_prompt: negative_prompt,
                    product_size: product_size,
                    pixel: pixel,
                    image_num: parseInt(image_num),
                    scale: parseInt(scale),
                    manual_seed: manual_seed ? parseInt(manual_seed) : -1,
                }
            }
        );

        await increaseApiLimit();
        return NextResponse.json(response);

    } catch (error) {
        console.log('INPAINT_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}