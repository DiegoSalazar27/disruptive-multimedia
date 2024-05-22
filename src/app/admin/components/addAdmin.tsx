"use client";
import { GenericForm } from "@/src/components/form/genericForm";
import {
  AdminFormValues,
  adminInitialValues,
  adminJsonFormFields,
  adminValidationSchema,
} from "../models/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdmin } from "@/src/datasource/users/admin";
import { User } from "@/src/models/user";
import {
  FormDialog,
  useFormDialog,
} from "@/src/components/formDialog/formDialog";
import { useToast } from "@/src/components/ui/use-toast";

export function AddAdminModal() {
  return (
    <FormDialog title="Add Admin">
      <AddAdmin />
    </FormDialog>
  );
}

export function AddAdmin() {
  return (
    <div className="w-full">
      <AddAdminForm />
    </div>
  );
}

function AddAdminForm() {
  const { toast } = useToast();
  const { onClose } = useFormDialog();
  const client = useQueryClient();
  const { mutateAsync } = useMutation<User, Error, AdminFormValues>({
    mutationFn: async (values: AdminFormValues) => {
      return createAdmin(values);
    },
    onSuccess: (data) => {
      toast({
        title: "Admin created",
        description: `Admin ${data.alias} was created successfully!`,
      });
      client.invalidateQueries({ queryKey: ["admins"] });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error creating admin",
        description: error.message,
      });
    },
  });

  return (
    <GenericForm
      buttonText="Add Admin"
      initialValues={adminInitialValues}
      jsonFormFields={adminJsonFormFields}
      schema={adminValidationSchema}
      submitingButtonText="Adding Admin..."
      handleSubmit={async (data) => await mutateAsync(data)}
    />
  );
}
