"use client";
import { GenericForm } from "@/src/components/form/genericForm";
import {
  ContentFormValues,
  contentInitialValues,
  contentValidationSchema,
  Content,
  contentJsonFormFields,
} from "../models/content";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategoryOfTopic } from "@/src/datasource/category/category";
import {
  FormDialog,
  useFormDialog,
} from "@/src/components/formDialog/formDialog";
import { useToast } from "@/src/components/ui/use-toast";
import { useAuthToken } from "@/src/hooks/useAuthToken";
import { uploadFile } from "@/src/datasource/files/files";
import { createContentOfCategory } from "@/src/datasource/content/content";

export function AddContentModal({ categoryId }: { categoryId: string }) {
  return (
    <FormDialog title="Add Content">
      <AddContent categoryId={categoryId} />
    </FormDialog>
  );
}

export function AddContent({ categoryId }: { categoryId: string }) {
  return (
    <div className="w-full">
      <AddContentForm categoryId={categoryId} />
    </div>
  );
}

function AddContentForm({ categoryId }: { categoryId: string }) {
  const token = useAuthToken();
  const { toast } = useToast();
  const { onClose } = useFormDialog();
  const client = useQueryClient();
  const { mutateAsync } = useMutation<Content, Error, ContentFormValues>({
    mutationFn: async (values: ContentFormValues) => {
      const { url } = await uploadFile(values.file[0], token);
      return createContentOfCategory(
        {
          ...values,
          categoryId,
          fileUrl: url,
        },
        token
      );
    },
    onSuccess: (data) => {
      toast({
        title: "Content created",
        description: `Content ${data.name} was created successfully!`,
      });
      client.invalidateQueries({ queryKey: ["contentOfCategory"] });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error creating content",
        description: error.message,
      });
    },
  });

  return (
    <GenericForm
      buttonText="Add Content"
      initialValues={contentInitialValues}
      jsonFormFields={contentJsonFormFields}
      schema={contentValidationSchema}
      submitingButtonText="Adding Content..."
      handleSubmit={async (data) => await mutateAsync(data)}
    />
  );
}
