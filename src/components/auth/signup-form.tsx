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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import { useAuth } from "@/context/auth-context";

export function SignUpForm() {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    fullName: z.string().min(2, {
      message: t('validationFullNameMin'),
    }),
    email: z.string().email({
      message: t('validationEmail'),
    }),
    password: z.string().min(8, {
      message: t('validationPasswordMin'),
    }),
    role: z.enum(["client", "broker", "owner"], {
      required_error: t('validationRoleRequired'),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    await signup({
        fullName: values.fullName,
        email: values.email,
        role: values.role,
        password: values.password
    });
    
    setIsLoading(false);
    
    toast({
      title: t('signupSuccessTitle'),
      description: t('signupSuccessDescription'),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fullName')}</FormLabel>
              <FormControl>
                <Input placeholder={t('fullNamePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  {...field}
                />
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
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={t('passwordPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('role')}</FormLabel>
              <Select dir={language === 'ar' ? 'rtl' : 'ltr'} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectRole')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="client">{t('client')}</SelectItem>
                  <SelectItem value="broker">{t('broker')}</SelectItem>
                  <SelectItem value="owner">{t('owner')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
           {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
           {t('createAccountButton')}
        </Button>
        <div className="mt-4 text-center text-sm">
          {t('haveAccount')}{" "}
          <Link href="/login" className="underline">
            {t('Login')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
