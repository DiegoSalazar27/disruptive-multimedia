"use client";
import { GenericForm } from "@/src/components/form/genericForm";
import {
  TopicFormValues,
  topicJsonFormFields,
  topicInitialValues,
  topicValidationSchema,
  Topic,
} from "../models/topic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTopic } from "@/src/datasource/topic/topic";
import {
  FormDialog,
  useFormDialog,
} from "@/src/components/formDialog/formDialog";
import { useToast } from "@/src/components/ui/use-toast";
import { useAuthToken } from "@/src/hooks/useAuthToken";

export function AddTopicModal() {
  return (
    <FormDialog title="Add Topic">
      <AddTopic />
    </FormDialog>
  );
}

export function AddTopic() {
  return (
    <div className="w-full">
      <AddTopicForm />
    </div>
  );
}

function AddTopicForm() {
  const token = useAuthToken();
  const { toast } = useToast();
  const { onClose } = useFormDialog();
  const client = useQueryClient();
  const { mutateAsync } = useMutation<Topic, Error, TopicFormValues>({
    mutationFn: async (values: TopicFormValues) => {
      return createTopic(values, token);
    },
    onSuccess: (data) => {
      toast({
        title: "Topic created",
        description: `Topic ${data.name} was created successfully!`,
      });
      client.invalidateQueries({ queryKey: ["topics"] });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error creating Topic",
        description: error.message,
      });
    },
  });

  return (
    <GenericForm
      buttonText="Add Topic"
      initialValues={topicInitialValues}
      jsonFormFields={topicJsonFormFields}
      schema={topicValidationSchema}
      submitingButtonText="Adding Topic..."
      handleSubmit={async (data) => await mutateAsync(data)}
    />
  );
}
