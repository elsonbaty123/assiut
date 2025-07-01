"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/use-translation";

export function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <footer className="bg-background border-t hidden md:block">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4 md:mb-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
              <span className="font-bold text-lg">{t('Masaakin')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">{t('Privacy Policy')}</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">{t('Terms of Use')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
