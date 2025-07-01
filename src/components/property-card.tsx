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

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const isForSale = property.type === "sale";

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0 relative">
        <Link href="/property-details">
            <Image
              alt={property.title}
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
          {isForSale ? "للبيع" : "للإيجار"}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="mb-2 text-lg">
          <Link href="/property-details" className="hover:text-primary transition-colors">
            {property.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          <span>{property.location}</span>
        </CardDescription>
        <div className="flex flex-wrap gap-2 mb-4">
            {property.unitType.map((type) => (
                <Badge key={type} variant="outline">
                    {type === "residential" && "سكني"}
                    {type === "administrative" && "إداري"}
                    {type === "furnished" && "مفروش"}
                    {type === "land" && "أرض"}
                </Badge>
            ))}
        </div>
        
        <div className="flex justify-between items-center text-sm text-foreground">
           {property.unitType[0] !== 'land' && (
             <>
                <div className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-muted-foreground" />
                    <span>{property.bedrooms ?? 0} غرف نوم</span>
                </div>
                <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4 text-muted-foreground" />
                    <span>{property.bathrooms ?? 0} حمامات</span>
                </div>
             </>
           )}
            <div className="flex items-center gap-2">
                <AreaChart className="w-4 h-4 text-muted-foreground" />
                <span>{property.area} م²</span>
            </div>
        </div>

      </CardContent>
      <CardFooter className="p-4 bg-secondary/30 flex justify-between items-center">
        <p className="text-xl font-bold text-primary">
          {property.price.toLocaleString("ar-SA")} ريال
          {!isForSale && <span className="text-sm font-normal text-muted-foreground">/سنوي</span>}
        </p>
        <Link href="/property-details" className={cn(buttonVariants({ variant: 'default' }))}>
          التفاصيل
        </Link>
      </CardFooter>
    </Card>
  );
}
