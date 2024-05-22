"use client";
import { GenericForm } from "@/src/components/form/genericForm";
import {
  CategoryFormValues,
  categoryJsonFormFields,
  categoryInitialValues,
  categoryValidationSchema,
  Category,
} from "../models/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/src/datasource/category/category";
import {
  FormDialog,
  useFormDialog,
} from "@/src/components/formDialog/formDialog";
import { useToast } from "@/src/components/ui/use-toast";
import { useAuthToken } from "@/src/hooks/useAuthToken";

export function AddCategoryModal() {
  return (
    <FormDialog title="Add Category">
      <AddCategory />
    </FormDialog>
  );
}

export function AddCategory() {
  return (
    <div className="w-full">
      <AddCategoryForm />
    </div>
  );
}

function AddCategoryForm() {
  const token = useAuthToken();
  const { toast } = useToast();
  const { onClose } = useFormDialog();
  const client = useQueryClient();
  const { mutateAsync } = useMutation<Category, Error, CategoryFormValues>({
    mutationFn: async (values: CategoryFormValues) => {
      return createCategory(values, token);
    },
    onSuccess: (data) => {
      toast({
        title: "Category created",
        description: `Category ${data.name} was created successfully!`,
      });
      client.invalidateQueries({ queryKey: ["category"] });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error creating category",
        description: error.message,
      });
    },
  });

  return (
    <GenericForm
      buttonText="Add Category"
      initialValues={categoryInitialValues}
      jsonFormFields={categoryJsonFormFields}
      schema={categoryValidationSchema}
      submitingButtonText="Adding Category..."
      handleSubmit={async (data) => await mutateAsync(data)}
    />
  );
}
