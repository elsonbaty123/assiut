"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Notifications } from "./notifications";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  const { user, logout } = useAuth();
  const { t, language } = useTranslation();

  const avatarSrc = user?.avatar;

  const navLinks = (
    <>
      {user && (
        <>
          {user.role === 'admin' && (
            <SheetClose asChild>
                <Link href="/admin/dashboard" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "w-auto justify-center")}>{t('adminDashboardTitle')}</Link>
            </SheetClose>
          )}
          {(user.role === "broker" || user.role === "owner") && (
            <SheetClose asChild>
                <Link href="/dashboard/add-property" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "w-auto justify-center")}>{t('Add Property')}</Link>
            </SheetClose>
          )}
          {user.role !== 'admin' && (
              <SheetClose asChild>
                <Link href="/my-chats" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "w-auto justify-center")}>{t('myChats')}</Link>
              </SheetClose>
          )}
          <SheetClose asChild>
            <Link href="/account" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "w-auto justify-center")}>{t('Account Settings')}</Link>
          </SheetClose>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        
        <div className="flex flex-1 items-center justify-start">
            <Link href="/" className="mr-6 flex items-center space-x-2 rtl:space-x-reverse">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
                <span className="hidden font-bold sm:inline-block">{t('Masaakin')}</span>
            </Link>
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
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 md:flex">
            <LanguageToggle />
            <ThemeToggle />
            {user ? (
              <>
                <Notifications />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={avatarSrc}
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
                    {(user.role === "broker" || user.role === "owner") && (
                      <DropdownMenuItem asChild dir={language === 'ar' ? 'rtl' : 'ltr'}>
                          <Link href="/dashboard/add-property">{t('Add Property')}</Link>
                      </DropdownMenuItem>
                    )}
                     {user.role !== 'admin' && (
                        <DropdownMenuItem asChild dir={language === 'ar' ? 'rtl' : 'ltr'}>
                          <Link href="/my-chats">{t('myChats')}</Link>
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
              </>
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

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={language === 'ar' ? 'left' : 'right'} className="flex flex-col p-0">
                <SheetHeader className="text-center p-6 border-b">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
                  <div className="flex justify-center">
                    <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
                      <span className="font-bold">{t('Masaakin')}</span>
                    </Link>
                  </div>
                </SheetHeader>

                <div className="flex flex-col items-center gap-2 py-4">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
                
                <nav className="flex flex-col items-center gap-2 px-6">
                  <SheetClose asChild>
                    <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "w-auto justify-center")}>{t('Home')}</Link>
                  </SheetClose>
                  {user ? (
                    navLinks
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "w-auto justify-center")}>{t('Login')}</Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/signup" className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-auto justify-center")}>{t('Sign Up')}</Link>
                      </SheetClose>
                    </>
                  )}
                </nav>

                <div className="flex-grow"></div>
                
                {user && (
                    <div className="flex flex-col items-center gap-4 mt-auto border-t p-6">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={avatarSrc} alt={user.fullName}/>
                            <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                            <p className="text-sm font-medium">{user.fullName}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <SheetClose asChild>
                            <Button variant="ghost" size="lg" onClick={logout} className="w-auto justify-center">
                            {t('Logout')}
                            </Button>
                        </SheetClose>
                    </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
