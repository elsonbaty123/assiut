"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserTable } from "@/components/admin/user-table";
import { PropertyTable } from "@/components/admin/property-table";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { t, language } = useTranslation();

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
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold">{t('adminDashboardTitle')}</h1>
        <p className="text-muted-foreground">{t('welcomeAdmin', { name: user.fullName })}. {t('adminDashboardDescription')}</p>
      </div>

      <Tabs defaultValue="users" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">{t('userManagement')}</TabsTrigger>
          <TabsTrigger value="properties">{t('propertyManagement')}</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>{t('allUsers')}</CardTitle>
              <CardDescription>{t('manageUsersDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <UserTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>{t('allProperties')}</CardTitle>
              <CardDescription>{t('managePropertiesDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
