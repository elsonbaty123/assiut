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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "الاسم الكامل يجب أن يكون حرفين على الأقل.",
  }),
  email: z.string().email({
    message: "الرجاء إدخال بريد إلكتروني صالح.",
  }),
  password: z.string().min(8, {
    message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل.",
  }),
  role: z.enum(["client", "broker", "owner"], {
    required_error: "الرجاء اختيار دور.",
  }),
});

export function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
    // Simulate API call for account creation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In a real app, you would handle success/error from the API
    console.log("Account created with:", values);
    
    setIsLoading(false);
    
    toast({
      title: "تم إنشاء الحساب بنجاح!",
      description: "سيتم توجيهك إلى صفحة تسجيل الدخول.",
    });

    // Redirect to login page after a short delay to allow user to see the toast
    setTimeout(() => {
        router.push("/login");
    }, 2000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم الكامل</FormLabel>
              <FormControl>
                <Input placeholder="الاسم الكامل" {...field} />
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
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="m@example.com"
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
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
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
              <FormLabel>أنا</FormLabel>
              <Select dir="rtl" onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر دورك" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="client">عميل</SelectItem>
                  <SelectItem value="broker">سمسار</SelectItem>
                  <SelectItem value="owner">مالك</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
           {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          إنشاء حساب
        </Button>
        <div className="mt-4 text-center text-sm">
          لديك حساب بالفعل؟{" "}
          <Link href="/login" className="underline">
            تسجيل الدخول
          </Link>
        </div>
      </form>
    </Form>
  );
}
