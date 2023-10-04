"use client";

import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { formSchema } from "./constants";
import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

const CodeLlamaPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<string[]>([]);
  // Crea un estado para la conversación completa
  const [conversation, setConversation] = useState<{ role: string, content: string }[]>([]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  function formatResponse(response: any) {
    const text = response.join("");
    const formattedText = text.replace(/\s+/g, " ");

    return formattedText;
  }

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage = { role: "user", content: values.prompt };
      setConversation([...conversation, userMessage]);
      setMessages([]);

      // Realizar la solicitud a la IA y recibir la respuesta aquí

      const response = await axios.post("/api/llama2", values);

      const formattedMessages = formatResponse(response.data);
      const aiMessage = { role: "bot", content: formattedMessages };

      setMessages([...messages, formattedMessages]);
      setConversation([...conversation, userMessage, aiMessage]);

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
        title="Generador conversacion"
        description="El módelo más avanzado de Meta:LLama2-70b, capaz de mantener una conversación fluida y coherente."
        icon={Code}
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
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:right-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="E.j: ¿Cual es el radio del sol?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />              
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty
              label="No haz iniciado una conversación"
            />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={cn("p-8 w-full flex items-start  gap-x-8 rounded-lg", message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted')}
              >
                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeLlamaPage;
