import * as z from 'zod';

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: 'Se requiere una instrucción para la imagen',
    }),
    negative_prompt: z.string().min(0).optional(),
    num_outputs: z.string().min(1),
    height: z.string().min(1),
    width: z.string().min(1),
    num_inference_steps: z.string().min(1),
    guidance_scale: z.string().min(1),
    scheduler: z.string().min(1),
    seed: z.string().min(0).optional(),
});

export const num_outputsOptions = [
    {
        value: '1',
        label: '1 Imagen',
    }
];

export const heightOptions = [
    {
        value: "128",
        label: "Alto: 128px",
    },
    {
        value: "256",
        label: "Alto: 256px",
    },
    {
        value: "512",
        label: "Alto: 512px",
    },
    {
        value: "640",
        label: "Alto: 640px",
    },
    {
        value: "768",
        label: "Alto: 768px",
    },
    {
        value: "1024",
        label: "Alto: 1024px",
    }
];
export const widthOptions = [
    {
        value: "128",
        label: "Ancho: 128px",
    },
    {
        value: "256",
        label: "Ancho: 256px",
    },
    {
        value: "512",
        label: "Ancho: 512px",
    },
    {
        value: "640",
        label: "Ancho: 640px",
    },
    {
        value: "768",
        label: "Ancho: 768px",
    },
    {
        value: "1024",
        label: "Ancho: 1024px",
    }
];

export const num_inference_stepsOptions = [
    {
        value: "25",
        label: "25",
    },
    {
        value: "50",
        label: "50",
    },
    {
        value: "75",
        label: "75",
    },
    {
        value: "100",
        label: "100",
    },
];

export const num_inference_steps_priorOptions = [
    {
        value: "25",
        label: "25",
    },
    {
        value: "50",
        label: "50",
    },
    {
        value: "75",
        label: "75",
    },
    {
        value: "100",
        label: "100",
    },
];

export const schedulerOptions = [
    {
        value: "DPMSolverMultistep",
        label: "DPMSolverMultistep",
    },
    {
        value: "DDIM",
        label: "DDIM",
    },
    {
        value: "K_EULER",
        label: "K_EULER",
    },
    {
        value: "K_EULER_ANCESTRAL",
        label: "K_EULER_ANCESTRAL",
    },
    {
        value: "PNDM",
        label: "PNDM",
    },
    {
        value: "KLMS",
        label: "KLMS",
    },
];