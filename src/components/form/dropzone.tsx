import React from "react";
import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useController } from "react-hook-form";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";

export interface DropZoneParams {
  name: string;
}

function DropZone({ name: id }: DropZoneParams) {
  const {
    field: { onChange, value },
  } = useController({ name: id });
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );
  const files: File[] = useMemo(() => {
    const values = value as { [key: string]: File[] };

    return values[id] as File[];
  }, [id, value]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="bg-transparent flex flex-col justify-center items-center gap-2 w-full border-gray-400 border-2 rounded-lg p-4 px-6 align-text-center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <>
          <p>Suelta los archivos aquí</p>
          <p className="pb-4">Máximo 2MB</p>
        </>
      ) : (
        <>
          <p>Clickea o Arrastra archivos</p>

          {files && files.length > 0 && (
            <div className="flex flex-col">
              <p>Archivos Añadidos</p>
              {files.map((file, index) => (
                <p key={index}>{file.name}</p>
              ))}
            </div>
          )}
          <Button variant={"outline"}>
            <Upload />
            Upload
          </Button>
        </>
      )}
    </div>
  );
}

export default DropZone;
