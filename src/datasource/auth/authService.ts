import { LoginFormValues } from "@/src/app/login/models/login";
import { SignUpFormValues } from "@/src/app/signup/models/signUp";
import { User } from "@/src/models/user";

export async function login(credentials: LoginFormValues) {
  console.log(credentials);

  return "token";
}

export async function signUp(credentials: SignUpFormValues) {
  console.log(credentials);

  return "token";
}

export async function getCurrentUser(token: String): Promise<User> {
  console.log(token);

  return {
    email: "example@example.com",
    id: "1",
    username: "John",
    role: "admin",
  };
}
