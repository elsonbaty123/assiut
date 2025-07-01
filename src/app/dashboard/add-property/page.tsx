import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddPropertyForm } from "@/components/dashboard/add-property-form";

export default function AddPropertyPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">إضافة عقار جديد</CardTitle>
          <CardDescription>
            اختر نوع العقار واملأ التفاصيل المطلوبة.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="apartment" className="w-full" dir="rtl">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="apartment">شقة</TabsTrigger>
              <TabsTrigger value="land">أرض</TabsTrigger>
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
