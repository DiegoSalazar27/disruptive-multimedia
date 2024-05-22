import { FormField } from "@/src/components/form/hooks/useJsonToForm";
import { z } from "zod";

export const topicValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Invalid type",
      required_error: "Name is required",
    })
});

export type TopicFormValues = z.infer<typeof topicValidationSchema>;

export const topicInitialValues: TopicFormValues = {
  name: "",
};

export const topicJsonFormFields: FormField<TopicFormValues>[] = [
  {
    id: "name",
    label: "Nombre de la tematica",
    type: "text",
    placeholder: "Matematicas",
  },
];

export type Topic = {
  name: string;
  id: string;
}

