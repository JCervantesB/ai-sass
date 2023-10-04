"use client";

import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { Music } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { formSchema, speakerOptions } from "./constants";

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
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";

const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      history_prompt: "es_speaker_1",
      text_temp: 0.7,
      waveform_temp: 0.7,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/bark", values);
      
      setMusic(response.data.audio_out);

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
        title="Generador de audio con Suno|BARK"
        description="Nuestro más avanzado modelo de IA, capaz de generar auido a partir de texto."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
            <Label className="col-span-12 font-semibold mt-2">Genera un audio a partir de tu siguiente texto</Label>
            <Label className="col-span-12 text-gray-500 text-sm font-normal bg-muted/60">Puedes usar algunos sonidos conocidos ajenos al habla como: risa: <b>[laughter]</b>, risas: <b>[laughs]</b>, suspiros: <b>[sighs]</b>, música: <b>[music]</b>, jadeos <b>[gasps]</b>, aclarar la garganta: <b>[clears throat]</b>, se aclara la garganta, <b>-</b> o <b>...</b> por vacilaciones o ♪ para letras de canciones</Label>
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="p-1 focus-visible:right-0 focus-visible:ring-transparent h-14"
                        disabled={isLoading}
                        placeholder="P.Ej: Hola, mi nombre es Suno. Y [clears throat]... y me gusta la pizza [laughs]... Pero también tengo otros intereses, como jugar al tres en raya."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Label className="col-span-12 font-semibold mt-2">Selecciona un orador</Label>
              <FormField
                control={form.control}
                name="history_prompt"
                render={({ field }) => (
                  <div style={{ minWidth: "180px" }}>
                    <Select
                      disabled={isLoading}
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.trigger("history_prompt");
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper" style={{ maxHeight: "200px", minWidth: "98%", overflowY: "auto" }}>

                        {speakerOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              <div className="col-span-12 mt-1">

                <Label className="col-span-12 mt-4 font-semibold">Configuración de temperatura para mensaje de texto<br /><span className="text-gray-500 text-sm font-normal">(1,0 más diversa, 0,0 más conservadora).</span>
                </Label>
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormControl className="m-0 p-0">
                    <Controller
                      name="text_temp"
                      control={form.control}
                      render={({ field }) => (
                        <div>
                          <span className="text-xl border p-1">{field.value}</span>
                          <Slider
                            min={0.0}
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
                <Label className="col-span-12 mt-4 font-semibold">Ajuste de temperatura para la forma de onda de audio<br /><span className="text-gray-500 text-sm font-normal">(1,0 más diversa, 0,0 más conservadora).</span>
                </Label>
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormControl className="m-0 p-0">
                    <Controller
                      name="waveform_temp"
                      control={form.control}
                      render={({ field }) => (
                        <div>
                          <span className="text-xl border p-1">{field.value}</span>
                          <Slider
                            min={0.0}
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
              </div>


              <Button
                className="col-span-12 lg:col-span-2 w-full"
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
                Este proceso podria tardar entre 1 y 5min por favor sea paciente...
              </p>
            </div>
          )}
          {!music && !isLoading && <Empty label="No hay música generada aún" />}
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
