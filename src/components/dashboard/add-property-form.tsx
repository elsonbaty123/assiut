"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface AddPropertyFormProps {
  type: "apartment" | "land";
}

export function AddPropertyForm({ type }: AddPropertyFormProps) {
  return (
    <form className="grid gap-6 mt-6">
      {type === "apartment" && (
        <>
          <div className="space-y-2">
            <Label>نوع العرض</Label>
            <RadioGroup defaultValue="sale" className="flex gap-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="sale" id="sale" />
                <Label htmlFor="sale">بيع</Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="rent" id="rent" />
                <Label htmlFor="rent">إيجار</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>نوع الوحدة</Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox id="residential" />
                <Label htmlFor="residential">سكني</Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox id="administrative" />
                <Label htmlFor="administrative">إداري</Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox id="furnished" />
                <Label htmlFor="furnished">مفروش</Label>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="bedrooms">غرف النوم</Label>
                <Input id="bedrooms" type="number" placeholder="مثال: 3" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="bathrooms">الحمامات</Label>
                <Input id="bathrooms" type="number" placeholder="مثال: 2" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="floor">الدور</Label>
                <Input id="floor" type="number" placeholder="مثال: 5" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="area-apt">المساحة (م²)</Label>
                <Input id="area-apt" type="number" placeholder="مثال: 150" />
            </div>
          </div>

          <div className="space-y-2">
              <Label>المرافق</Label>
              <div className="flex gap-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox id="gas"/>
                      <Label htmlFor="gas">غاز</Label>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox id="electricity"/>
                      <Label htmlFor="electricity">كهرباء</Label>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox id="water"/>
                      <Label htmlFor="water">مياه</Label>
                  </div>
              </div>
          </div>

        </>
      )}

      {type === "land" && (
         <div className="space-y-2">
            <Label htmlFor="area-land">المساحة (م²)</Label>
            <Input id="area-land" type="number" placeholder="مثال: 600" />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="location">المنطقة</Label>
            <Input id="location" placeholder="مثال: حي الياسمين، الرياض" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="price">السعر (ريال)</Label>
            <Input id="price" type="number" placeholder="مثال: 1,200,000" />
        </div>
      </div>
      
       <div className="space-y-2">
          <Label htmlFor="title">عنوان الإعلان</Label>
          <Input id="title" placeholder="مثال: شقة فاخرة للبيع..." />
        </div>

       <div className="space-y-2">
          <Label htmlFor="description">
            {type === "apartment" ? "وصف الشقة" : "مواصفات الأرض"}
          </Label>
          <Textarea id="description" placeholder="اكتب وصفاً تفصيلياً هنا..." />
        </div>

      <div className="space-y-2">
        <Label htmlFor="images">صور العقار</Label>
        <Input id="images" type="file" multiple />
        <p className="text-xs text-muted-foreground">يمكنك رفع صور متعددة.</p>
      </div>


      <Button type="submit" className="w-full md:w-auto justify-self-end mt-4">
        إضافة العقار
      </Button>
    </form>
  );
}
