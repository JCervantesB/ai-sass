import * as z from 'zod';

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: 'Se requiere un prompt', 
    }),
    language: z.string().optional(),
});

export const languageOptions = [
    {
        value: 'C#',
        label: 'C#',
    },
    {
        value: 'C++',
        label: 'C++',
    },
    {
        value: 'Java',
        label: 'Java',
    },
    {
        value: 'JavaScript',
        label: 'JavaScript',
    },
    {
        value: 'JavaScript JSX',
        label: 'JavaScript JSX',
    },
    {
        value: 'PHP',
        label: 'PHP',
    },
    {
        value: 'Python',
        label: 'Python',
    },
    {
        value: 'TypeScript',
        label: 'TypeScript',
    },
];