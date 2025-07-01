"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Property } from "@/types";

const initialProperties: Property[] = [];


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
