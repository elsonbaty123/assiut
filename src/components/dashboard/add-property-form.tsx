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
import { useTranslation } from "@/hooks/use-translation";

interface AddPropertyFormProps {
  type: "apartment" | "land";
}

export function AddPropertyForm({ type }: AddPropertyFormProps) {
    const { t } = useTranslation();
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const unitTypes = [
      { id: "residential", label: t('residential') },
      { id: "administrative", label: t('administrative') },
      { id: "furnished", label: t('furnished') },
    ] as const;

    const utilityTypes = [
        { id: "gas", label: t('gas') },
        { id: "electricity", label: t('electricity') },
        { id: "water", label: t('water') },
    ] as const;
    
    const getFormSchema = (type: "apartment" | "land") => {
      const baseSchema = z.object({
        title: z.string().min(5, { message: t('validationAdTitleMin') }),
        location: z.string().min(3, { message: t('validationRegionMin') }),
        price: z.coerce.number().positive({ message: t('validationPricePositive') }),
        description: z.string().min(10, { message: t('validationDescriptionMin') }),
        images: z.any().optional(),
        area: z.coerce.number().positive({ message: t('validationAreaPositive') }),
      });

      const apartmentSchema = baseSchema.extend({
        type: z.enum(["rent", "sale"], { required_error: t('validationOfferTypeRequired') }),
        unitType: z.array(z.string()).refine((value) => value.some((item) => item), {
          message: t('validationUnitTypeRequired'),
        }),
        bedrooms: z.coerce.number().int().min(0, { message: t('validationBedroomsMin') }),
        bathrooms: z.coerce.number().int().min(0, { message: t('validationBathroomsMin') }),
        floor: z.coerce.number().int().min(0, { message: t('validationFloorMin') }),
        utilities: z.array(z.string()).optional(),
      });

      const landSchema = baseSchema;

      return type === 'apartment' ? apartmentSchema : landSchema;
    }
    
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
            title: t('addSuccessTitle'),
            description: t('addSuccessDescription'),
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
                  <FormLabel>{t('offerType')}</FormLabel>
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
                        <Label htmlFor="sale" className="font-normal">{t('forSale')}</Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 rtl:space-x-reverse">
                        <FormControl>
                          <RadioGroupItem value="rent" id="rent" />
                        </FormControl>
                        <Label htmlFor="rent" className="font-normal">{t('forRent')}</Label>
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
                    <FormLabel>{t('unitType')}</FormLabel>
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
               <FormField control={form.control} name="bedrooms" render={({ field }) => (<FormItem><FormLabel>{t('bedrooms')}</FormLabel><FormControl><Input type="number" placeholder={t('bedroomsPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>)} />
               <FormField control={form.control} name="bathrooms" render={({ field }) => (<FormItem><FormLabel>{t('bathrooms')}</FormLabel><FormControl><Input type="number" placeholder={t('bathroomsPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>)} />
               <FormField control={form.control} name="floor" render={({ field }) => (<FormItem><FormLabel>{t('floor')}</FormLabel><FormControl><Input type="number" placeholder={t('floorPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>)} />
               <FormField control={form.control} name="area" render={({ field }) => (<FormItem><FormLabel>{t('area')}</FormLabel><FormControl><Input id="area-apt" type="number" placeholder={t('aptAreaPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>

            <FormField
              control={form.control}
              name="utilities"
              render={() => (
                <FormItem>
                  <div className="mb-4"><FormLabel>{t('Utilities')}</FormLabel></div>
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
            <FormField control={form.control} name="area" render={({ field }) => (<FormItem><FormLabel>{t('area')}</FormLabel><FormControl><Input id="area-land" type="number" placeholder={t('landAreaPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>)} />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="location" render={({ field }) => (<FormItem><FormLabel>{t('region')}</FormLabel><FormControl><Input placeholder={t('regionPlaceholderAdd')} {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="price" render={({ field }) => (<FormItem><FormLabel>{t('price')}</FormLabel><FormControl><Input type="number" placeholder={t('pricePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
        
        <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>{t('adTitle')}</FormLabel><FormControl><Input placeholder={t('adTitlePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>{type === "apartment" ? t('aptDescriptionLabel') : t('landDescriptionLabel')}</FormLabel><FormControl><Textarea placeholder={t('descriptionPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>)} />

        <FormField control={form.control} name="images" render={({ field: { onChange, ...props } }) => (
            <FormItem>
                <FormLabel>{t('images')}</FormLabel>
                <FormControl><Input type="file" multiple onChange={e => onChange(e.target.files)} {...props} /></FormControl>
                <FormDescription>{t('imagesDescription')}</FormDescription>
                <FormMessage />
            </FormItem>
        )} />

        <Button type="submit" className="w-full md:w-auto justify-self-end mt-4" disabled={isLoading}>
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          {t('addButton')}
        </Button>
      </form>
    </Form>
  );
}
