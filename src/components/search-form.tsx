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

export function SearchForm() {
  return (
    <Card className="shadow-xl -mb-16">
      <CardContent className="p-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">نوع الوحدة</label>
            <Select dir="rtl">
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع الوحدة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">سكني</SelectItem>
                <SelectItem value="administrative">إداري</SelectItem>
                <SelectItem value="furnished">مفروش</SelectItem>
                <SelectItem value="land">أرض</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">المنطقة</label>
            <Input placeholder="مثال: الرياض, جدة..." />
          </div>

          <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                  <label className="text-sm font-medium">السعر (ريال)</label>
                  <Input type="number" placeholder="أقصى سعر" />
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-medium">المساحة (م²)</label>
                  <Input type="number" placeholder="أدنى مساحة" />
              </div>
          </div>

          <Button type="submit" className="w-full lg:w-auto self-end">
            <Search className="ml-2 h-4 w-4" />
            بحث
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
