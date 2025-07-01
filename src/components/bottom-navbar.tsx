"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, User } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

export function BottomNavbar() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const pathname = usePathname();

  if (!user || user.role !== 'client') {
    return null;
  }

  const navItems = [
    { href: "/", label: t('Home'), icon: Home },
    { href: "/my-chats", label: t('myChats'), icon: MessageSquare },
    { href: "/account", label: t('myAccount'), icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex flex-col items-center justify-center px-5 hover:bg-muted group",
              pathname === item.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
