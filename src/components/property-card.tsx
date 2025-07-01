import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Property } from "@/types";
import { MapPin, BedDouble, Bath, Home, AreaChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { t, language } = useTranslation();
  const isForSale = property.type === "sale";
  const isLand = property.unitType.includes("land");

  const displayTitle = language === 'ar' ? property.title : (property.title_en || property.title);
  const displayLocation = language === 'ar' ? property.location : (property.location_en || property.location);

  const unitTypeTranslations = {
    residential: t('residential'),
    administrative: t('administrative'),
    furnished: t('furnished'),
    land: t('land'),
  }

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0 relative">
        <Link href="/property-details">
            <Image
              alt={displayTitle}
              className="aspect-video w-full object-cover"
              height={338}
              src={property.image}
              width={600}
              data-ai-hint={property.dataAiHint}
            />
        </Link>
        <Badge
          className="absolute top-3 right-3"
          variant={isForSale ? "destructive" : "secondary"}
        >
          {isForSale ? t('forSale') : t('forRent')}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="mb-2 text-lg">
          <Link href="/property-details" className="hover:text-primary transition-colors">
            {displayTitle}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          <span>{displayLocation}</span>
        </CardDescription>
        <div className="flex flex-wrap gap-2 mb-4">
            {property.unitType.map((type) => (
                <Badge key={type} variant="outline">
                    {unitTypeTranslations[type]}
                </Badge>
            ))}
        </div>
        
        <div className="flex justify-between items-center text-sm text-foreground">
           {!isLand && (
             <>
                <div className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-muted-foreground" />
                    <span>{property.bedrooms ?? 0} {t('bedrooms')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4 text-muted-foreground" />
                    <span>{property.bathrooms ?? 0} {t('bathrooms')}</span>
                </div>
             </>
           )}
            <div className="flex items-center gap-2">
                <AreaChart className="w-4 h-4 text-muted-foreground" />
                <span>{property.area} {t('sqm')}</span>
            </div>
        </div>

      </CardContent>
      <CardFooter className="p-4 bg-secondary/30 flex justify-between items-center">
        <p className="text-xl font-bold text-primary">
          {property.price.toLocaleString(language === 'ar' ? "ar-SA" : "en-US")} {t('sar')}
          {!isForSale && <span className="text-sm font-normal text-muted-foreground">{t('perYear')}</span>}
        </p>
        <Link href="/property-details" className={cn(buttonVariants({ variant: 'default' }))}>
          {t('Details')}
        </Link>
      </CardFooter>
    </Card>
  );
}
