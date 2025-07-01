"use client";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useProperties } from "@/context/property-context";
import { useTranslation } from "@/hooks/use-translation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import type { Property } from "@/types";

export function PropertyTable() {
  const { properties, deleteProperty } = useProperties();
  const { t, language } = useTranslation();
  const { toast } = useToast();

  const handleDelete = async (propertyId: string) => {
    const success = await deleteProperty(propertyId);
     if(success) {
      toast({ title: t('propertyDeletedSuccess') });
    } else {
      toast({ variant: 'destructive', title: t('actionFailed') });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('image')}</TableHead>
          <TableHead>{t('adTitle')}</TableHead>
          <TableHead>{t('type')}</TableHead>
          <TableHead>{t('price')}</TableHead>
          <TableHead className="text-right">{t('actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell>
              <Image src={property.image} alt={language === 'ar' ? property.title : (property.title_en || property.title)} width={64} height={48} className="rounded-md object-cover" data-ai-hint={property.dataAiHint} />
            </TableCell>
            <TableCell className="font-medium">{language === 'ar' ? property.title : (property.title_en || property.title)}</TableCell>
            <TableCell>{t(property.type)}</TableCell>
            <TableCell>{property.price.toLocaleString(language === 'ar' ? "ar-SA" : "en-US")} {t('sar')}</TableCell>
            <TableCell className="text-right">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                   <Button variant="destructive" size="icon">
                     <Trash2 className="h-4 w-4" />
                   </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('confirmAction')}</AlertDialogTitle>
                    <AlertDialogDescription>{t('confirmDeleteProperty')}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => handleDelete(property.id)}>{t('delete')}</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
