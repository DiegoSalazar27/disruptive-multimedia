import { FormField } from "@/src/components/form/hooks/useJsonToForm";
import { data } from "@/src/lib/data";
import { z } from "zod";

export const adminValidationSchema = z.object({
  username: z.string({
    invalid_type_error: "Invalid type",
    required_error: "username is required",
  }),
  email: z
    .string({
      invalid_type_error: "Invalid type",
      required_error: "Email is required",
    })
    .email("Not a valid email"),
  password: z
    .string({
      invalid_type_error: "Invalid type",
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
});

export type AdminFormValues = z.infer<typeof adminValidationSchema>;

export const adminInitialValues: AdminFormValues = {
  username: "",
  email: "",
  password: "",
};

export const adminJsonFormFields: FormField<AdminFormValues>[] = [
  {
    id: "username",
    label: data.signup.form.userName,
    type: "text",
    placeholder: "John",
  },
  {
    id: "email",
    label: data.signup.form.email,
    type: "email",
    placeholder: "example@example.com",
  },
  {
    id: "password",
    label: data.signup.form.password,
    type: "password",
    placeholder: "********",
  },
];