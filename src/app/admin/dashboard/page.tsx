
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/admin/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>{t('pleaseLogin')}</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{t('adminDashboardTitle')}</CardTitle>
                <CardDescription>
                    {t('welcomeAdmin', { name: user.fullName })}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>{t('adminDashboardDescription')}</p>
                <Button onClick={logout}>{t('Logout')}</Button>
            </CardContent>
        </Card>
    </div>
  );
}
