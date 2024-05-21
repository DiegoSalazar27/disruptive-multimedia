import { FormField } from "@/src/components/form/hooks/useJsonToForm";
import { data } from "@/src/lib/data";
import { z } from "zod";

export const loginValidationSchema = z.object({
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

export type LoginFormValues = z.infer<typeof loginValidationSchema>;

export const loginInitialValues: LoginFormValues = {
  email: "",
  password: "",
};

export const loginJsonFormFields: FormField<LoginFormValues>[] = [
  {
    id: "email",
    label: data.login.form.email,
    type: "email",
    placeholder: "example@example.com",
  },
  {
    id: "password",
    label: data.login.form.password,
    type: "password",
    placeholder: "********",
  },
];
