"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

interface AddPropertyFormProps {
  type: "apartment" | "land";
}

const unitTypes = [
  { id: "residential", label: "سكني" },
  { id: "administrative", label: "إداري" },
  { id: "furnished", label: "مفروش" },
] as const;

const utilityTypes = [
    { id: "gas", label: "غاز" },
    { id: "electricity", label: "كهرباء" },
    { id: "water", label: "مياه" },
] as const;

const baseSchema = z.object({
  title: z.string().min(5, { message: "عنوان الإعلان يجب أن يكون 5 أحرف على الأقل." }),
  location: z.string().min(3, { message: "الرجاء إدخال منطقة صالحة." }),
  price: z.coerce.number().positive({ message: "الرجاء إدخال سعر صالح." }),
  description: z.string().min(10, { message: "الوصف يجب أن يكون 10 أحرف على الأقل." }),
  images: z.any().optional(),
  area: z.coerce.number().positive({ message: "الرجاء إدخال مساحة صالحة." }),
});

const apartmentSchema = baseSchema.extend({
  type: z.enum(["rent", "sale"], { required_error: "الرجاء اختيار نوع العرض." }),
  unitType: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "يجب عليك اختيار نوع وحدة واحد على الأقل.",
  }),
  bedrooms: z.coerce.number().int().min(0, { message: "عدد الغرف لا يمكن أن يكون سالبًا." }),
  bathrooms: z.coerce.number().int().min(0, { message: "عدد الحمامات لا يمكن أن يكون سالبًا." }),
  floor: z.coerce.number().int().min(0, { message: "رقم الدور لا يمكن أن يكون سالبًا." }),
  utilities: z.array(z.string()).optional(),
});

const landSchema = baseSchema;

const getFormSchema = (type: "apartment" | "land") => {
    return type === 'apartment' ? apartmentSchema : landSchema;
}

export function AddPropertyForm({ type }: AddPropertyFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const formSchema = getFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: type === 'apartment' ? {
            type: "sale",
            unitType: ["residential"],
            bedrooms: 0,
            bathrooms: 1,
            floor: 1,
            utilities: [],
            title: "",
            location: "",
            price: 100000,
            area: 100,
            description: "",
        } : {
            title: "",
            location: "",
            price: 500000,
            area: 500,
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        console.log("Submitting property:", { ...values, propertyType: type });
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        toast({
            title: "تمت إضافة العقار بنجاح!",
            description: "سيتم توجيهك إلى الصفحة الرئيسية.",
        });

        setTimeout(() => {
            router.push("/");
        }, 2000);
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 mt-6">
        {type === "apartment" && (
          <>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>نوع العرض</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2 rtl:space-x-reverse">
                        <FormControl>
                          <RadioGroupItem value="sale" id="sale" />
                        </FormControl>
                        <Label htmlFor="sale" className="font-normal">بيع</Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 rtl:space-x-reverse">
                        <FormControl>
                          <RadioGroupItem value="rent" id="rent" />
                        </FormControl>
                        <Label htmlFor="rent" className="font-normal">إيجار</Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unitType"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>نوع الوحدة</FormLabel>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {unitTypes.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="unitType"
                        render={({ field }) => {
                          return (
                            <FormItem key={item.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.id])
                                      : field.onChange(
                                          (field.value || [])?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField control={form.control} name="bedrooms" render={({ field }) => (<FormItem><FormLabel>غرف النوم</FormLabel><FormControl><Input type="number" placeholder="مثال: 3" {...field} /></FormControl><FormMessage /></FormItem>)} />
               <FormField control={form.control} name="bathrooms" render={({ field }) => (<FormItem><FormLabel>الحمامات</FormLabel><FormControl><Input type="number" placeholder="مثال: 2" {...field} /></FormControl><FormMessage /></FormItem>)} />
               <FormField control={form.control} name="floor" render={({ field }) => (<FormItem><FormLabel>الدور</FormLabel><FormControl><Input type="number" placeholder="مثال: 5" {...field} /></FormControl><FormMessage /></FormItem>)} />
               <FormField control={form.control} name="area" render={({ field }) => (<FormItem><FormLabel>المساحة (م²)</FormLabel><FormControl><Input id="area-apt" type="number" placeholder="مثال: 150" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>

            <FormField
              control={form.control}
              name="utilities"
              render={() => (
                <FormItem>
                  <div className="mb-4"><FormLabel>المرافق</FormLabel></div>
                   <div className="flex gap-4">
                    {utilityTypes.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="utilities"
                        render={({ field }) => {
                          return (
                            <FormItem key={item.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.id])
                                      : field.onChange(
                                          (field.value || [])?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {type === "land" && (
            <FormField control={form.control} name="area" render={({ field }) => (<FormItem><FormLabel>المساحة (م²)</FormLabel><FormControl><Input id="area-land" type="number" placeholder="مثال: 600" {...field} /></FormControl><FormMessage /></FormItem>)} />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="location" render={({ field }) => (<FormItem><FormLabel>المنطقة</FormLabel><FormControl><Input placeholder="مثال: حي الياسمين، الرياض" {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="price" render={({ field }) => (<FormItem><FormLabel>السعر (ريال)</FormLabel><FormControl><Input type="number" placeholder="مثال: 1,200,000" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
        
        <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>عنوان الإعلان</FormLabel><FormControl><Input placeholder="مثال: شقة فاخرة للبيع..." {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>{type === "apartment" ? "وصف الشقة" : "مواصفات الأرض"}</FormLabel><FormControl><Textarea placeholder="اكتب وصفاً تفصيلياً هنا..." {...field} /></FormControl><FormMessage /></FormItem>)} />

        <FormField control={form.control} name="images" render={({ field: { onChange, ...props } }) => (
            <FormItem>
                <FormLabel>صور العقار</FormLabel>
                <FormControl><Input type="file" multiple onChange={e => onChange(e.target.files)} {...props} /></FormControl>
                <FormDescription>يمكنك رفع صور متعددة.</FormDescription>
                <FormMessage />
            </FormItem>
        )} />

        <Button type="submit" className="w-full md:w-auto justify-self-end mt-4" disabled={isLoading}>
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          إضافة العقار
        </Button>
      </form>
    </Form>
  );
}
