"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { GenericForm } from "@/src/components/form/genericForm";
import { useRouter } from "next/navigation";
import { useGetData } from "@/src/hooks/useGetTextData";
import { useToast } from "@/src/components/ui/use-toast";
import { useCallback } from "react";
import {
  SignUpFormValues,
  signUpInitialValues,
  signUpJsonFormFields,
  signUpValidationSchema,
} from "./models/signUp";
import { useAuth } from "@/src/providers/authProvider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { useMutation } from "@tanstack/react-query";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Tabs defaultValue="reader" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reader">Lector</TabsTrigger>
          <TabsTrigger value="creator">Creador</TabsTrigger>
        </TabsList>
        <TabsContent value="reader">
          <SignUpForm role="reader" title="Aprende sobre el mundo" />
        </TabsContent>
        <TabsContent value="creator">
          <SignUpForm
            role="creator"
            title="Comparte tu conocimiento con el mundo"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SignUpForm({ title, role }: { title?: string; role: string }) {
  const router = useRouter();
  const { signup: signUpData } = useGetData();
  const { toast } = useToast();
  const { signup } = useAuth();
  const { mutateAsync } = useMutation<void, Error, SignUpFormValues>({
    mutationFn: async (data) => {
      await signup(data);
    },
    onSuccess: () => {
      toast({
        title: signUpData.signedUp,
      });
      router.push("/");
    },
    onError: (error) => {
      toast({
        title: "Error signing up",
        description: `error: ${error}`,
      });
    },
  });

  return (
    <Card className="md:w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{signUpData.signUp}</CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <GenericForm
          buttonText={signUpData.signUp}
          handleSubmit={mutateAsync}
          initialValues={{ ...signUpInitialValues, role }}
          jsonFormFields={signUpJsonFormFields}
          schema={signUpValidationSchema}
          submitingButtonText={signUpData.signingUp}
        />
        <div className="mt-4 text-center text-sm">
          {signUpData.signInMessage}{" "}
          <Link href="/login" className="underline">
            {signUpData.signIn}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
