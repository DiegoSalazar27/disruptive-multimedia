"use client";
import { Button } from "@/src/components/ui/button";
import { useConfirmationDialog } from "@/src/providers/confirmationDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleX } from "lucide-react";
import { AdminFormValues } from "../models/admin";
import { User } from "@/src/models/user";
import { useToast } from "@/src/components/ui/use-toast";
import { deleteAdmin } from "@/src/datasource/users/admin";
import { useAuthToken } from "@/src/hooks/useAuthToken";

export function DeleteAdmin({ id }: { id: string }) {
  const token = useAuthToken();
  const confirmationDialog = useConfirmationDialog();
  const { toast } = useToast();
  const client = useQueryClient();
  const { mutate, isPending } = useMutation<User | undefined, Error, void>({
    mutationFn: async () => {
      const resp = await confirmationDialog.openConfirmationDialog({
        headline: "Delete Admin",
        message: "Are you sure you want to delete this admin?",
      });

      if (resp) {
        const user = await deleteAdmin(id, token);
        return user;
      }

      throw Error('dismissed')
    },
    onSuccess: (data) => {
      toast({
        title: "Admin deleted",
        description: `Admin ${data?.alias} was created successfully!`,
      });
      client.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error) => {
      if (error.message === 'dismissed') {
        return        
      }
      toast({
        title: "Error creating admin",
        description: error.message,
      });
    },
  });

  return (
    <Button onClick={() => mutate()} variant={"ghost"}>
      <CircleX size={30} color="hsl(0 62.8% 30.6%)" />
    </Button>
  );
}
