import { PropertyCard } from "@/components/property-card";
import { SearchForm } from "@/components/search-form";
import type { Property } from "@/types";
import { Badge } from "@/components/ui/badge";

const featuredProperties: Property[] = [
  {
    id: "1",
    title: "شقة فاخرة للبيع في وسط المدينة",
    type: "sale",
    unitType: ["residential", "furnished"],
    price: 1200000,
    location: "الرياض",
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
    type: "rent",
    unitType: ["administrative"],
    price: 80000,
    location: "جدة",
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
    type: "rent",
    unitType: ["residential"],
    price: 45000,
    location: "الدمام",
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
    type: "sale",
    unitType: ["land"],
    price: 2500000,
    location: "الرياض",
    area: 600,
    image: "https://placehold.co/600x400.png",
    agent: { name: "شركة البناء الحديث", avatar: "https://placehold.co/100x100.png" },
    dataAiHint: "empty land plot"
  },
    {
    id: "5",
    title: "شقة مفروشة بإطلالة بحرية",
    type: "rent",
    unitType: ["residential", "furnished"],
    price: 90000,
    location: "جدة",
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
    type: "rent",
    unitType: ["administrative"],
    price: 5000,
    location: "الرياض",
    area: 25,
    image: "https://placehold.co/600x400.png",
    bedrooms: 0,
    bathrooms: 0,
    agent: { name: "مساحات العمل الذكية", avatar: "https://placehold.co/100x100.png" },
    dataAiHint: "coworking space"
  },
];


export default function Home() {
  return (
    <>
      <section className="relative bg-primary/10 pt-16 md:pt-24 lg:pt-32">
        <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4 text-lg">مساكن</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground/90">
              اعثر على منزلك أو استثمارك القادم
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/70">
              منصة متكاملة تجمع الملاك والسماسرة والعملاء. ابدأ البحث الآن.
            </p>
        </div>
        <div className="relative container mx-auto px-4 mt-8 md:mt-12">
           <SearchForm />
        </div>
         <div
          className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"
        />
      </section>

      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-10">
            عقارات مميزة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
