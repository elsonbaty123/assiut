"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslation } from "@/hooks/use-translation";

export function SearchForm() {
  const { t, language } = useTranslation();

  return (
    <Card className="shadow-xl -mb-16">
      <CardContent className="p-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
        >
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t('offerType')}</Label>
            <RadioGroup defaultValue="all" className="flex gap-4 pt-2">
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
            <label className="text-sm font-medium">{t('unitType')}</label>
            <Select dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectUnitType')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">{t('residential')}</SelectItem>
                <SelectItem value="administrative">{t('administrative')}</SelectItem>
                <SelectItem value="furnished">{t('furnished')}</SelectItem>
                <SelectItem value="land">{t('land')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t('region')}</label>
            <Input placeholder={t('regionPlaceholder')} />
          </div>

          <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                  <label className="text-sm font-medium">{t('price')}</label>
                  <Input type="number" placeholder={t('maxPrice')} />
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-medium">{t('area')}</label>
                  <Input type="number" placeholder={t('minArea')} />
              </div>
          </div>

          <Button type="submit" className="w-full lg:w-auto self-end">
            <Search className="ml-2 h-4 w-4" />
            {t('Search')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
