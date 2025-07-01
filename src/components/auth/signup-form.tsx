"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Loader2, User, Briefcase, KeyRound } from "lucide-react";

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
import { useTranslation } from "@/hooks/use-translation";
import { useAuth } from "@/context/auth-context";
import { PasswordInput } from "@/components/ui/password-input";
import { PasswordStrength } from "@/components/password-strength";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function SignUpForm() {
  const { t } = useTranslation();
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
    phoneNumber: z.string().regex(/^01[0125]\d{8}$/, {
      message: t('validationPhoneFormat'),
    }),
    password: z.string()
      .min(8, { message: t('passwordValidationLength') })
      .regex(/[a-z]/, { message: t('passwordValidationLowercase') })
      .regex(/[A-Z]/, { message: t('passwordValidationUppercase') })
      .regex(/\d/, { message: t('passwordValidationDigit') })
      .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: t('passwordValidationSpecial') }),
    role: z.enum(["client", "broker", "owner"], {
      required_error: t('validationRoleRequired'),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const result = await signup({
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        role: values.role,
        password: values.password
    });
    
    setIsLoading(false);
    
    if (result.success) {
      toast({
        title: t('signupSuccessTitle'),
        description: t('signupSuccessDescription'),
      });
    } else if (result.messageKey) {
      toast({
        variant: "destructive",
        title: t('signupFailedTitle'),
        description: t(result.messageKey),
      });
    }
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('phoneNumber')}</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder={t('phoneNumberPlaceholder')}
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
                <PasswordInput placeholder={t('passwordPlaceholder')} {...field} />
              </FormControl>
              <PasswordStrength password={field.value} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{t('role')}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="client" id="role-client" className="peer sr-only" />
                    <Label
                      htmlFor="role-client"
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 font-normal hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:shadow-focus-gradient cursor-pointer"
                    >
                      <User className="mb-3 h-6 w-6" />
                      {t('client')}
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="broker" id="role-broker" className="peer sr-only" />
                    <Label
                      htmlFor="role-broker"
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 font-normal hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:shadow-focus-gradient cursor-pointer"
                    >
                      <Briefcase className="mb-3 h-6 w-6" />
                      {t('broker')}
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="owner" id="role-owner" className="peer sr-only" />
                    <Label
                      htmlFor="role-owner"
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 font-normal hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:shadow-focus-gradient cursor-pointer"
                    >
                      <KeyRound className="mb-3 h-6 w-6" />
                      {t('owner')}
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
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
