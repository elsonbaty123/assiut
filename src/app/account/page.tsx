"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AccountSettingsForm } from "@/components/account/settings-form";
import { useTranslation } from "@/hooks/use-translation";
import { ChangePasswordForm } from "@/components/account/change-password-form";

export default function AccountPage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto py-12 px-4 space-y-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{t('accountTitle')}</CardTitle>
          <CardDescription>
            {t('accountDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccountSettingsForm />
        </CardContent>
      </Card>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>{t('changePasswordTitle')}</CardTitle>
            <CardDescription>{t('changePasswordDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
            <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
