"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Bell, Check } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Notification } from "@/types";

const mockNotificationsData: { [key: string]: Notification[] } = {
  owner: [],
  client: [],
  broker: [],
};

export function Notifications() {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const initialNotifications = useMemo(() => {
    if (!user) return [];
    return mockNotificationsData[user.role] || [];
  }, [user]);

  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const unreadNotifications = notifications.filter((n) => !n.read);
  const readNotifications = notifications.filter((n) => n.read);

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">{t('notifications')}</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} className="text-xs">
              <Check className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0"/>
              {t('markAllAsRead')}
            </Button>
          )}
        </div>
        <Tabs defaultValue="unread" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
            <TabsTrigger value="unread">{t('unread')}</TabsTrigger>
            <TabsTrigger value="read">{t('read')}</TabsTrigger>
          </TabsList>
          <TabsContent value="unread" className="max-h-96 overflow-y-auto">
            {unreadNotifications.length > 0 ? (
              unreadNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification.id)}
                />
              ))
            ) : (
              <p className="p-8 text-center text-sm text-muted-foreground">
                {t('noUnreadNotifications')}
              </p>
            )}
          </TabsContent>
          <TabsContent value="read" className="max-h-96 overflow-y-auto">
            {readNotifications.length > 0 ? (
              readNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification.id)}
                />
              ))
            ) : (
              <p className="p-8 text-center text-sm text-muted-foreground">
                {t('noNotifications')}
              </p>
            )}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}

interface NotificationItemProps {
    notification: Notification;
    onClick: () => void;
}

function NotificationItem({ notification, onClick }: NotificationItemProps) {
    const { t } = useTranslation();

    return (
         <Link href={notification.href} onClick={onClick}>
            <div className={cn(
                "flex items-start gap-3 p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors",
                !notification.read && "bg-primary/5"
            )}>
                <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src={notification.avatar} alt={notification.title} />
                    <AvatarFallback>{notification.avatarFallback}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="font-semibold text-sm">{t(notification.title)}</p>
                    <p className="text-xs text-muted-foreground">
                        {t(notification.description, notification.params)}
                    </p>
                    <p className="text-xs text-muted-foreground/80 mt-1">{notification.createdAt}</p>
                </div>
                {!notification.read && (
                    <div className="h-2.5 w-2.5 rounded-full bg-primary mt-1" />
                )}
            </div>
         </Link>
    )
}
