"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import * as z from "zod";
import { Download, PaletteIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { num_outputsOptions, formSchema, heightOptions, widthOptions, schedulerOptions } from "./constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Label } from "@radix-ui/react-label";

const AnythingPage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      negative_prompt: "",
      num_outputs: "1",
      height: "640",
      width: "512",
      num_inference_steps: "20",
      guidance_scale: "7",
      scheduler: "DPMSolverMultistep",
      seed: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);

      const response = await axios.post("/api/anything", values);
      console.log(response.data);
      //obtener las urls de las imagenes
      const urls = response.data.map((image: { url: string }) => image);
      //setear las urls en el estado
      setImages(urls);

      form.reset();
    } catch (error: any) {
      // TODO: Abrir Pro Modal
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Generador de Imágenes estilo Anime con Anything V3"
        description="Nuestro más avanzado modelo AI, te ayudará a generar increibles imágenes estilo anime con solo escribir una frase."
        icon={PaletteIcon}
        iconColor="text-cyan-700"
        bgColor="bg-cyan-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-4 gap-2"
            >
              <Label className="col-span-12">Generar una imagen según tus instrucciones</Label>
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:right-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="obra maestra, mejor calidad, ilustración, hermosa detallada, finamente detallada, luz dramática, detalles intrincados, 1 chica, cabello castaño, ojos verdes, colorido, otoño, nubes cumulonimbus, iluminación, cielo azul, hojas que caen, jardín"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />              
              <Label className="col-span-12">Promp negativo (opcional)</Label>
            <FormField
              name="negative_prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:right-0 focus-visible:ring-transparent"                      
                      placeholder="lowres, mala anatomía, malas manos, texto, error, faltan dedos, dígito extra, menos dígitos, recortado, peor calidad, baja calidad, calidad normal, artefactos jpeg, firma, marca de agua, nombre de usuario, borroso, nombre de artista"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
              <Label className="col-span-12 text-gray-500 text-sm mt-2">Número de imágenes</Label>
              <FormField
                control={form.control}
                name="num_outputs"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {num_outputsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Label className="col-span-12 text-gray-500 text-sm">Tamaño de la imagen</Label>
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-1">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {heightOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-1">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {widthOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Label className="col-span-12 text-gray-500 text-sm">Número de pasos de eliminación de ruido (default: 20, min: 1, max: 50)</Label>
              
              <FormField
                name="num_inference_steps"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <FormControl className="m-0 p-0">
                      <Input
                        type="number"
                        min={1}
                        max={500}
                        className="border focus-visible:right-0 focus-visible:ring-transparent p-2"                 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Label className="col-span-12 text-gray-500 text-sm">GuidanceScale(default: 7): permite ajustar cuánto se debe confiar en el prompt proporcionado</Label>
              <FormField
                name="guidance_scale"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <FormControl className="m-0 p-0">
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        className="border focus-visible:right-0 focus-visible:ring-transparent p-2"                 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Label className="col-span-12 text-gray-500 text-sm">Seleccionar Programador</Label>
              <FormField
                control={form.control}
                name="scheduler"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-1">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {schedulerOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Label className="col-span-12 text-gray-500 text-sm">Semilla random. Dejar en blanco para randomizar la semilla</Label>
              <FormField
                name="seed"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <FormControl className="m-0 p-0">
                      <Input
                        type="number"
                        className="border focus-visible:right-0 focus-visible:ring-transparent p-2"                 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 w-full lg:w-1/4 mt-4"
                disabled={isLoading}
              >
                Generar
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex flex-col items-center justify-center bg-muted">
              <Loader />
              <p className="text-sm text-center text-gray-500">
                Este proceso podria tardar hasta 3min por favor sea paciente...
              </p>
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label="No haz generado ninguna imagen" />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <Card 
                key={src}
                className="rounded-lg overflow-hidden"
              >
                <div className="relative aspect-square">
                  <Image 
                    alt="Image"
                    fill
                    src={src}
                  />
                </div>
                <CardFooter className="p-2">
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => window.open(src)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnythingPage;
