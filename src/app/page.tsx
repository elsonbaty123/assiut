"use client";

import { useState, useCallback, useEffect } from "react";
import { PropertyCard } from "@/components/property-card";
import { SearchForm, type SearchFilters } from "@/components/search-form";
import type { Property } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { useProperties } from "@/context/property-context";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();
  const { properties: featuredProperties } = useProperties();
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>(featuredProperties);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setDisplayedProperties(featuredProperties);
  }, [featuredProperties]);


  const handleSearch = useCallback((filters: SearchFilters) => {
    let results = featuredProperties;

    if (filters.offerType !== 'all') {
      results = results.filter(p => p.type === filters.offerType);
    }
    
    if (filters.unitType && filters.unitType !== 'all') {
      results = results.filter(p => p.unitType.includes(filters.unitType as any));
    }

    if (filters.region.trim()) {
      const searchTerm = filters.region.toLowerCase().trim();
      results = results.filter(p => 
        p.location.toLowerCase().includes(searchTerm) || 
        (p.location_en && p.location_en.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.maxPrice.trim()) {
        const maxPrice = Number(filters.maxPrice);
        if (!isNaN(maxPrice) && maxPrice > 0) {
          results = results.filter(p => p.price <= maxPrice);
        }
    }

    if (filters.minArea.trim()) {
        const minArea = Number(filters.minArea);
        if (!isNaN(minArea) && minArea > 0) {
          results = results.filter(p => p.area >= minArea);
        }
    }

    setDisplayedProperties(results);
  }, [featuredProperties]);

  const handleSearchAndClose = useCallback((filters: SearchFilters) => {
    handleSearch(filters);
    setIsSearchOpen(false);
  }, [handleSearch]);

  const handleClearFilters = useCallback(() => {
    setDisplayedProperties(featuredProperties);
    setIsSearchOpen(false);
  }, [featuredProperties]);


  return (
    <>
      <section className="relative bg-primary/10 pt-16 md:pt-24 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4 text-lg">{t('AppName')}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground/90">
              {t('heroTitle')}
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/70">
              {t('heroSubtitle')}
            </p>
            <div className="mt-8 md:mt-12 flex justify-center">
                <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg">
                            <Search className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2" />
                            {t('Search Properties')}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>{t('Filter Properties')}</DialogTitle>
                            <DialogDescription>
                              {t('Filter Properties Description')}
                            </DialogDescription>
                        </DialogHeader>
                        <SearchForm onSearch={handleSearchAndClose} onClear={handleClearFilters} />
                    </DialogContent>
                </Dialog>
            </div>
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
