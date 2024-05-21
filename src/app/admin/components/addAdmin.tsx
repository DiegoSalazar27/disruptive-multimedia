import { GenericForm } from "@/src/components/form/genericForm";
import {
  AdminFormValues,
  adminInitialValues,
  adminJsonFormFields,
  adminValidationSchema,
} from "../models/admin";
import { useMutation } from "@tanstack/react-query";
import { createAdmin } from "@/src/datasource/admin/admin";
import { User } from "@/src/models/user";

export function AddAdmin() {
  return (
    <div>
      <h1>Add Admin</h1>
      <AddAdminForm />
    </div>
  );
}

function AddAdminForm() {
  const { mutate, data } = useMutation<User, Error, AdminFormValues>({
    mutationFn: async (values: AdminFormValues) => {
      return createAdmin(values);
    },
  });

  return (
    <GenericForm
      buttonText="Add Admin"
      initialValues={adminInitialValues}
      jsonFormFields={adminJsonFormFields}
      schema={adminValidationSchema}
      submitingButtonText="Adding Admin..."
      handleSubmit={(data) => mutate(data)}
    />
  );
}
