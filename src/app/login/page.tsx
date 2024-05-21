/* eslint-disable react/no-unescaped-entities */
"use client";
import { useRouter } from "next/navigation";
import {
  loginInitialValues,
  loginJsonFormFields,
  loginValidationSchema,
} from "./models/login";
import type { LoginFormValues } from "./models/login";
import { useCallback } from "react";
import { useToast } from "@/src/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Link from "next/link";
import { GenericForm } from "@/src/components/form/genericForm";
import { useGetData } from "@/src/hooks/useGetTextData";
import { useAuth } from "@/src/providers/authProvider";

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}

export function LoginForm() {
  const router = useRouter();
  const { login: loginData } = useGetData();
  const { signin } = useAuth();

  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (data: LoginFormValues) => {
      try {
        await signin(data);
        toast({
          title: loginData.loggedIn,
        });
        router.push("/");
      } catch (error) {
        console.log(error);

        toast({
          title: "Error signing in",
          description: `error: ${error}`,
        });
        throw error;
      }
    },
    [router, signin, toast, loginData.loggedIn]
  );

  return (
    <Card className="md:w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{loginData.login}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <GenericForm
          buttonText={loginData.login}
          handleSubmit={handleSubmit}
          initialValues={loginInitialValues}
          jsonFormFields={loginJsonFormFields}
          schema={loginValidationSchema}
          submitingButtonText={loginData.loggingIn}
        />
        <div className="text-center text-sm">
          {loginData.signUpMessage}{" "}
          <Link href="/signup" className="underline">
            {loginData.signUp}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
