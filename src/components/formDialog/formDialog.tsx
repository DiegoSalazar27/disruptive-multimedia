import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import React, { useCallback } from "react";
import { useState } from "react";

export interface FormDialogContextParams {
  onOpen: () => void;
  onClose: () => void;
}

export const FormDialogContext = React.createContext<FormDialogContextParams>({
  onOpen: () => null,
  onClose: () => null,
});

interface FormDialogParams {
  children: JSX.Element;
  title: string;
  Icon?: JSX.Element;
}

export function FormDialog({ title, Icon, children }: FormDialogParams) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <FormDialogContext.Provider
      value={{ onOpen: handleOpenModal, onClose: handleCloseModal }}
    >
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {Icon ? (
            <Button variant="outline" size="icon">
              {Icon}
            </Button>
          ) : (
            <Button>{title}</Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">{children}</div>
        </DialogContent>
      </Dialog>
    </FormDialogContext.Provider>
  );
}

export function useFormDialog() {
  return React.useContext(FormDialogContext);
}

