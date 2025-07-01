"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, User, Building } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

export function BottomNavbar() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const pathname = usePathname();

  if (!user) {
    return null;
  }

  const clientNavItems = [
    { href: "/", label: t('Home'), icon: Home },
    { href: "/my-chats", label: t('myChats'), icon: MessageSquare },
    { href: "/account", label: t('myAccount'), icon: User },
  ];

  const ownerBrokerNavItems = [
    { href: "/", label: t('Home'), icon: Home },
    { href: "/dashboard/my-properties", label: t('myProperties'), icon: Building },
    { href: "/my-chats", label: t('myChats'), icon: MessageSquare },
    { href: "/account", label: t('myAccount'), icon: User },
  ];
  
  let navItems: { href: string; label: string; icon: React.ElementType }[] = [];
  let gridCols = '';

  if (user.role === 'client') {
    navItems = clientNavItems;
    gridCols = 'grid-cols-3';
  } else if (user.role === 'broker' || user.role === 'owner') {
    navItems = ownerBrokerNavItems;
    gridCols = 'grid-cols-4';
  } else {
    return null; // Don't show for admin or other roles
  }


  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border">
      <div className={cn("grid h-full max-w-lg mx-auto font-medium", gridCols)}>
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
