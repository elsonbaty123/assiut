"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth-context";
import { useTranslation } from "@/hooks/use-translation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Ban } from "lucide-react";

export function UserTable() {
  const { users, user: adminUser, deleteUser, toggleUserStatus } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleDelete = async (userId: string) => {
    const success = await deleteUser(userId);
    if(success) {
      toast({ title: t('userDeletedSuccess') });
    } else {
      toast({ variant: 'destructive', title: t('actionFailed') });
    }
  }

  const handleToggleStatus = async (userId: string) => {
    const success = await toggleUserStatus(userId);
    if (success) {
      toast({ title: t('userStatusUpdated') });
    } else {
      toast({ variant: 'destructive', title: t('actionFailed') });
    }
  }
  
  const roleTranslations = {
    client: t('client'),
    broker: t('broker'),
    owner: t('owner'),
    admin: t('admin'),
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('fullName')}</TableHead>
          <TableHead>{t('email')}</TableHead>
          <TableHead>{t('phoneNumber')}</TableHead>
          <TableHead>{t('role')}</TableHead>
          <TableHead>{t('status')}</TableHead>
          <TableHead className="text-right">{t('actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.filter(u => u.role !== 'admin').map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.fullName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phoneNumber}</TableCell>
            <TableCell>{roleTranslations[user.role]}</TableCell>
            <TableCell>
              <Badge variant={user.status === 'active' ? 'secondary' : 'destructive'}>
                {user.status === 'active' ? t('active') : t('banned')}
              </Badge>
            </TableCell>
            <TableCell className="text-right space-x-2 rtl:space-x-reverse">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon" disabled={user.id === adminUser?.id}>
                    <Ban className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('confirmAction')}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {user.status === 'active' ? t('confirmBanUser') : t('confirmUnbanUser')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleToggleStatus(user.id)}>{t('confirm')}</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                   <Button variant="destructive" size="icon" disabled={user.id === adminUser?.id}>
                     <Trash2 className="h-4 w-4" />
                   </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('confirmAction')}</AlertDialogTitle>
                    <AlertDialogDescription>{t('confirmDeleteUser')}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => handleDelete(user.id)}>{t('delete')}</AlertDialogAction>
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
