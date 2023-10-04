"use client";

import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { formSchema, languageOptions } from "./constants";
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
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";

const Llama2Page = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<string[]>([]);
  // Crea un estado para la conversación completa
  const [conversation, setConversation] = useState<{ role: string, content: string }[]>([]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      language: "JavaScript"
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

      const response = await axios.post("/api/codellama", values);

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
        title="Generador de código { CodeLlama-34b }"
        description="El módelo más avanzado de Meta:CodeLlama, capaz generar codigo a partir de instrucciones."
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
                        className="border p-2 outline-none focus-visible:right-0 focus-visible:ring-transparent min-h-[80px]"
                        disabled={isLoading}
                        placeholder="E.j: Crea una función que permita calcular el IMC"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="col-span-12 lg:col-span-2">
              <FormField
                control={form.control}
                name="language"
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
                      {languageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
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
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1 font-semibold" {...props} />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Llama2Page;
