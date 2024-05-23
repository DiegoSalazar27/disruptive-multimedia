import { Path, useController } from "react-hook-form";
import { FormField } from "./hooks/useJsonToForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import DropZone from "./dropzone";
import { Select } from "../ui/select";
import { useCallback } from "react";
import { Switch } from "../ui/switch";
import { FileInput } from "./fileInput";

export function FormInput<T>(props: FormField<T>) {
  const [parent] = useAutoAnimate();
  const { field } = useController<FormField<T>>({
    name: props.id.toString() as Path<FormField<T>>,
  });

  const inputComponent = useCallback(
    (props: FormField<T>) => {
      if (props.type === "select") {
        const { options } = props;
        return (
          <Select {...field} value={field.value as string}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label || option.value}
              </option>
            ))}
          </Select>
        );
      }

      if (props.type === "boolean") {
        return <Switch {...field} />;
      }

      if (props.type === "dropzone") {
        return <DropZone {...field} />;
      }

      if (props.type === "textarea") {
        return <textarea {...field} value={field.value as string} />;
      }

      if (props.type === "file") {
        return (
          <FileInput
            name={field.name}
            // {...field}
            // value={field.value as FileList}
            // onChange={(e) => field.onChange(e.target.files)}
          />
        );
      }

      if (props.type === "number") {
        return (
          <Input
            type={props.type}
            {...field}
            onChange={(e) => {
              field.onChange(Number(e.target.value));
            }}
            value={field.value as number}
          />
        );
      }

      return (
        <Input placeholder={props.placeholder} type={props.type} {...field} />
      );
    },
    [field]
  );

  return (
    <FormItem className="flex flex-col" ref={parent}>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <FormControl>{props.component || inputComponent(props)}</FormControl>
      {props.description && (
        <FormDescription>{props.description}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
}

function InputField({ props, field }: any) {
  if (props.type === "number") {
  }

  return;
}
