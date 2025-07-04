"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslation } from "@/hooks/use-translation";

export interface SearchFilters {
    offerType: 'all' | 'sale' | 'rent';
    propertyStatus: 'all' | 'ready' | 'under_construction';
    unitType: string;
    region: string;
    maxPrice: string;
    minArea: string;
}

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
}


export function SearchForm({ onSearch, onClear }: SearchFormProps) {
  const { t, language } = useTranslation();
  
  const [offerType, setOfferType] = useState<SearchFilters['offerType']>('all');
  const [propertyStatus, setPropertyStatus] = useState<SearchFilters['propertyStatus']>('all');
  const [unitType, setUnitType] = useState('all');
  const [region, setRegion] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minArea, setMinArea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
        offerType,
        propertyStatus,
        unitType,
        region,
        maxPrice,
        minArea,
    })
  }

  const handleClear = () => {
    setOfferType('all');
    setPropertyStatus('all');
    setUnitType('all');
    setRegion('');
    setMaxPrice('');
    setMinArea('');
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end pt-4"
    >
      <div className="space-y-2">
        <Label className="text-sm font-medium">{t('offerType')}</Label>
        <RadioGroup value={offerType} onValueChange={(value: SearchFilters['offerType']) => setOfferType(value)} className="flex gap-4 pt-2">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="font-normal">{t('all')}</Label>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="sale" id="sale" />
            <Label htmlFor="sale" className="font-normal">{t('forSale')}</Label>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="rent" id="rent" />
            <Label htmlFor="rent" className="font-normal">{t('forRent')}</Label>
          </div>
        </RadioGroup>
      </div>

       <div className="space-y-2">
        <Label className="text-sm font-medium">{t('propertyStatus')}</Label>
        <RadioGroup value={propertyStatus} onValueChange={(value: SearchFilters['propertyStatus']) => setPropertyStatus(value)} className="flex gap-4 pt-2">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="all" id="status-all" />
            <Label htmlFor="status-all" className="font-normal">{t('all')}</Label>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="ready" id="status-ready" />
            <Label htmlFor="status-ready" className="font-normal">{t('ready')}</Label>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="under_construction" id="status-under_construction" />
            <Label htmlFor="status-under_construction" className="font-normal">{t('under_construction')}</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('unitType')}</label>
        <Select dir={language === 'ar' ? 'rtl' : 'ltr'} value={unitType} onValueChange={setUnitType}>
          <SelectTrigger>
            <SelectValue placeholder={t('selectUnitType')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('all')}</SelectItem>
            <SelectItem value="residential">{t('residential')}</SelectItem>
            <SelectItem value="administrative">{t('administrative')}</SelectItem>
            <SelectItem value="furnished">{t('furnished')}</SelectItem>
            <SelectItem value="land">{t('land')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t('region')}</label>
        <Input placeholder={t('regionPlaceholder')} value={region} onChange={(e) => setRegion(e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
              <label className="text-sm font-medium">{t('price')}</label>
              <Input type="number" placeholder={t('maxPrice')} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>
          <div className="space-y-2">
              <label className="text-sm font-medium">{t('area')}</label>
              <Input type="number" placeholder={t('minArea')} value={minArea} onChange={(e) => setMinArea(e.target.value)} />
          </div>
      </div>

      <div className="flex items-end gap-2">
        <Button type="submit" className="w-full">
          <Search className="ml-2 h-4 w-4" />
          {t('Search')}
        </Button>
        <Button type="button" variant="ghost" onClick={handleClear} size="icon" aria-label={t('clearFilters')}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
