"use client";

import { useAuth } from "@/context/auth-context";
import { useProperties } from "@/context/property-context";
import { useTranslation } from "@/hooks/use-translation";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyPropertiesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { properties } = useProperties();
  const router = useRouter();

  useEffect(() => {
    if (user && (user.role !== 'owner' && user.role !== 'broker')) {
      router.push('/');
    }
  }, [user, router]);
  
  const myProperties = user
    ? properties.filter(p => p.agent.name === user.fullName)
    : [];

  if (!user || (user.role !== 'owner' && user.role !== 'broker')) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>{t('pleaseLogin')}</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('myProperties')}</h1>
          <p className="text-muted-foreground">{t('myPropertiesDescription')}</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/add-property">
            <PlusCircle className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
            {t('Add Property')}
          </Link>
        </Button>
      </div>

      {myProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">{t('noPropertiesFoundTitle')}</h2>
          <p className="text-muted-foreground mt-2">{t('noPropertiesFoundDescription')}</p>
          <Button asChild className="mt-6">
            <Link href="/dashboard/add-property">{t('addFirstProperty')}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
