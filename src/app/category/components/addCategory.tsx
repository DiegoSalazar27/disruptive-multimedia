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
import { createCategoryOfTopic } from "@/src/datasource/category/category";
import {
  FormDialog,
  useFormDialog,
} from "@/src/components/formDialog/formDialog";
import { useToast } from "@/src/components/ui/use-toast";
import { useAuthToken } from "@/src/hooks/useAuthToken";
import { uploadFile } from "@/src/datasource/files/files";

export function AddCategoryModal({ topicId }: { topicId: string }) {
  return (
    <FormDialog title="Add Category">
      <AddCategory topicId={topicId} />
    </FormDialog>
  );
}

export function AddCategory({ topicId }: { topicId: string }) {
  return (
    <div className="w-full">
      <AddCategoryForm topicId={topicId} />
    </div>
  );
}

function AddCategoryForm({ topicId }: { topicId: string }) {
  const token = useAuthToken();
  const { toast } = useToast();
  const { onClose } = useFormDialog();
  const client = useQueryClient();
  const { mutateAsync } = useMutation<Category, Error, CategoryFormValues>({
    mutationFn: async (values: CategoryFormValues) => {
      // const { url } = await uploadFile(values.coverFile, token);
      // console.log(url);
      return createCategoryOfTopic(
        { ...values, topicId, coverUrl: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" },
        token
      );
    },
    onSuccess: (data) => {
      toast({
        title: "Category created",
        description: `Category ${data.name} was created successfully!`,
      });
      client.invalidateQueries({ queryKey: ["categoriesOfTopic"] });
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
