"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const chats = [
    { id: 1, agentName: "شركة النيل للتعمير", propertyTitle: "شقة فاخرة للبيع في الزمالك", lastMessage: "بالتأكيد، يمكننا تحديد موعد غداً.", timestamp: "10:30 ص", avatar: "https://placehold.co/100x100.png" },
    { id: 2, agentName: "أحمد المصري", propertyTitle: "مكتب إداري للإيجار في المهندسين", lastMessage: "تم إرسال كافة التفاصيل عبر البريد الإلكتروني.", timestamp: "أمس", avatar: "https://placehold.co/100x100.png" },
];


export default function MyChatsPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{t('myChats')}</CardTitle>
          <CardDescription>{t('myChatsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
           {chats.length > 0 ? (
                <div className="space-y-4">
                    {chats.map((chat) => (
                        <div key={chat.id} className="flex items-start p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                            <Avatar className="h-12 w-12 mr-4 rtl:mr-0 rtl:ml-4">
                                <AvatarImage src={chat.avatar} alt={chat.agentName} />
                                <AvatarFallback>{chat.agentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{chat.agentName}</p>
                                    <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                                </div>
                                <p className="text-sm font-medium text-muted-foreground truncate">{t('relatedTo')}: {chat.propertyTitle}</p>
                                <p className="text-sm text-muted-foreground mt-1 truncate">{chat.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
           ) : (
            <div className="text-center py-10">
                <p className="text-muted-foreground">{t('noChatsFound')}</p>
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
