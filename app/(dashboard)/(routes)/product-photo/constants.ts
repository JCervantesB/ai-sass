import * as z from 'zod';

export const formSchema = z.object({
    image: z.string().min(1),
    prompt: z.string().min(1),
    negative_prompt: z.string().optional(),
    image_num: z.number().min(1).max(4),
    product_size: z.string().min(1),
    pixel: z.string().min(1),
    scale: z.number().min(1).max(4),
    manual_seed: z.number().optional(),
});

export const productSizeOptions = [
    {
        value: 'Original',
        label: 'Original',
    },
    {
        value: '0.6 * width',
        label: '0.6 * ancho',
    },
    {
        value: '0.5 * width',
        label: '0.5 * ancho',
    },
    {
        value: '0.4 * width',
        label: '0.4 * ancho',
    },
    {
        value: '0.3 * width',
        label: '0.3 * ancho',
    },
    {
        value: '0.2 * width',
        label: '0.2 * ancho',
    },
];

export const pixelOptions = [
    {
        value: '512 * 512',
        label: '512 * 512',
    },
    {
        value: '768 * 768',
        label: '768 * 768',
    },
    {
        value: '1024 * 1024',
        label: '1024 * 1024',
    }
];
