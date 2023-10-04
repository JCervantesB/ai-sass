import * as z from 'zod';

export const formSchema = z.object({
    prompt: z.string().min(1),
    scale: z.number().min(1).max(10),
    face_enhance: z.boolean(),
});



