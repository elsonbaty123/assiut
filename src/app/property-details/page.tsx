import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AreaChart, Bath, BedDouble, Building, CheckCircle, DollarSign, Droplets, Lightbulb, MapPin, Wind } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const property = {
  id: "1",
  title: "شقة فاخرة للبيع في قلب الرياض",
  type: "sale",
  unitType: ["residential", "furnished"],
  price: 1200000,
  location: "حي العليا، الرياض",
  area: 180,
  images: [
    "https://placehold.co/800x600.png",
    "https://placehold.co/800x600.png",
    "https://placehold.co/800x600.png",
  ],
  bedrooms: 3,
  bathrooms: 2,
  floor: 5,
  utilities: ["gas", "electricity", "water"],
  description: "شقة عصرية بتشطيبات فاخرة في برج سكني حديث. تتميز بإطلالات بانورامية على المدينة وموقع استراتيجي بالقرب من جميع الخدمات والمراكز التجارية. الشقة مؤثثة بالكامل بأثاث راقٍ وجاهزة للسكن الفوري. مثالية للعائلات التي تبحث عن نمط حياة مريح وفاخر.",
  agent: { name: "شركة الأفق للعقارات", avatar: "https://placehold.co/100x100.png" },
  dataAiHint: "luxury apartment interior"
};

const utilityIcons = {
    gas: <Wind className="h-5 w-5 text-primary" />,
    electricity: <Lightbulb className="h-5 w-5 text-primary" />,
    water: <Droplets className="h-5 w-5 text-primary" />,
}

export default function PropertyDetailsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className="overflow-hidden mb-8">
              <CardContent className="p-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {property.images.map((src, index) => (
                      <CarouselItem key={index}>
                        <Image
                          alt={`${property.title} - صورة ${index + 1}`}
                          className="aspect-video w-full object-cover"
                          height={600}
                          src={src}
                          width={800}
                          data-ai-hint={index === 0 ? "apartment living room" : index === 1 ? "modern kitchen" : "bedroom view"}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="right-16" />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>

            <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="w-5 h-5"/>
                <span>{property.location}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">{property.type === 'sale' ? 'للبيع' : 'للإيجار'}</Badge>
                {property.unitType.map(type => (
                     <Badge key={type} variant="outline">
                        {type === 'residential' && 'سكني'}
                        {type === 'administrative' && 'إداري'}
                        {type === 'furnished' && 'مفروش'}
                    </Badge>
                ))}
            </div>

            <Separator className="my-8" />
            
            <h2 className="text-2xl font-bold mb-4">المواصفات</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
                <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                         <DollarSign className="w-8 h-8 text-primary"/>
                         <span className="font-bold text-lg">{property.price.toLocaleString('ar-SA')} ريال</span>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                         <AreaChart className="w-8 h-8 text-primary"/>
                         <span className="font-bold">{property.area} م²</span>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                         <BedDouble className="w-8 h-8 text-primary"/>
                         <span className="font-bold">{property.bedrooms} غرف</span>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                         <Bath className="w-8 h-8 text-primary"/>
                         <span className="font-bold">{property.bathrooms} حمامات</span>
                    </CardContent>
                </Card>
            </div>
            
            <Separator className="my-8" />

            <h2 className="text-2xl font-bold mb-4">الوصف</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
                {property.description}
            </p>

             <Separator className="my-8" />

            <h2 className="text-2xl font-bold mb-4">المرافق</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.utilities.map(util =>(
                    <div key={util} className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                        {utilityIcons[util as keyof typeof utilityIcons]}
                        <span className="font-medium">
                             {util === 'gas' && 'غاز'}
                             {util === 'electricity' && 'كهرباء'}
                             {util === 'water' && 'مياه'}
                        </span>
                    </div>
                ))}
            </div>

        </div>

        <div className="lg:col-span-1">
            <Card className="sticky top-20">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Avatar className="w-24 h-24 border-4 border-primary">
                            <AvatarImage src={property.agent.avatar} alt={property.agent.name}/>
                            <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <CardTitle>{property.agent.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="name">الاسم</Label>
                            <Input id="name" placeholder="اسمك الكامل" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <Input id="email" type="email" placeholder="بريدك الإلكتروني" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone">رقم الهاتف</Label>
                            <Input id="phone" type="tel" placeholder="رقم هاتفك" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">الرسالة</Label>
                            <Textarea id="message" placeholder="أنا مهتم بهذا العقار وأود المزيد من التفاصيل..." defaultValue="أنا مهتم بهذا العقار وأود المزيد من التفاصيل..."/>
                        </div>
                        <Button type="submit" className="w-full">إرسال استفسار</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
