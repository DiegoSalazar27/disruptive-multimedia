import { LoginFormValues } from "@/src/app/login/models/login";
import { SignUpFormValues } from "@/src/app/signup/models/signUp";
import { serverUrl } from "@/src/models/const";
import { ServerResponse } from "@/src/models/serverResponse";
import {
  StringRoleToUserRole,
  User,
  roleToStringRole,
} from "@/src/models/user";

export async function login(values: LoginFormValues) {
  try {
    const resp = await fetch(`${serverUrl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values }),
    });
    const body = (await resp.json()) as ServerResponse<{ token: string }>;

    if (body.code === "00") {
      return body.info.token;
    }

    throw new Error(body.message);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signUp(credentials: SignUpFormValues) {
  try {
    const resp = await fetch(`${serverUrl}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        role: StringRoleToUserRole(credentials.role),
        pass: credentials.password,
        alias: credentials.username,
      }),
    });
    const body = (await resp.json()) as ServerResponse<User>;
    console.log(body);
    if (body.code === "00") {
      return {...body.info, role: roleToStringRole(body.info.role)};
    }

    throw new Error(body.message);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCurrentUser(token: String): Promise<User> {
  try {
    const resp = await fetch(`${serverUrl}/user/getCurrentUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const body = (await resp.json()) as ServerResponse<User>;

    if (body.code === "00") {
      return { ...body.info, role: roleToStringRole(body.info.role) };
    }

    throw new Error(body.message);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
