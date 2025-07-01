"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from "@/hooks/use-translation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AccountSettingsForm() {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formSchema = z.object({
    fullName: z.string().min(2, {
      message: t('validationFullNameMin'),
    }),
    email: z.string().email({
      message: t('validationEmail'),
    }),
    phoneNumber: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
      setAvatarPreview(null);
    }
  }, [user, form]);
  
  const getDefaultAvatar = (role: 'client' | 'broker' | 'owner' | 'admin'): string => {
    switch (role) {
        case 'admin': return 'https://placehold.co/128x128/2F4F4F/FFFFFF.png?text=Admin';
        case 'owner': return 'https://placehold.co/128x128/D4AF37/000000.png?text=Owner';
        case 'broker': return 'https://placehold.co/128x128/C0C0C0/000000.png?text=Broker';
        case 'client': return 'https://placehold.co/128x128/A9A9A9/FFFFFF.png?text=Client';
        default: return 'https://placehold.co/128x128.png';
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRestoreDefault = () => {
    if (!user) return;
    const defaultAvatar = getDefaultAvatar(user.role);
    setAvatarPreview(defaultAvatar);
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const success = await updateUser({
      fullName: values.fullName,
      avatar: avatarPreview || user.avatar,
    });

    setIsLoading(false);
    if(success) {
      toast({
        title: t('profileUpdateSuccess'),
      });
      setAvatarPreview(null);
    }
  }

  if (!user) {
      return (
          <div className="text-center text-muted-foreground">
              {t('pleaseLogin')}
          </div>
      )
  }

  const currentAvatar = avatarPreview || user.avatar;

  const roleTranslations = {
    client: t('client'),
    broker: t('broker'),
    owner: t('owner'),
  };
  const displayRole = roleTranslations[user.role];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32 border-4 border-primary/20 shadow-lg">
                <AvatarImage src={currentAvatar} alt={user.fullName} />
                <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleAvatarChange} 
                    className="hidden" 
                    accept="image/*"
                />
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                    {t('uploadPicture')}
                </Button>
                <Button type="button" variant="ghost" onClick={handleRestoreDefault}>
                    {t('restoreDefault')}
                </Button>
            </div>
        </div>

        <div className="space-y-6">
            <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('fullName')}</FormLabel>
                <FormControl>
                    <Input placeholder={t('fullNamePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                    <Input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    {...field}
                    disabled
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('phoneNumber')}</FormLabel>
                <FormControl>
                    <Input
                    type="tel"
                    placeholder={t('phoneNumberPlaceholder')}
                    {...field}
                    disabled
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
            <div className="space-y-2">
                <Label>{t('userRole')}</Label>
                <p className="text-sm font-medium p-3 bg-muted rounded-md text-muted-foreground">
                {displayRole}
                </p>
            </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {t('saveChanges')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
