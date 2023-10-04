import * as z from 'zod';

export const formSchema = z.object({
    prompt: z.string().min(1),
    negative_prompt: z.string().optional(),
    image: z.string().optional(),
    mask: z.string().optional(),
    num_outputs: z.string().min(1),
    height: z.string().optional(),
    width: z.string().optional(),
    scheduler: z.string().optional(),
    num_inference_steps: z.number().optional(),
    guidance_scale: z.number().optional(),
    prompt_strength: z.number().optional(),
    seed: z.string().optional(),
    refine: z.string().optional(),
    high_noise_frac: z.number().optional(),
    apply_watermark: z.boolean(),
    lora_scale: z.number().optional(),
});

export const num_outputsOptions = [
    {
        value: '1',
        label: '1',
    },
    {
        value: '2',
        label: '2',
    },
    {
        value: '3',
        label: '3',
    },
    {
        value: '4',
        label: '4',
    },
];

export const heightOptions = [
    {
        value: "384",
        label: "Alto: 384px",
    },
    {
        value: "512",
        label: "Alto: 512px",
    },
    {
        value: "768",
        label: "Alto: 768px",
    },
    {
        value: "960",
        label: "Alto: 960px",
    },
    {
        value: "1024",
        label: "Alto: 1024px",
    }
];
export const widthOptions = [
    {
        value: "384",
        label: "Ancho: 384px",
    },
    {
        value: "512",
        label: "Ancho: 512px",
    },
    {
        value: "768",
        label: "Ancho: 768px",
    },
    {
        value: "960",
        label: "Ancho: 960px",
    },
    {
        value: "1024",
        label: "Ancho: 1024px",
    }
];

export const refineOptions = [
    {
        value: "no_refiner",
        label: "No Refiner",
    },
    {
        value: "expert_ensemble_refiner",
        label: "expert_ensemble_refiner",
    },
    {
        value: "base_image_refiner",
        label: "base_image_refiner",
    }
];

export const schedulerOptions = [
    {
        value: "DDIM",
        label: "DDIM",
    },
    {
        value: "DPMSolverMultistep",
        label: "DPMSolverMultistep",
    },
    {
        value: "HeunDiscrete",
        label: "HeunDiscrete",
    },
    {
        value: "KarrasDPM",
        label: "KarrasDPM",
    },
    {
        value: "K_EULER_ANCESTRAL",
        label: "K_EULER_ANCESTRAL",
    },
    {
        value: "K_EULER",
        label: "K_EULER",
    },
    {
        value: "PNDM",
        label: "PNDM",
    }
];