import * as z from 'zod';

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: 'Se requiere una instrucción para la imagen',
    }),
    num_outputs: z.string().min(1),
    height: z.string().min(1),
    width: z.string().min(1),
    num_inference_steps: z.string().min(1),
    num_inference_steps_prior: z.string().min(1),
});

export const num_outputsOptions = [
    {
        value: '1',
        label: '1 Imagen',
    },
    {
        value: '2',
        label: '2 Imágenes',
    },
    {
        value: '3',
        label: '3 Imágenes',
    },
    {
        value: '4',
        label: '4 Imágenes',
    },
    {
        value: '5',
        label: '5 Imágenes',
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