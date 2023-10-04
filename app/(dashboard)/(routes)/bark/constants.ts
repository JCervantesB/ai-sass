import * as z from 'zod';

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: 'Se requiere un prompt para generar el audio', 
    }),
    history_prompt: z.string().min(1, {
        message: 'Se requiere un orador para generar el audio', 
    }),
    text_temp: z.number().optional(),
    waveform_temp: z.number().optional(),
});

export const speakerOptions = [
    {
        value: 'announcer',
        label: 'Locutor',
    },
    {
        value: 'de_speaker_0',
        label: '[Aleman]Orador_0',
    },
    {
        value: 'de_speaker_1',
        label: '[Aleman]Orador_1',
    },
    {
        value: 'de_speaker_2',
        label: '[Aleman]Orador_2',
    },
    {
        value: 'de_speaker_3',
        label: '[Aleman]Orador_3',
    },
    {
        value: 'de_speaker_4',
        label: '[Aleman]Orador_4',
    },
    {
        value: 'de_speaker_5',
        label: '[Aleman]Orador_5',
    },
    {
        value: 'de_speaker_6',
        label: '[Aleman]Orador_6',
    },
    {
        value: 'de_speaker_7',
        label: '[Aleman]Orador_7',
    },
    {
        value: 'de_speaker_8',
        label: '[Aleman]Orador_8',
    },
    {
        value: 'de_speaker_9',
        label: '[Aleman]Orador_9',
    },  
    {
        value: 'en_speaker_0',
        label: '[Ingles]Orador_0',
    },
    {
        value: 'en_speaker_1',
        label: '[Ingles]Orador_1',
    },
    {
        value: 'en_speaker_2',
        label: '[Ingles]Orador_2',
    },
    {
        value: 'en_speaker_3',
        label: '[Ingles]Orador_3',
    },
    {
        value: 'en_speaker_4',
        label: '[Ingles]Orador_4',
    },
    {
        value: 'en_speaker_5',
        label: '[Ingles]Orador_5',
    },
    {
        value: 'en_speaker_6',
        label: '[Ingles]Orador_6',
    },
    {
        value: 'en_speaker_7',
        label: '[Ingles]Orador_7',
    },
    {
        value: 'en_speaker_8',
        label: '[Ingles]Orador_8',
    },
    {
        value: 'en_speaker_9',
        label: '[Ingles]Orador_9',
    },  
    {
        value: 'es_speaker_0',
        label: '[Español]Orador_0',
    },
    {
        value: 'es_speaker_1',
        label: '[Español]Orador_1',
    },
    {
        value: 'es_speaker_2',
        label: '[Español]Orador_2',
    },
    {
        value: 'es_speaker_3',
        label: '[Español]Orador_3',
    },
    {
        value: 'es_speaker_4',
        label: '[Español]Orador_4',
    },
    {
        value: 'es_speaker_5',
        label: '[Español]Orador_5',
    },
    {
        value: 'es_speaker_6',
        label: '[Español]Orador_6',
    },
    {
        value: 'es_speaker_7',
        label: '[Español]Orador_7',
    },
    {
        value: 'es_speaker_8',
        label: '[Español]Orador_8',
    },
    {
        value: 'es_speaker_9',
        label: '[Español]Orador_9',
    },  
    {
        value: 'fr_speaker_0',
        label: '[Frances]Orador_0',
    },
    {
        value: 'fr_speaker_1',
        label: '[Frances]Orador_1',
    },
    {
        value: 'fr_speaker_2',
        label: '[Frances]Orador_2',
    },
    {
        value: 'fr_speaker_3',
        label: '[Frances]Orador_3',
    },
    {
        value: 'fr_speaker_4',
        label: '[Frances]Orador_4',
    },
    {
        value: 'fr_speaker_5',
        label: '[Frances]Orador_5',
    },
    {
        value: 'fr_speaker_6',
        label: '[Frances]Orador_6',
    },
    {
        value: 'fr_speaker_7',
        label: '[Frances]Orador_7',
    },
    {
        value: 'fr_speaker_8',
        label: '[Frances]Orador_8',
    },
    {
        value: 'fr_speaker_9',
        label: '[Frances]Orador_9',
    },  
    {
        value: 'hi_speaker_0',
        label: '[Hindi]Orador_0',
    },
    {
        value: 'hi_speaker_1',
        label: '[Hindi]Orador_1',
    },
    {
        value: 'hi_speaker_2',
        label: '[Hindi]Orador_2',
    },
    {
        value: 'hi_speaker_3',
        label: '[Hindi]Orador_3',
    },
    {
        value: 'hi_speaker_4',
        label: '[Hindi]Orador_4',
    },
    {
        value: 'hi_speaker_5',
        label: '[Hindi]Orador_5',
    },
    {
        value: 'hi_speaker_6',
        label: '[Hindi]Orador_6',
    },
    {
        value: 'hi_speaker_7',
        label: '[Hindi]Orador_7',
    },
    {
        value: 'hi_speaker_8',
        label: '[Hindi]Orador_8',
    },
    {
        value: 'hi_speaker_9',
        label: '[Hindi]Orador_9',
    },  
    {
        value: 'it_speaker_0',
        label: '[Italiano]Orador_0',
    },
    {
        value: 'it_speaker_1',
        label: '[Italiano]Orador_1',
    },
    {
        value: 'it_speaker_2',
        label: '[Italiano]Orador_2',
    },
    {
        value: 'it_speaker_3',
        label: '[Italiano]Orador_3',
    },
    {
        value: 'it_speaker_4',
        label: '[Italiano]Orador_4',
    },
    {
        value: 'it_speaker_5',
        label: '[Italiano]Orador_5',
    },
    {
        value: 'it_speaker_6',
        label: '[Italiano]Orador_6',
    },
    {
        value: 'it_speaker_7',
        label: '[Italiano]Orador_7',
    },
    {
        value: 'it_speaker_8',
        label: '[Italiano]Orador_8',
    },
    {
        value: 'it_speaker_9',
        label: '[Italiano]Orador_9',
    },  
    {
        value: 'ja_speaker_0',
        label: '[Japones]Orador_0',
    },
    {
        value: 'ja_speaker_1',
        label: '[Japones]Orador_1',
    },
    {
        value: 'ja_speaker_2',
        label: '[Japones]Orador_2',
    },
    {
        value: 'ja_speaker_3',
        label: '[Japones]Orador_3',
    },
    {
        value: 'ja_speaker_4',
        label: '[Japones]Orador_4',
    },
    {
        value: 'ja_speaker_5',
        label: '[Japones]Orador_5',
    },
    {
        value: 'ja_speaker_6',
        label: '[Japones]Orador_6',
    },
    {
        value: 'ja_speaker_7',
        label: '[Japones]Orador_7',
    },
    {
        value: 'ja_speaker_8',
        label: '[Japones]Orador_8',
    },
    {
        value: 'ja_speaker_9',
        label: '[Japones]Orador_9',
    },  
    {
        value: 'ko_speaker_0',
        label: '[Coreano]Orador_0',
    },
    {
        value: 'ko_speaker_1',
        label: '[Coreano]Orador_1',
    },
    {
        value: 'ko_speaker_2',
        label: '[Coreano]Orador_2',
    },
    {
        value: 'ko_speaker_3',
        label: '[Coreano]Orador_3',
    },
    {
        value: 'ko_speaker_4',
        label: '[Coreano]Orador_4',
    },
    {
        value: 'ko_speaker_5',
        label: '[Coreano]Orador_5',
    },
    {
        value: 'ko_speaker_6',
        label: '[Coreano]Orador_6',
    },
    {
        value: 'ko_speaker_7',
        label: '[Coreano]Orador_7',
    },
    {
        value: 'ko_speaker_8',
        label: '[Coreano]Orador_8',
    },
    {
        value: 'ko_speaker_9',
        label: '[Coreano]Orador_9',
    },  

];