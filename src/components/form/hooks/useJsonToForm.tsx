import React from "react";
import { useMemo } from "react";
import { FormInput } from "../formInput";
import { FormField } from "../../ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

export interface JsonToFormParams<T extends FieldValues> {
  json: FormField<T>[];
  control: Control<T, any>;
}

export type FormField<T> = {
  id: keyof T;
  label?: string;
  description?: string;
  placeholder?: string;
  component?: JSX.Element;
} & (SelectProps | InputProps);

type InputType =
  | "text"
  | "password"
  | "email"
  | "checkbox"
  | "radio"
  | "date"
  | "number"
  | "boolean"
  | "dateRange"
  | "timerange"
  | "time"
  | "string"
  | "phone"
  | "textarea"
  | "file";

type InputProps = { type: InputType };

type SelectProps = {
  type: "select" | "multipleSelect" | "radioGroup";
  options: SelectValues[];
};

export interface SelectValues {
  label: string;
  value: any;
}

function useJsonToForm<T extends FieldValues>({ params }: { params: JsonToFormParams<T> }) {
  const formFields = useMemo(
    () =>
      params.json.map((field) => (
        <FormField
          control={params.control}
          name={field.id as Path<T>}
          key={field.id as string}
          render={() => <FormInput key={field.id as string} {...field} />}
        />
      )),
    [params.json, params.control]
  );

  return { formFields };
}

export default useJsonToForm;
