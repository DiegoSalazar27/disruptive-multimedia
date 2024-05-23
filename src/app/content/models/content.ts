import { FormField } from "@/src/components/form/hooks/useJsonToForm";
import { User } from "@/src/models/user";
import { z } from "zod";

export const contentValidationSchema = z.object({
  name: z.string(),
  file: z.any(),
});

export type ContentFormValues = z.infer<typeof contentValidationSchema>;

export const contentInitialValues: ContentFormValues = {
  name: "",
  file: "",
};

export const contentJsonFormFields: FormField<ContentFormValues>[] = [
  {
    id: "name",
    label: "Nombre de la categoria",
    type: "text",
    placeholder: "Matematicas",
  },
  {
    id: "file",
    label: "Archivo",
    type: "file",
  },
];

export type Content = {
  id: string;
  name: string;
  fileURL: string;
  creditsID: string;
  creditsAlias: string;
};
