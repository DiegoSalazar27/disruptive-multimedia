import { FormField } from "@/src/components/form/hooks/useJsonToForm";
import { z } from "zod";

export const categoryValidationSchema = z.object({
  name: z.string(),
  coverUrl: z.string().url(),
  allowImage: z.boolean().optional(),
  allowVideo: z.boolean().optional(),
  allowText: z.boolean().optional(),
});

export type CategoryFormValues = z.infer<typeof categoryValidationSchema>;

export const categoryInitialValues: CategoryFormValues = {
  name: "",
  coverUrl: "",
  allowImage: false,
  allowVideo: false,
  allowText: false,
};

export const categoryJsonFormFields: FormField<CategoryFormValues>[] = [
  {
    id: "name",
    label: "Nombre de la categoria",
    type: "text",
    placeholder: "Matematicas",
  },
  {
    id: "coverUrl",
    label: "Imagen de la categoria",
    type: "dropzone",
  },
  {
    id: "allowImage",
    label: "Allow Images",
    type: "boolean",
  },
  {
    id: "allowText",
    label: "Allow Text",
    type: "boolean",
  },
  {
    id: "allowVideo",
    label: "Allow Video",
    type: "boolean",
  },
];

export type Category = {
  name: string;
  coverUrl: string;
  allowImage: boolean;
  allowText: boolean;
  allowVideo: boolean;
  id: string;
};
