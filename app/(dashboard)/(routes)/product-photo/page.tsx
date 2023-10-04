"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import * as z from "zod";
import { Download, PenSquare } from "lucide-react";
import { useForm, Controller  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { formSchema, productSizeOptions, pixelOptions } from "./constants";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardFooter } from "@/components/ui/card";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Label } from "@radix-ui/react-label";
import ImageUpload from "@/components/ImageUpload";

const ProductPhotoPage = () => {
  const router = useRouter();
  const [imageURL, setImageURL] = useState<string[]>([]);
  const [cloudinaryImageURL, setCloudinaryImageURL] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",       
      prompt: "", 
      negative_prompt: "",
      image_num: 1,
      product_size: "Original",
      pixel: "512 * 512",
      scale: 3,
      manual_seed: -1,
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    // Actualizar el valor del campo "image" con la URL de Cloudinary seleccionada
    form.setValue("image", cloudinaryImageURL || "");
    // Forzar la validación del formulario después de actualizar el campo "image"
    form.trigger("image");
  }, [cloudinaryImageURL, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImageURL([]); // Reset the imageURL state before making a new request
      setCloudinaryImageURL(null); // Reset the cloudinaryImageURL state before making a new request

      const response = await axios.post("/api/ad-inpaint", values);

      // Obtener la URL de la imagen generada desde la respuesta del servidor
      const generatedImageURL = response.data.map((image: { url: string }) => image);
      // Establecer la URL de la imagen generada en el estado imageURL
      setImageURL(generatedImageURL);

      form.reset();
    } catch (error: any) {
      // TODO: Abrir Pro Modal
      console.log(error);
    } finally {
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
        title="Reescalar Imagenes con GFPGAN"
        description="GFPGAN es un algoritmo práctico de restauración facial  y se puede usar para restaurar fotos antiguas o mejorar caras generadas por IA"
        icon={PenSquare}
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
              <Label className="col-span-12">Carga una imagen</Label>
              <div className="col-span-12">
                <ImageUpload
                  onChange={(value: string) => setCloudinaryImageURL(value)} // Actualizar cloudinaryImageURL con la URL de la imagen seleccionada
                  value={cloudinaryImageURL || ''} // Pasar la URL de la imagen seleccionada al componente ImageUpload
                />     
              </div>
              <Label className="col-span-12 font-semibold">Generar una imagen según tus instrucciones. <br /><span className="text-gray-500 text-sm p-2 rounded-lg font-normal">Para aprovecharlo al máximo, describe la imagen que deseas crear con el mayor detalle posible</span></Label>
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border p-2 outline-none focus-visible:right-0 focus-visible:ring-transparent"
                        disabled={isLoading}                        
                        placeholder="Una astronauta montando un unicornio arcoiris, cinematográfica, dramática."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />  
              <Label className="col-span-12 font-semibold">Prompt Negativo 
              <br /><span className="text-gray-500 text-sm p-2 rounded-lg font-normal">Le permite enumerar las cosas que no desea incluir en su imagen.</span></Label>  
              <FormField
                name="negative_prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border p-2 outline-none focus-visible:right-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="baja calidad, pixelada, borrosa, ruido, artefactos, desenfocada, oscura, mal iluminada, mal enfocada, mal compuesta, mal encuadrada"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />  
              <Label className="col-span-12 text-sm mt-2 font-semibold">Tamaño máximo del producto</Label>
              <FormField
                control={form.control}
                name="product_size"
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
                        {productSizeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />       
              <Label className="col-span-12 text-sm mt-2 font-semibold">Pixel</Label>      
              <FormField
                control={form.control}
                name="pixel"
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
                        {pixelOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />             
              <Label className="col-span-12 font-semibold text-sm mt-2">Numero de imagenes</Label>
              <FormItem className="col-span-12 lg:col-span-2">
                <FormControl className="m-0 p-0">
                  <Controller
                      name="image_num"
                      control={form.control}
                      render={({ field }) => (
                        <div>
                          <span className="text-xl border p-1">{field.value}</span>
                          <Slider
                            min={1}
                            max={4}
                            step={1}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          />
                          
                        </div>
                      )}
                    />
                </FormControl>
              </FormItem>   
              <Label className="col-span-12 font-semibold text-sm mt-2">Escala de imagen</Label> 
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
                            max={4}
                            step={1}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          />
                          
                        </div>
                      )}
                    />
                </FormControl>
              </FormItem>    
              <Label className="col-span-12 font-semibold text-sm mt-2">Usar semilla</Label>
              <FormField
                name="seed"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl className="m-0 p-0">
                      <Input
                        type="number"
                        min={-1}
                        className="border outline-none focus-visible:right-0 focus-visible:ring-transparent px-2"               
                        {...field}
                        placeholder="Dejar en blanco para randomizar"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />          
              
              <Button
                className="col-span-12 w-full lg:w-1/4 mt-4"
                disabled={isLoading || !form.formState.isValid} // Deshabilitar el botón si isLoading es true o si el formulario no es válido
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
          {imageURL.map((src) => (
            <Card 
              key={src}
              className="rounded-lg overflow-hidden"
            >
              <div className="relative aspect-square">
                <Image 
                  alt="Generated Image"
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

export default ProductPhotoPage;
