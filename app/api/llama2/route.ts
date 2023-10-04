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
        const { prompt  } = body;

        const system_prompt = 'You are a useful assistant with the name Llama2';

        if(!userId) {
            return new NextResponse('No autorizado', { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        //const freeTrial = await checkApiLimit();

        // if(!freeTrial) {
        //     return new NextResponse('Límite de prueba gratuito excedido', { status: 403 });
        // }

        const response = await replicate.run(
            "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
            {
              input: {
                system_prompt: system_prompt,
                prompt: prompt
              }
            }
          );
          
        
        //await increaseApiLimit();
        console.log(typeof(response))
        
        return NextResponse.json(response);

    } catch (error) {
        console.log('LLAMA2_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
