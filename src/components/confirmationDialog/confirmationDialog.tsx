import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export type ConfirmationDialogParams = {
  headline: string;
  cancelButtonText: string;
  submitButtonText: string;
  body: string;
  isOpen: boolean;
  actionHandler: () => void;
  onClose: () => void;
};

export function ConfirmationDialog({
  actionHandler,
  headline = "Are you sure?",
  cancelButtonText = "No",
  submitButtonText = "Yes",
  body,
  isOpen,
  onClose,
}: ConfirmationDialogParams) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{headline}</AlertDialogTitle>
          <AlertDialogDescription>{body}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>
            {cancelButtonText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={actionHandler}>
            {submitButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
