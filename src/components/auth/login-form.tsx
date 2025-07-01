"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">كلمة المرور</Label>
          <Link href="#" className="mr-auto inline-block text-sm underline">
            نسيت كلمة المرور؟
          </Link>
        </div>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" className="w-full">
        دخول
      </Button>
      <div className="mt-4 text-center text-sm">
        ليس لديك حساب؟{" "}
        <Link href="/signup" className="underline">
          إنشاء حساب
        </Link>
      </div>
    </div>
  );
}
