export type Property = {
  id: string;
  title: string;
  type: "rent" | "sale";
  unitType: ("administrative" | "residential" | "furnished" | "land")[];
  price: number;
  location: string;
  area: number;
  image: string;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  utilities?: ("gas" | "electricity" | "water")[];
  description?: string;
  agent: Agent;
  dataAiHint?: string;
};

export type Agent = {
    name: string;
    avatar: string;
}
