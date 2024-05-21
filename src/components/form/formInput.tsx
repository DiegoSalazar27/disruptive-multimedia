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

export function FormInput<T>(props: FormField<T>) {
  const [parent] = useAutoAnimate();
  const { field } = useController<FormField<T>>({
    name: props.id.toString() as Path<FormField<T>>,
  });
  
  return (
    <FormItem ref={parent}>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <FormControl>
        {props.component || (
          <Input placeholder={props.placeholder} type={props.type} {...field} />
        )}
      </FormControl>
      {props.description && (
        <FormDescription>{props.description}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
}
