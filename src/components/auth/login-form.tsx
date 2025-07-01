"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { useTranslation } from "@/hooks/use-translation";

export function LoginForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().email({
      message: t('validationEmail'),
    }),
    password: z.string().min(8, {
      message: t('validationPasswordMin'),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const userName = values.email
      .split("@")[0]
      .replace(".", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    const userRole = values.email.includes("broker")
      ? "broker"
      : values.email.includes("owner")
      ? "owner"
      : "client";

    login({
      fullName: userName,
      email: values.email,
      role: userRole,
    });

    setIsLoading(false);

    toast({
      title: t('loginSuccessTitle'),
      description: t('loginSuccessDescription'),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t('emailPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>{t('password')}</FormLabel>
                <Link
                  href="#"
                  className="mr-auto inline-block text-sm underline"
                >
                  {t('forgotPassword')}
                </Link>
              </div>
              <FormControl>
                <Input type="password" placeholder={t('passwordPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          {t('loginButton')}
        </Button>
        <div className="mt-4 text-center text-sm">
          {t('noAccount')}{" "}
          <Link href="/signup" className="underline">
            {t('createAccount')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
