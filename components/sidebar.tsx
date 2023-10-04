'use client';

import React, { useState } from 'react';
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LayoutDashboard, MessageSquare, ImageIcon, VideoIcon, Music, Code, Settings, PaletteIcon, ImagePlusIcon, ChevronRight, PenSquare } from "lucide-react";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const sidebarData = [
    {
        title: "Conversaciones y Código AI",
        routes: [
            {
                label: "Conversación Chat-GPT",
                icon: MessageSquare,
                href: "/conversation",
                color: "text-violet-500"
            },
            {
                label: "Conversación Llama2-70b",
                icon: MessageSquare,
                href: "/llama2",
                color: "text-pink-500"
            },
        ],
    },
    {
        title: "Generación de Código",
        routes: [
            {
                label: "Genera Código con Chat-GPT",
                icon: Code,
                href: "/code",
                color: "text-yellow-500"
            },
            {
                label: "Genera Código con CodeLlama-34b",
                icon: MessageSquare,
                href: "/codellama",
                color: "text-indigo-500"
            },
        ]
    },
    {
        title: "Generación de Imágenes",
        routes: [
            {
                label: "Generar Imágenes con Dall-E",
                icon: ImageIcon,
                href: "/image",
                color: "text-pink-700"
            },
            {
                label: "Generar Imágenes Kandinsky2.2",
                icon: ImageIcon,
                href: "/kandinsky",
                color: "text-cyan-700"
            },
            {
                label: "Generar Imágenes Stable Diffusion XL",
                icon: ImageIcon,
                href: "/stabledif-xl",
                color: "text-fuchsia-500"
            },
            {
                label: "Generar Imágenes con OpenJourney",
                icon: ImageIcon,
                href: "/openjourney",
                color: "text-orange-500"
            },
            {
                label: "Reescalar Imágenes GFPGAN",
                icon: ImagePlusIcon,
                href: "/rescale",
                color: "text-rose-700"
            },
            {
                label: "Reescalar Imágenes hasta 10X",
                icon: ImagePlusIcon,
                href: "/rescale-sr",
                color: "text-yellow-500"
            },
            {
                label: "Genera de imágenes de productos",
                icon: PenSquare,
                href: "/product-photo",
                color: "text-red-500"
            },
            {
                label: "Genera de imágenes con EpicRealism",
                icon: PaletteIcon,
                href: "/epicrealism",
                color: "text-fuchsia-400"
            },
            {
                label: "Arte corporal con Yomico Art Tattoo",
                icon: PaletteIcon,
                href: "/yomico",
                color: "text-green-400"
            },
            {
                label: "Genera imagenes estilo Anime",
                icon: PaletteIcon,
                href: "/anything",
                color: "text-indigo-500"
            },
            {
                label: "Genera imagenes estilo Barbie",
                icon: PaletteIcon,
                href: "/sdxl-barbie",
                color: "text-pink-400"
            },
        ],
    },
    {
        title: "Generación de Audio y Video",
        routes: [
            {
                label: "Generar Video",
                icon: VideoIcon,
                href: "/video",
                color: "text-yellow-500"
            },
            // {
            //     label: "Generar Video con Stable Diffusion",
            //     icon: VideoIcon,
            //     href: "/video",
            //     color: "text-cyan-600"
            // },
            // {
            //     label: "Generar Música con Musicgen",
            //     icon: Music,
            //     href: "/music",
            //     color: "text-emerald-500"
            // },
            {
                label: "Generar Música con Riffusion",
                icon: Music,
                href: "/music",
                color: "text-indigo-500"
            },
            {
                label: "Generar Audios con Bark",
                icon: Music,
                href: "/bark",
                color: "text-orange-700"
            },
        ],
    },
];

const Sidebar = () => {
    const pathname = usePathname();

    // Estado local para controlar qué categorías están abiertas
    const [openCategories, setOpenCategories] = useState<string[]>([]);


    const toggleCategory = (title: string) => {
        if (openCategories.includes(title)) {
            // Si la categoría está abierta, la cerramos
            setOpenCategories(openCategories.filter((cat) => cat !== title));
        } else {
            // Si la categoría está cerrada, la abrimos
            setOpenCategories([...openCategories, title]);
        }
    };

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white overflow-y-auto">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                            fill
                            alt="Logo"
                            src="/logo.png"
                        />
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>
                        AIFindHub
                    </h1>
                </Link>
                <div className="space-y-1">
                    <Link
                        href="/dashboard"
                        className={cn(
                            "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hoverLtext-white hover:bg-white/10 rounded-lg transition",
                            pathname === "/dashboard" ? "bg-white/10" : "text-zinc-400"
                        )}
                    >
                        <div className="flex items-center flex-1">
                            <LayoutDashboard className={cn("w-6 h-6", "text-sky-500")} />
                            Dashboard
                        </div>
                    </Link>
                    {sidebarData.map((category) => (
                        <div key={category.title} className='overflow-y-auto'>
                            <div
                                onClick={() => toggleCategory(category.title)}
                                className={cn(
                                    "text-sm group flex p-3 w-full mt-1 mb-1 justify-start font-medium cursor-pointer hoverLtext-white hover:bg-white/10 rounded-lg transition",
                                    openCategories.includes(category.title) && "bg-white/10"
                                )}
                            >
                                <div className="flex items-center flex-1">
                                    {category.title}
                                    <ChevronRight
                                        className={cn("w-6 h-6 ml-auto transform transition", {
                                            'rotate-90': openCategories.includes(category.title),
                                        })}
                                        fill="currentColor"
                                    />
                                </div>
                            </div>
                            {openCategories.includes(category.title) && (
                                <div className="pl-3">
                                    {category.routes.map((route, index) => (
                                        <Link
                                            href={route.href}
                                            key={index}
                                            className={cn(
                                                "text-sm group flex p-2 w-full justify-start font-medium cursor-pointer hoverLtext-white hover:bg-white/10 rounded-lg transition",
                                                pathname === route.href ? "bg-white/10" : "text-zinc-400"
                                            )}
                                        >
                                            <div className="flex items-center flex-1">
                                                <route.icon className={cn("w-6 h-6 mr-4", route.color)} />
                                                {route.label}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <Link
                        href="/settings"
                        className={cn(
                            "mt-4 text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hoverLtext-white hover:bg-white/10 rounded-lg transition",
                            pathname === "/settings" ? "bg-white/10" : "text-zinc-400"
                        )}
                    >
                        <div className="flex items-center flex-1">
                            <Settings className={cn("w-6 h-6", "text-yellow-500")} />
                            Ajustes
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;