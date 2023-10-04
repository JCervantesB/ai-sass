"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import * as z from "zod";
import { Download, ImageIcon } from "lucide-react";
import { useForm, Controller  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { formSchema, num_outputsOptions, heightOptions, widthOptions, refineOptions, schedulerOptions } from "./constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardFooter } from "@/components/ui/card";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Label } from "@radix-ui/react-label";
import ImageUploadSmall from "@/components/ImageUploadSmall";

const EpicRealismPage = () => {
  const router = useRouter();
  const [imageURL, setImageURL] = useState<string[]>([]);
  const [cloudinaryImageURL, setCloudinaryImageURL] = useState<string | null>(null);
  const [cloudinaryMaskURL, setCloudinaryMaskURL] = useState<string | null>(null);
  const [showImage, setShowImage] = useState(false);
  const [showMask, setShowMask] = useState(false);
  const [showSeed, setShowSeed] = useState(false);
  const [showSizeWarning, setShowSizeWarning] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      negative_prompt: "",
      image: "",
      mask: "",
      num_outputs: "1",
      height: "1024",
      width: "768",
      scheduler: "K_EULER",
      num_inference_steps: 50,
      guidance_scale: 7.5,
      prompt_strength: 0.8,
      seed: undefined,
      refine: "no_refiner",
      safety_checker: false,
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    // Actualizar el valor del campo "image" con la URL de Cloudinary seleccionada
    form.setValue("image", cloudinaryImageURL || "");
    // Forzar la validación del formulario después de actualizar el campo "image"
    form.trigger("image");
  }, [cloudinaryImageURL, form]);

  useEffect(() => {
    form.setValue("mask", cloudinaryMaskURL || "");
    form.trigger("mask");
  }, [cloudinaryMaskURL, form]);

  useEffect(() => {
    const selectedHeight = form.getValues().height;
    const selectedWidth = form.getValues().width;
    setShowSizeWarning(
      (selectedHeight === "1024" || selectedWidth === "1024") ||
      (selectedWidth === "1024" || selectedHeight === "1024")
    );
  }, [form]);

  const checkSizeWarning = (selectedHeight: string | undefined, selectedWidth: string | undefined) => {
    if (selectedHeight === "1024" || selectedWidth === "1024") {
      setShowSizeWarning(true);
    } else {
      setShowSizeWarning(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImageURL([]);
      setCloudinaryImageURL(null);
      setCloudinaryMaskURL(null); 

      const response = await axios.post("/api/epicrealism", values);

      // Obtener la URL de la imagen generada desde la respuesta del servidor
      const generatedImageURL = response.data.map((image: { url: string }) => image);
      console.log(generatedImageURL);
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
    form.handleSubmit(onSubmit)();
  };

  return (
    <div>
      <Heading
        title="Genera imágenes con EpicRealism"
        description="Genera imágenes de alta calidad a partir de descripciones en lenguaje natural con el modelo Stable Diffusion ajustado con EpicRealism"
        icon={ImageIcon}
        iconColor="text-fuchsia-400"
        bgColor="bg-fuchsia-400/10"
      />
      
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-4 gap-2"
            >
              <Label className="col-span-12 font-semibold">Generar una imagen según tus instrucciones. <br /><span className="text-gray-500 text-sm p-2 rounded-lg font-normal">Para aprovecharlo al máximo, describe la imagen que deseas crear con el mayor detalle posible</span></Label>
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border p-2 outline-none focus-visible:right-0 focus-visible:ring-transparent"
                        disabled={isLoading}                        
                        placeholder="un impresionante retrato intrincado a todo color, arte oficial, obra maestra, mejor calidad, fondo de pantalla unity 8k, ((fotorrealista: 1.4)), ultra detallado, extremadamente detallado, elegante, hermoso, estético, romanticismo, una mujer envuelta en un acogedor conjunto de invierno, sentado junto a una chimenea en una cabaña, iluminada con una iluminación suave y cálida para evocar una sensación de confort y tranquilidad."
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
                        placeholder="BadDream, UnrealisticDream, (peor calidad:2), (baja calidad:2), (calidad normal:2), baja resolución, mala anatomía, malas manos, malos brazos, calidad normal, ((monocromo)), ((escala de grises)) , texto, marca de agua,"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />  
              <div className="col-span-12 bg-muted/60">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-auto">
                  <div className="col-span-1 flex lg:flex flex-col justify-between">
                    <div>
                      <Label className="font-semibold">Imagen de entrada para el modo img2img o inpaint  (opcional*)<br /><span className="text-gray-500 text-sm font-normal">Permite utilizar una imagen base como guia para generar la imagen.</span></Label>
                      <Switch
                        checked={showImage}
                        onCheckedChange={() => setShowImage(!showImage)}
                      >
                        Usar Imagen
                      </Switch>
                    </div>
                    {showImage && (
                      <div>
                        <ImageUploadSmall
                          onChange={(value: string) => setCloudinaryImageURL(value)}
                          value={cloudinaryImageURL || ''}
                        />
                      </div>
                     )}
                  </div>
                  <div className="col-span-1 flex lg:flex flex-col justify-between">
                    <div>
                      <Label className="font-semibold">Máscara de entrada para el modo de pintura. (opcional*)<br /><span className="text-gray-500 text-sm font-normal">Las áreas negras se conservarán, las áreas blancas se volverán a pintar.</span> </Label>
                      <Switch
                        checked={showMask}
                        onCheckedChange={() => setShowMask(!showMask)}
                      >
                        Mostrar Máscara
                      </Switch>
                    </div>
                    {showMask && (
                      <div>
                        <ImageUploadSmall
                          onChange={(value: string) => setCloudinaryMaskURL(value)}
                          value={cloudinaryMaskURL || ''}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-auto">
                  <div className="col-span-2 lg:col-span-1 flex md:block lg:flex flex-col">
                    <Label className="font-semibold mt-2">Alto:</Label>
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <Select
                          disabled={isLoading}
                          onValueChange={(value) => {
                            field.onChange(value);
                            form.trigger("height");
                            checkSizeWarning(value, form.getValues().height);
                          }}
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
                      )}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1 flex md:block lg:flex flex-col">
                    <Label className="font-semibold mt-2">Ancho:</Label>
                    <FormField
                      control={form.control}
                      name="width"
                      render={({ field }) => (
                        <Select
                          disabled={isLoading}
                          onValueChange={(value) => {
                            field.onChange(value);
                            form.trigger("width"); 
                            checkSizeWarning(value, form.getValues().width);
                          }}
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
                      )}
                    />
                  </div>
                </div>
                {showSizeWarning && (                
                <div className="bg-muted/60 w-full p-2">               
                  <Label className="text-sm text-red-500">Nota: El tamaño máximo es 1024x768 o 768x1024 píxeles, debido a límites de memoria.</Label>                
                </div>
                )}
              </div>
              <div className="col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-auto">
                  <div className="col-span-2 lg:col-span-1 flex md:block lg:flex flex-col">
                    <Label className="font-semibold mt-2">Cantidad de imágenes a crear</Label>
                    <FormField
                      control={form.control}
                      name="num_outputs"
                      render={({ field }) => (
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
                      )}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1 flex md:block lg:flex flex-col">
                    <Label className="font-semibold mt-2">Programador</Label>
                    <FormField
                      control={form.control}
                      name="scheduler"
                      render={({ field }) => (
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
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <Label className="col-span-12 mt-4 font-semibold">Número de pasos de eliminación de ruido 
              <br /><span className="text-gray-500 text-sm font-normal">Esto controla cuántos pasos de difusión toma el modelo. Un numero mayor es generalmente mejor, aunque el proceso es mas lento. (mínimo: 1; máximo: 250)</span>
              </Label>
              <FormItem className="col-span-12 lg:col-span-2">
                <FormControl className="m-0 p-0">
                  <Controller
                      name="num_inference_steps"
                      control={form.control}
                      render={({ field }) => (
                        <div>
                          <span className="text-xl border p-1">{field.value}</span>
                          <Slider
                            min={1}
                            max={250}
                            step={1}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          />
                          
                        </div>
                      )}
                    />
                </FormControl>
              </FormItem>          
              <Label className="col-span-12 mt-4 font-semibold">Escala para guiado sin clasificador (mínimo: 1; máximo: 50)</Label>
              <FormItem className="col-span-12 lg:col-span-2">
                <FormControl className="m-0 p-0">
                  <Controller
                      name="guidance_scale"
                      control={form.control}
                      render={({ field }) => (
                        <div>
                          <span className="text-xl border p-1">{field.value}</span>
                          <Slider
                            min={1}
                            max={50}
                            step={0.1}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          />
                          
                        </div>
                      )}
                    />
                </FormControl>
              </FormItem>          
              <Label className="col-span-12 mt-4 font-semibold">Prompt strength <br /><span className="text-gray-500 text-sm font-normal">Esto controla la fuerza con la que Stable Diffusion pondera su solicitud cuando esté generando imágenes.</span>
              </Label>
              <FormItem className="col-span-12 lg:col-span-2">
                <FormControl className="m-0 p-0">
                  <Controller
                      name="prompt_strength"
                      control={form.control}
                      render={({ field }) => (
                        <div>
                          <span className="text-xl border p-1">{field.value}</span>
                          <Slider
                            min={0.04}
                            max={1}
                            step={0.01}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          />
                          
                        </div>
                      )}
                    />
                </FormControl>
              </FormItem>      
              
              <Label className="col-span-12 mt-4 font-semibold">Qué estilo refinado usar</Label>
              <FormField
                control={form.control}
                name="refine"
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
                        {refineOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />             
                       
              <FormItem className="col-span-12">
              <Label className="col-span-12 mt-4 font-semibold">Aplica una marca de agua.
              <br /><span className="text-gray-500 text-sm font-normal">
              Esto es útil para determinar si una imagen específica fue creada utilizando el proceso de generación que proporciona la herramienta
              </span>
              </Label>
                <FormControl className="col-span-12 lg:col-span-6">
                <Input
                  type="checkbox"
                  {...form.register("safety_checker")}
                  className="w-6 h-6 border focus-visible:right-0 focus-visible:ring-transparent p-2"
                />
                </FormControl>
              </FormItem>   
            
              <Label className="col-span-12 mt-4 font-semibold">Usar Semilla {' '}
            <Switch
              checked={showSeed}
              onCheckedChange={() => setShowSeed(!showSeed)}
            >
              Mostrar Imagen
            </Switch>
            </Label>
            {showSeed && (
              <FormField
                name="seed"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl className="m-0 p-0">
                      <Input
                        type="number"
                        className="border outline-none focus-visible:right-0 focus-visible:ring-transparent px-2"               
                        {...field}
                        placeholder="Dejar en blanco para randomizar"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />        
            )}
              <Button
                className="col-span-12 w-full lg:w-1/4 mt-4"
                disabled={isLoading || !form.formState.isValid}
                onClick={handleGenerateClick}
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
          {imageURL.length === 0 && !isLoading && (
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

export default EpicRealismPage;
