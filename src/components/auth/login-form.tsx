"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

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

const formSchema = z.object({
  email: z.string().email({
    message: "الرجاء إدخال بريد إلكتروني صالح.",
  }),
  password: z.string().min(8, {
    message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل.",
  }),
});

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call for login
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you would handle success/error from the API
    console.log("Logged in with:", values);

    setIsLoading(false);

    toast({
      title: "تم تسجيل الدخول بنجاح!",
      description: "جاري توجيهك إلى الصفحة الرئيسية.",
    });

    // Redirect to home page after a short delay
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input type="email" placeholder="m@example.com" {...field} />
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
                <FormLabel>كلمة المرور</FormLabel>
                <Link
                  href="#"
                  className="mr-auto inline-block text-sm underline"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          دخول
        </Button>
        <div className="mt-4 text-center text-sm">
          ليس لديك حساب؟{" "}
          <Link href="/signup" className="underline">
            إنشاء حساب
          </Link>
        </div>
      </form>
    </Form>
  );
}
