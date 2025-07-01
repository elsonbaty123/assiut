"use client";

import { useState, useCallback } from "react";
import { PropertyCard } from "@/components/property-card";
import { SearchForm, type SearchFilters } from "@/components/search-form";
import type { Property } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";

const featuredProperties: Property[] = [
  {
    id: "1",
    title: "شقة فاخرة للبيع في وسط المدينة",
    title_en: "Luxury Apartment for Sale in Downtown",
    type: "sale",
    unitType: ["residential", "furnished"],
    price: 1200000,
    location: "الرياض",
    location_en: "Riyadh",
    area: 180,
    image: "https://placehold.co/600x400.png",
    bedrooms: 3,
    bathrooms: 2,
    floor: 5,
    utilities: ["gas", "electricity", "water"],
    agent: { name: "شركة الأفق للعقارات", avatar: "https://placehold.co/100x100.png" },
    dataAiHint: "modern apartment exterior"
  },
  {
    id: "2",
    title: "مكتب إداري للإيجار بموقع متميز",
    title_en: "Administrative Office for Rent in a Prime Location",
    type: "rent",
    unitType: ["administrative"],
    price: 80000,
    location: "جدة",
    location_en: "Jeddah",
    area: 120,
    image: "https://placehold.co/600x400.png",
    bedrooms: 0,
    bathrooms: 1,
    floor: 10,
    utilities: ["electricity", "water"],
    agent: { name: "عبدالله السالم", avatar: "https://placehold.co/100x100.png" },
    dataAiHint: "office building"
  },
  {
    id: "3",
    title: "شقة عائلية للإيجار",
    title_en: "Family Apartment for Rent",
    type: "rent",
    unitType: ["residential"],
    price: 45000,
    location: "الدمام",
    location_en: "Dammam",
    area: 150,
    image: "https://placehold.co/600x400.png",
    bedrooms: 3,
    bathrooms: 2,
    agent: { name: "سارة القحطاني", avatar: "https://placehold.co/100x100.png" },
    dataAiHint: "family apartment living"
  },
  {
    id: "4",
    title: "أرض للبيع في حي الياسمين",
    title_en: "Land for Sale in Al-Yasmin District",
    type: "sale",
    unitType: ["land"],
    price: 2500000,
    location: "الرياض",
    location_en: "Riyadh",
    area: 600,
    image: "https://placehold.co/600x400.png",
    agent: { name: "شركة البناء الحديث", avatar: "https://placehold.co/100x100.png" },
    dataAiHint: "empty land plot"
  },
    {
    id: "5",
    title: "شقة مفروشة بإطلالة بحرية",
    title_en: "Furnished Apartment with Sea View",
    type: "rent",
    unitType: ["residential", "furnished"],
    price: 90000,
    location: "جدة",
    location_en: "Jeddah",
    area: 130,
    image: "https://placehold.co/600x400.png",
    bedrooms: 2,
    bathrooms: 2,
    floor: 12,
    utilities: ["water", "electricity"],
    agent: { name: "شركة الساحل للعقارات", avatar: "https://placehold.co/100x100.png" },
    dataAiHint: "apartment sea view"
  },
  {
    id: "6",
    title: "مساحة مكتبية مشتركة للإيجار",
    title_en: "Coworking Office Space for Rent",
    type: "rent",
    unitType: ["administrative"],
    price: 5000,
    location: "الرياض",
    location_en: "Riyadh",
    area: 25,
    image: "https://placehold.co/600x400.png",
    bedrooms: 0,
    bathrooms: 0,
    agent: { name: "مساحات العمل الذكية", avatar: "https://placehold.co/100x100.png" },
    dataAiHint: "coworking space"
  },
];


export default function Home() {
  const { t } = useTranslation();
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>(featuredProperties);

  const handleSearch = useCallback((filters: SearchFilters) => {
    let results = featuredProperties;

    if (filters.offerType !== 'all') {
      results = results.filter(p => p.type === filters.offerType);
    }
    
    if (filters.unitType && filters.unitType !== 'all') {
      results = results.filter(p => p.unitType.includes(filters.unitType as any));
    }

    if (filters.region) {
      const searchTerm = filters.region.toLowerCase();
      results = results.filter(p => 
        p.location.toLowerCase().includes(searchTerm) || 
        p.location_en?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.maxPrice) {
      results = results.filter(p => p.price <= Number(filters.maxPrice));
    }

    if (filters.minArea) {
      results = results.filter(p => p.area >= Number(filters.minArea));
    }

    setDisplayedProperties(results);
  }, []);


  return (
    <>
      <section className="relative bg-primary/10 pt-16 md:pt-24 lg:pt-32">
        <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4 text-lg">{t('Masaakin')}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground/90">
              {t('heroTitle')}
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/70">
              {t('heroSubtitle')}
            </p>
        </div>
        <div className="relative container mx-auto px-4 mt-8 md:mt-12">
           <SearchForm onSearch={handleSearch} />
        </div>
         <div
          className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"
        />
      </section>

      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-10">
            {t('Featured Properties')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProperties.length > 0 ? (
                displayedProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))
            ) : (
                <div className="col-span-full text-center py-10">
                    <p className="text-xl text-muted-foreground">{t('noResultsFound')}</p>
                </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
