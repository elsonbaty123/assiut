"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AreaChart, Bath, BedDouble, Building, Droplets, Lightbulb, MapPin, Wind } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "@/hooks/use-translation";
import { ChatInterface } from "@/components/property/chat-interface";

const property = {
  id: "1",
  title: "شقة فاخرة للبيع في الزمالك",
  title_en: "Luxury Apartment for Sale in Zamalek",
  type: "sale" as const,
  unitType: ["residential", "furnished"],
  price: 3500000,
  location: "الزمالك، القاهرة",
  location_en: "Zamalek, Cairo",
  area: 180,
  images: [
    "https://placehold.co/800x600.png",
    "https://placehold.co/800x600.png",
    "https://placehold.co/800x600.png",
  ],
  bedrooms: 3,
  bathrooms: 2,
  floor: 5,
  utilities: ["gas", "electricity", "water"] as ("gas" | "electricity" | "water")[],
  description: "شقة عصرية بتشطيبات فاخرة في برج سكني حديث. تتميز بإطلالات بانورامية على النيل وموقع استراتيجي بالقرب من جميع الخدمات والمراكز التجارية. الشقة مؤثثة بالكامل بأثاث راقٍ وجاهزة للسكن الفوري. مثالية للعائلات التي تبحث عن نمط حياة مريح وفاخر.",
  description_en: "A modern apartment with luxury finishes in a modern residential tower. It features panoramic Nile views and a strategic location close to all services and shopping centers. The apartment is fully furnished with elegant furniture and is ready for immediate occupancy. Ideal for families looking for a comfortable and luxurious lifestyle.",
  agent: { name: "شركة النيل للتعمير", avatar: "https://placehold.co/100x100.png" },
  dataAiHint: "luxury apartment interior"
};

const utilityIcons = {
    gas: <Wind className="h-5 w-5 text-primary" />,
    electricity: <Lightbulb className="h-5 w-5 text-primary" />,
    water: <Droplets className="h-5 w-5 text-primary" />,
}

export default function PropertyDetailsPage() {
  const { t, language } = useTranslation();
  
  const displayTitle = language === 'ar' ? property.title : (property.title_en || property.title);
  const displayLocation = language === 'ar' ? property.location : (property.location_en || property.location);
  const displayDescription = language === 'ar' ? property.description : (property.description_en || property.description);

  const unitTypeTranslations = {
    residential: t('residential'),
    administrative: t('administrative'),
    furnished: t('furnished'),
  }

  const utilityTranslations = {
    gas: t('gas'),
    electricity: t('electricity'),
    water: t('water'),
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{displayTitle}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="w-5 h-5"/>
                <span>{displayLocation}</span>
            </div>
            
            <div className="flex items-baseline gap-4 mb-6">
                 <span className="text-4xl font-bold text-primary">{property.price.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')} {t('egp')}</span>
                {property.type === 'rent' && <span className="text-xl text-muted-foreground">{t('perYear')}</span>}
            </div>

            <Card className="overflow-hidden mb-8">
              <CardContent className="p-0">
                <Carousel className="w-full" dir={language}>
                  <CarouselContent>
                    {property.images.map((src, index) => (
                      <CarouselItem key={index}>
                        <Image
                          alt={`${displayTitle} - image ${index + 1}`}
                          className="aspect-video w-full object-cover"
                          height={600}
                          src={src}
                          width={800}
                          data-ai-hint={index === 0 ? "apartment living room" : index === 1 ? "modern kitchen" : "bedroom view"}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className={language === 'ar' ? 'right-16' : 'left-16'} />
                  <CarouselNext className={language === 'ar' ? 'left-4' : 'right-4'}/>
                </Carousel>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">{property.type === 'sale' ? t('forSale') : t('forRent')}</Badge>
                {property.unitType.map(type => (
                     <Badge key={type} variant="outline">
                        {unitTypeTranslations[type as keyof typeof unitTypeTranslations]}
                    </Badge>
                ))}
            </div>

            <Separator className="my-8" />
            
            <h2 className="text-2xl font-bold mb-4">{t('Specifications')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
                 <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                         <AreaChart className="w-8 h-8 text-primary"/>
                         <span className="font-bold text-lg">{property.area} {t('sqm')}</span>
                         <span className="text-sm text-muted-foreground">{t('area')}</span>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                         <BedDouble className="w-8 h-8 text-primary"/>
                         <span className="font-bold text-lg">{property.bedrooms}</span>
                         <span className="text-sm text-muted-foreground">{t('bedrooms')}</span>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                         <Bath className="w-8 h-8 text-primary"/>
                         <span className="font-bold text-lg">{property.bathrooms}</span>
                         <span className="text-sm text-muted-foreground">{t('bathrooms')}</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                         <Building className="w-8 h-8 text-primary"/>
                         <span className="font-bold text-lg">{property.floor}</span>
                         <span className="text-sm text-muted-foreground">{t('floor')}</span>
                    </CardContent>
                </Card>
            </div>
            
            <Separator className="my-8" />

            <h2 className="text-2xl font-bold mb-4">{t('Description')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
                {displayDescription}
            </p>

             <Separator className="my-8" />

            <h2 className="text-2xl font-bold mb-4">{t('Utilities')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.utilities && property.utilities.map(util =>(
                    <div key={util} className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                        {utilityIcons[util]}
                        <span className="font-medium">
                            {utilityTranslations[util]}
                        </span>
                    </div>
                ))}
            </div>

        </div>

        <div className="lg:col-span-1">
            <Card className="sticky top-24">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Avatar className="w-24 h-24 border-4 border-primary">
                            <AvatarImage src={property.agent.avatar} alt={property.agent.name}/>
                            <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <CardTitle>{property.agent.name}</CardTitle>
                    <CardDescription>{t('chatWithAgent')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChatInterface agent={property.agent} />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
