import { useState } from "react";
import { useController } from "react-hook-form";
import { Input } from "../ui/input";

export const FileInput = ({ name }: {name: string}) => {
  const { field } = useController({ name });
  const [value, setValue] = useState("");
  return (
    <Input
      type="file"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        field.onChange(e.target.files);
      }}
    />
  );
};