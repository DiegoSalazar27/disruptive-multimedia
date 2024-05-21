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

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const { signup: signUpData } = useGetData();
  const { toast } = useToast();
  const { signin } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignUpFormValues) => {
      try {
        await signin(data);
        toast({
          title: signUpData.signedUp,
        });
        router.push("/");
      } catch (error) {
        console.log(error);

        toast({
          title: "Error signing up",
          description: `error: ${error}`,
        });
        throw error;
      }
    },
    [router, toast, signUpData.signedUp, signin]
  );

  return (
    <Card className="md:w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{signUpData.signUp}</CardTitle>
        <CardDescription>{signUpData.signUpMessage}</CardDescription>
      </CardHeader>
      <CardContent>
        <GenericForm
          buttonText={signUpData.signUp}
          handleSubmit={handleSubmit}
          initialValues={signUpInitialValues}
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
