import React, { useCallback, useState } from "react";
import type { ReactNode } from "react";

import { ConfirmationDialog } from "../components/confirmationDialog/confirmationDialog";

interface AnyEvent {
  preventDefault(): void;
}

export interface openConfirmationDialogParams {
  headline?: string;
  message?: string;
  cancelMessage?: string;
  acceptMessage?: string;
}

export interface ConfirmationDialogContextType {
  openConfirmationDialog: (
    params: openConfirmationDialogParams
  ) => Promise<boolean>;
}

export const ConfirmationDialogContext =
  React.createContext<ConfirmationDialogContextType>({
    openConfirmationDialog: async () => false,
  });

export function ConfirmationDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modal, setModal] = useState<ReactNode | null>(null);

  const openConfirmationDialog = useCallback(
    ({
      message = "Do you want to perform the action",
      headline = "Are you sure?",
      cancelMessage = "Cancel",
      acceptMessage = "Confirm",
    }: openConfirmationDialogParams): Promise<boolean> =>
      new Promise((resolve) => {
        const handleClose = (e?: AnyEvent) => {
          e?.preventDefault();
          setModal(null);
          resolve(false);
        };

        const handleOK = (e?: AnyEvent) => {
          e?.preventDefault();
          setModal(null);
          resolve(true);
        };

        setModal(
          <ConfirmationDialog
            onClose={handleClose}
            isOpen={true}
            headline={headline}
            body={message}
            cancelButtonText={cancelMessage}
            submitButtonText={acceptMessage}
            actionHandler={handleOK}
          />
        );
      }),
    []
  );

  const value = {
    openConfirmationDialog,
  };

  return (
    <ConfirmationDialogContext.Provider value={value}>
      {children}
      {modal}
    </ConfirmationDialogContext.Provider>
  );
}

export function useConfirmationDialog() {
  return React.useContext(ConfirmationDialogContext);
}

