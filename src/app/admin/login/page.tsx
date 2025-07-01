
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminLoginForm } from "@/components/auth/admin-login-form";
import { useTranslation } from "@/hooks/use-translation";

export default function AdminLoginPage() {
  const { t } = useTranslation();
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('adminLoginTitle')}</CardTitle>
        <CardDescription>
          {t('adminLoginDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AdminLoginForm />
      </CardContent>
    </Card>
  );
}
