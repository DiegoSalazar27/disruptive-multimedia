import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import useJsonToForm, {
  FormField as FormFieldJson,
} from "./hooks/useJsonToForm";
import { z } from "zod";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

interface GenericFormParams<T> {
  initialValues: T;
  handleSubmit: (data: T) => any;
  jsonFormFields: FormFieldJson<T>[];
  schema: z.Schema;
  buttonText: string;
  submitingButtonText: string;
}
export function GenericForm<T extends FieldValues>({
  initialValues,
  handleSubmit,
  jsonFormFields,
  schema,
  buttonText,
  submitingButtonText,
}: GenericFormParams<T>) {
  const methods = useForm<T>({
    defaultValues: initialValues as DefaultValues<T>,
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
  const { formFields } = useJsonToForm<T>({
    params: { json: jsonFormFields, control: methods.control },
  });

  return (
    <FormProvider {...methods}>
      <form className="grid gap-4" onSubmit={methods.handleSubmit(handleSubmit)}>
        {formFields}
        <Button
          type="submit"
          disabled={
            !methods.formState.isDirty ||
            (methods.formState.isDirty && !methods.formState.isValid) ||
            methods.formState.isSubmitting
          }
        >
          {methods.formState.isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {methods.formState.isSubmitting ? submitingButtonText : buttonText}
        </Button>
      </form>
    </FormProvider>
  );
}
