import { FormField } from "@/src/components/form/hooks/useJsonToForm";
import { data } from "@/src/lib/data";
import { z } from "zod";

export const signUpValidationSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters long"),
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

export type SignUpFormValues = z.infer<typeof signUpValidationSchema>;

export const signUpInitialValues: SignUpFormValues = {
  username: "",
  email: "",
  password: "",
};

export const signUpJsonFormFields: FormField<SignUpFormValues>[] = [
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
