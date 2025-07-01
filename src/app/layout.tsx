import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/context/auth-context";
import { PropertyProvider } from "@/context/property-context";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Masaakin | مساكن",
  description: "منصة العقارات الرائدة لإيجار وبيع الشقق والأراضي.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The lang, dir, and theme attributes are managed by their respective client-side providers.
    // suppressHydrationWarning is used to prevent errors from the initial server/client mismatch.
    <html suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <PropertyProvider>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 pb-16 md:pb-0">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </PropertyProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
