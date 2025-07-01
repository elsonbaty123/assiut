"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Property } from "@/types";

const initialProperties: Property[] = [
  {
    id: "1",
    title: "شقة فاخرة للبيع في الزمالك",
    title_en: "Luxury Apartment for Sale in Zamalek",
    type: "sale",
    unitType: ["residential", "furnished"],
    price: 3500000,
    location: "القاهرة",
    location_en: "Cairo",
    area: 180,
    image: "https://placehold.co/600x400.png",
    bedrooms: 3,
    bathrooms: 2,
    floor: 5,
    utilities: ["gas", "electricity", "water"],
    agent: { name: "شركة النيل للتعمير", avatar: "https://placehold.co/100x100.png" },
    dataAiHint: "modern apartment exterior"
  },
  {
    id: "2",
    title: "مكتب إداري للإيجار في المهندسين",
    title_en: "Office for Rent in Mohandessin",
    type: "rent",
    unitType: ["administrative"],
    price: 50000,
    location: "الجيزة",
    location_en: "Giza",
    area: 120,
    image: "https://placehold.co/600x400.png",
    bedrooms: 0,
    bathrooms: 1,
    floor: 10,
    utilities: ["electricity", "water"],
    agent: { name: "Broker User", avatar: "https://placehold.co/100x100.png" },
    dataAiHint: "office building"
  },
  {
    id: "3",
    title: "شقة عائلية للإيجار في سموحة",
    title_en: "Family Apartment for Rent in Smouha",
    type: "rent",
    unitType: ["residential"],
    price: 180000,
    location: "الإسكندرية",
    location_en: "Alexandria",
    area: 150,
    image: "https://placehold.co/600x400.png",
    bedrooms: 3,
    bathrooms: 2,
    agent: { name: "فاطمة علي", avatar: "https://placehold.co/100x100.png" },
    dataAiHint: "family apartment living"
  },
  {
    id: "4",
    title: "أرض للبيع في التجمع الخامس",
    title_en: "Land for Sale in the Fifth Settlement",
    type: "sale",
    unitType: ["land"],
    price: 10000000,
    location: "القاهرة الجديدة",
    location_en: "New Cairo",
    area: 600,
    image: "https://placehold.co/600x400.png",
    agent: { name: "Owner User", avatar: "https://placehold.co/100x100.png" },
    dataAiHint: "empty land plot"
  },
  {
    id: "5",
    title: "شقة مفروشة بإطلالة على البحر",
    title_en: "Furnished Apartment with Sea View",
    type: "rent",
    unitType: ["residential", "furnished"],
    price: 120000,
    location: "الإسكندرية",
    location_en: "Alexandria",
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
    title: "مساحة عمل مشتركة للإيجار في وسط البلد",
    title_en: "Coworking Space for Rent in Downtown",
    type: "rent",
    unitType: ["administrative"],
    price: 2000,
    location: "القاهرة",
    location_en: "Cairo",
    area: 25,
    image: "https://placehold.co/600x400.png",
    bedrooms: 0,
    bathrooms: 0,
    agent: { name: "Broker User", avatar: "https://placehold.co/100x100.png" },
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
