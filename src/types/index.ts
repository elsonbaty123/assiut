export type Property = {
  id: string;
  title: string;
  title_en?: string;
  type: "rent" | "sale";
  unitType: ("administrative" | "residential" | "furnished" | "land")[];
  price: number;
  location: string;
  location_en?: string;
  area: number;
  image: string;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  utilities?: ("gas" | "electricity" | "water")[];
  description?: string;
  description_en?: string;
  agent: Agent;
  dataAiHint?: string;
};

export type Agent = {
    name: string;
    avatar: string;
}
