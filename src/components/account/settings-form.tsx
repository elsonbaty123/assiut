"use client";

import { useAuth } from "@/context/auth-context";
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from "@/hooks/use-translation";

export function AccountSettingsForm() {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    fullName: z.string().min(2, {
      message: t('validationFullNameMin'),
    }),
    email: z.string().email({
      message: t('validationEmail'),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName,
        email: user.email,
      });
    }
  }, [user, form]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const success = await updateUser({ fullName: values.fullName });

    setIsLoading(false);
    if(success) {
      toast({
        title: t('profileUpdateSuccess'),
      });
    }
  }

  if (!user) {
      return (
          <div className="text-center text-muted-foreground">
              {t('pleaseLogin')}
          </div>
      )
  }

  const roleTranslations = {
    client: t('client'),
    broker: t('broker'),
    owner: t('owner'),
  };
  const displayRole = roleTranslations[user.role];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
            <Label>{t('userRole')}</Label>
            <p className="text-sm font-medium p-3 bg-muted rounded-md text-muted-foreground">
              {displayRole}
            </p>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {t('saveChanges')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
