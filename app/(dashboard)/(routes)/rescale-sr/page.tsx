"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import * as z from "zod";
import { Download, ImagePlusIcon } from "lucide-react";
import { useForm, Controller  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { formSchema } from "./constants";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Heading } from "@/components/heading";
import { Form, FormControl, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ImageUpload";

const RescaleSRPage = () => {
  const router = useRouter();
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [cloudinaryImageURL, setCloudinaryImageURL] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "", // Inicialmente, el prompt está vacío
      scale: 2,
      face_enhance: false,
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    // Actualizar el valor del campo "prompt" con la URL de Cloudinary seleccionada
    form.setValue("prompt", cloudinaryImageURL || "");
    // Forzar la validación del formulario después de actualizar el campo "prompt"
    form.trigger("prompt");
  }, [cloudinaryImageURL, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsGenerating(true); // Iniciar la generación, deshabilitar el botón
      setImageURL(null); // Reset the imageURL state before making a new request
      setCloudinaryImageURL(null); // Reset the cloudinaryImageURL state before making a new request

      const response = await axios.post("/api/rescale-sr", values);

      // Obtener la URL de la imagen generada desde la respuesta del servidor
      const generatedImageURL = response.data;
      console.log(generatedImageURL);
      // Establecer la URL de la imagen generada en el estado imageURL
      setImageURL(generatedImageURL);

      form.reset();
    } catch (error: any) {
      // TODO: Abrir Pro Modal
      console.log(error);
    } finally {
      setIsGenerating(false); // Terminar la generación, habilitar el botón nuevamente
      router.refresh();
    }
  };

  const handleGenerateClick = () => {
    // Ejecutar el envío del formulario si es válido
    form.handleSubmit(onSubmit)();
  };

  return (
    <div>
      <Heading
        title="Reescala y corrige imágenes con GFPGAN y Real-ESRGAN"
        description="Reescalar Imágenes a una super resolución con GFPGAN y Real-ESRGAN con un opcional corrector de rostros y escala ajustable hasta 10X."
        icon={ImagePlusIcon}
        iconColor="text-yellow-500"
        bgColor="bg-yellow-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-4 gap-2"
            >
              <Label className="col-span-12">Carga una imagen</Label>
              <div className="col-span-12">
                <ImageUpload
                  onChange={(value: string) => setCloudinaryImageURL(value)} // Actualizar cloudinaryImageURL con la URL de la imagen seleccionada
                  value={cloudinaryImageURL || ''} // Pasar la URL de la imagen seleccionada al componente ImageUpload
                />     
              </div>
              <Label className="col-span-12 text-gray-500 text-sm mt-2">Factorizar la imagen a escala por:</Label>
              <FormItem className="col-span-12 lg:col-span-2">
                <FormControl className="m-0 p-0">
                  <Controller
                      name="scale"
                      control={form.control}
                      render={({ field }) => (
                        <div>
                          <span className="text-xl border p-1">{field.value}X</span>
                          <Slider
                            min={1}
                            max={10}
                            step={0.10}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          />
                          
                        </div>
                      )}
                    />
                </FormControl>
              </FormItem>
              
              <FormItem className="col-span-12">
                <Label className="text-gray-500 text-sm">Realzar rostros?</Label>
                <FormControl className="col-span-12 lg:col-span-6">
                <Input
                  type="checkbox"
                  {...form.register("face_enhance", { value: true })} // Establecer el valor como true directamente
                  className="w-6 h-6 border focus-visible:right-0 focus-visible:ring-transparent p-2"
                />
                </FormControl>
              </FormItem>       
              
              
              <Button
                className="col-span-12 w-full lg:w-1/4 mt-4"
                disabled={isGenerating || !form.formState.isValid} // Deshabilitar el botón mientras se está generando o si el formulario no es válido
                onClick={handleGenerateClick} // Asignar la función handleGenerateClick al evento onClick
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
          {!imageURL && !isLoading && (
            <Empty label="No haz generado ninguna imagen" />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {imageURL && (
            <Card 
              key={imageURL}
              className="rounded-lg overflow-hidden"
            >
              <div className="relative aspect-square">
                <Image 
                  alt="Generated Image"
                  fill
                  src={imageURL}
                />
              </div>
              <CardFooter className="p-2">
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => window.open(imageURL)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
              </CardFooter>
            </Card>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescaleSRPage;
