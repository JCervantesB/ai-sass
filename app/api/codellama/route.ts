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
        const { prompt, language } = body;

        const system_prompt = `Responses should be written in ${language}. You must answer only in markdown code snippets. Use code comments for explanations`;

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
            "meta/codellama-34b-instruct:8281a5c610f6e88237ff3ddaf3c33b56f60809e2bdd19fbec2fda742aa18167e",
            {
              input: {
                system_prompt: system_prompt,
                prompt: prompt,
                max_tokens: 300,
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
