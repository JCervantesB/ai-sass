import * as z from 'zod';

export const formSchema = z.object({
    prompt: z.string().min(1),
    version: z.string().min(1),
    scale: z.string().min(1)
});

export const versionOptions = [
    {
        value: 'v1.2',
        label: 'v1.2: Default',
    },
    {
        value: 'v1.3',
        label: 'v1.3: Mejor calidad',
    },
    {
        value: 'v1.4',
        label: 'v1.4: Más detalles y Mejor identidad',
    }
];

export const scaleOptions = [
    {
        value: '1.2',
        label: '1.2x',
    },
    {
        value: '1.5',
        label: '1.5x',
    },
    {
        value: '2',
        label: '2x',
    },
    {
        value: '2.5',
        label: '2.5x',
    },
    {
        value: '3',
        label: '3x',
    },
];