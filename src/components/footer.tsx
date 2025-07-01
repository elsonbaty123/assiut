import { Building2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4 md:mb-0">
             <Building2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">مساكن</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} مساكن. جميع الحقوق محفوظة.
          </p>
          <div className="flex space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">سياسة الخصوصية</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">شروط الاستخدام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
