"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Property } from "@/types";

const initialProperties: Property[] = [
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


interface PropertyContextType {
  properties: Property[];
  deleteProperty: (propertyId: string) => Promise<boolean>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  const deleteProperty = async (propertyId: string): Promise<boolean> => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    return true;
  };

  return (
    <PropertyContext.Provider value={{ properties, deleteProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }
  return context;
}
