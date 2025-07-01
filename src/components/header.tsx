
"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "@/hooks/use-translation";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";

export function Header() {
  const { user, logout } = useAuth();
  const { t, language } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        
        <div className="flex flex-1 items-center justify-start">
            <Link href="/" className="mr-6 flex items-center space-x-2 rtl:space-x-reverse">
                <Building2 className="h-6 w-6 text-primary" />
                <span className="hidden font-bold sm:inline-block">{t('Masaakin')}</span>
            </Link>
            <nav className="hidden items-center space-x-6 text-sm font-medium rtl:space-x-reverse md:flex">
                {user && (user.role === "broker" || user.role === "owner") && (
                <Link
                    href="/dashboard/add-property"
                    className="transition-colors hover:text-foreground/80 text-foreground"
                >
                    {t('Add Property')}
                </Link>
                )}
            </nav>
        </div>
        
        <nav className="hidden items-center justify-center text-sm font-medium md:flex">
            <Link
                href="/"
                className="transition-colors hover:text-foreground/80 text-foreground"
            >
                {t('Home')}
            </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2 rtl:space-x-reverse">
          <nav className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://placehold.co/32x32.png"
                        alt={user.fullName}
                        data-ai-hint="user avatar"
                      />
                      <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.fullName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild dir={language === 'ar' ? 'rtl' : 'ltr'}>
                        <Link href="/admin/dashboard">{t('adminDashboardTitle')}</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    <Link href="/account">{t('Account Settings')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {t('Logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(buttonVariants({ variant: "ghost" }), "px-4")}
                >
                  {t('Login')}
                </Link>
                <Link
                  href="/signup"
                  className={buttonVariants({ variant: "default" })}
                >
                  {t('Sign Up')}
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
