"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Home, Building2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">مساكن</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
             <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              الرئيسية
            </Link>
            <Link
              href="/dashboard/add-property"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              أضف عقار
            </Link>
             <Link
              href="/property-details"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              تفاصيل العقار
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Can add a command menu here in the future */}
          </div>
          <nav className="flex items-center gap-2">
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "ghost" }), "px-4")}
            >
              دخول
            </Link>
            <Link
              href="/signup"
              className={buttonVariants({ variant: "default" })}
            >
              إنشاء حساب
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
