import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AccountSettingsForm } from "@/components/account/settings-form";

export default function AccountPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>إعدادات الحساب</CardTitle>
          <CardDescription>
            قم بتحديث معلومات ملفك الشخصي وتفضيلاتك هنا.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccountSettingsForm />
        </CardContent>
      </Card>
    </div>
  );
}
