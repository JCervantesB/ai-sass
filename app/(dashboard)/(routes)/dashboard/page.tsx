'use client';

import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  MessageSquare, 
  ImageIcon, 
  VideoIcon, 
  Music, 
  Code,
  PaletteIcon,
  ImagePlusIcon,
  PenSquare
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const textTools = [
  {
    label: 'Conversación Chat-GPT',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    href: '/conversation',
    image: '/banner/chatgpt.jpg'
  },
  {
    label: 'Conversación Llama2-70b',
    icon: MessageSquare,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    href: '/llama2',
    image: '/banner/llama.jpg'
  },
  {
    label: 'Generar Código Chat-GPT',
    icon: Code,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    href: '/code',
    image: '/banner/chatgpt-code.jpg'
  },
  {
    label: 'Generar Código CodeLlama-34b',
    icon: Code,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    href: '/codellama',
    image: '/banner/llama-chat.jpg'
  },
]

const imgTools = [
  {
    label: 'Generar Imágenes con Dall-E',
    icon: ImageIcon,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    href: '/image',
    image: '/banner/dalle.jpg'
  },
  {
    label: 'Generar Imágenes Kandinsky2.2',
    icon: ImageIcon,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    href: '/kandinsky',
    image: '/banner/kandinsky.jpg'
  },
  {
    label: 'Generar Imágenes Stable Diffusion XL',
    icon: ImageIcon,
    color: 'text-fuchsia-500',
    bgColor: 'bg-fuchsia-500/10',
    href: '/stabledif-xl',
    image: '/banner/stablediff.jpg'
  },
  {
    label: 'Generar Imágenes con OpenJourney',
    icon: ImageIcon,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    href: '/openjourney',
    image: '/banner/openjourney.jpg'
  },
  {
    label: 'Reescalar Imágenes con GFPGAN',
    icon: ImagePlusIcon,
    color: 'text-rose-700',
    bgColor: 'bg-rose-700/10',
    href: '/rescale',
    image: '/banner/rescale.jpg'
  },
  {
    label: 'Reescalar Imágenes hasta 10X con corrector de rostros',
    icon: ImagePlusIcon,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    href: '/rescale-sr',
    image: '/banner/real-esrgan.jpg'
  },
  {
    label: 'Genera de imágenes publicitarias de productos',
    icon: PenSquare,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    href: '/product-photo',
    image: '/banner/product-photo.jpg'
  },
  {
    label: 'Genera imágenes ultra realistas con epiCRealism',
    icon: PaletteIcon,
    color: 'text-fuchsia-400',
    bgColor: 'bg-fuchsia-400/10',
    href: '/epicrealism',
    image: '/banner/epicrealism.jpg'
  },
  {
    label: 'Arte corporal con Yomico Art Tattoo',
    icon: PaletteIcon,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    href: '/yomico',
    image: '/banner/art-tattoo.jpg'
  },
  {
    label: 'Genera imagenes estilo Anime',
    icon: PaletteIcon,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    href: '/anything',
    image: '/banner/anything.jpg'
  },
  {
    label: 'Genera imagenes estilo Barbie',
    icon: PaletteIcon,
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    href: '/sdxl-barbie',
    image: '/banner/sdxl-barbie.jpg'
  },
]

const mediaTools = [  
  {
    label: 'Generar Video',
    icon: VideoIcon,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    href: '/video',
    image: '/banner/zeroscope.jpg'
  },
  // {
  //   label: 'Generar Video con Stable Diffusion',
  //   icon: VideoIcon,
  //   color: 'text-cyan-600',
  //   bgColor: 'bg-cyan-600/10',
  //   href: '/video',
  //   image: '/banner/sd-animation.jpg'
  // },
  // {
  //   label: 'Generar Música con Musicgen',
  //   icon: Music,
  //   color: 'text-emerald-500',
  //   bgColor: 'bg-emerald-500/10',
  //   href: '/music',
  //   image: '/banner/musicgen.jpg'
  // },
  {
    label: 'Generar Música con Riffusion',
    icon: Music,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    href: '/music',
    image: '/banner/riffusion.jpg'
  },
  {
    label: 'Generar Audios con Bark',
    icon: Music,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    href: '/bark',
    image: '/banner/bark.jpg'
  },  
]

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explora el poder de la Inteligencia Artificial
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chatea, Crea imágenes, audio, vídeo y código con los modelos que AIFindHub trae para ti
        </p>
      </div>
      <p className="mt-8 mb-8 text-xl md:text-2xl font-bold text-center">Chats y Generadores de Código</p>
      <div className="lg:grid lg:grid-cols-2 lg:gap-4 px-4 md:px-20 lg:px-32 space-y-4 lg:space-y-0">
        {textTools.map((tool) => (
          <Card 
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-6 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            style={{ backgroundImage: `url(${tool.image})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
          >
            <div className="flex items-center gap-x-4 backdrop-blur-sm bg-white/5 px-1 rounded-lg">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white"/>
          </Card>
        ))}
      </div>
      <p className="mt-8 mb-8 text-xl md:text-2xl font-bold text-center">Generadores de imágenes</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 px-4 md:px-20 lg:px-32 space-y-4 md:space-y-0">
        {imgTools.map((tool) => (
          <Card 
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            style={{ backgroundImage: `url(${tool.image})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
          >
            <div className="flex items-center gap-x-4 backdrop-blur-sm bg-white/20 px-1 rounded-lg">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white"/>
          </Card>
        ))}
      </div>
      <p className="mt-8 mb-8 text-xl md:text-2xl font-bold text-center">Generadores de Audio y Vídeo</p>
      <div className="lg:grid lg:grid-cols-2 lg:gap-4 px-4 md:px-20 lg:px-32 space-y-4 lg:space-y-0">
        {mediaTools.map((tool) => (
          <Card 
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            style={{ backgroundImage: `url(${tool.image})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
          >
            <div className="flex items-center gap-x-4 backdrop-blur-sm bg-white/20 px-1 rounded-lg">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white" />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage