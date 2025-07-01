"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SignUpForm() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="full-name">الاسم الكامل</Label>
        <Input id="full-name" placeholder="الاسم الكامل" required />
      </div>
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
        <Label htmlFor="password">كلمة المرور</Label>
        <Input id="password" type="password" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="role">أنا</Label>
        <Select dir="rtl" required>
          <SelectTrigger id="role">
            <SelectValue placeholder="اختر دورك" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="client">عميل</SelectItem>
            <SelectItem value="broker">سمسار</SelectItem>
            <SelectItem value="owner">مالك</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        إنشاء حساب
      </Button>
      <div className="mt-4 text-center text-sm">
        لديك حساب بالفعل؟{" "}
        <Link href="/login" className="underline">
          تسجيل الدخول
        </Link>
      </div>
    </div>
  );
}
