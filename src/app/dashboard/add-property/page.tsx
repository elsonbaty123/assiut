"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddPropertyForm } from "@/components/dashboard/add-property-form";
import { useTranslation } from "@/hooks/use-translation";

export default function AddPropertyPage() {
  const { t, language } = useTranslation();
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{t('addPropertyTitle')}</CardTitle>
          <CardDescription>
            {t('addPropertyDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="apartment" className="w-full" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="apartment">{t('apartmentTab')}</TabsTrigger>
              <TabsTrigger value="land">{t('landTab')}</TabsTrigger>
            </TabsList>
            <TabsContent value="apartment">
                <AddPropertyForm type="apartment" />
            </TabsContent>
            <TabsContent value="land">
                 <AddPropertyForm type="land" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
