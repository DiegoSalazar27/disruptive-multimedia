import { AdminFormValues } from "@/src/app/admin/models/admin";
import { AUTH_TOKEN, serverUrl } from "@/src/models/const";
import { ServerResponse } from "@/src/models/serverResponse";
import { User } from "@/src/models/user";

export async function createAdmin(values: AdminFormValues): Promise<User> {
  try {
    const resp = await fetch(`${serverUrl}/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, pass: values.password, role: "CRUD" }),
    });
    const body = (await resp.json()) as ServerResponse<User>;

    if (body.code === "00") {
      return body.info;
    }

    throw new Error(body.message);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAdmins(token: string): Promise<User[]> {
  try {
    const resp = await fetch(`${serverUrl}/user/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const body = (await resp.json()) as ServerResponse<User[]>;
    if (body.code !== "00") {
      throw new Error(body.message);
    }

    return body.info;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteAdmin(id: string, token: string) {
  try {
    const resp = await fetch(`${serverUrl}/user/admin/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const body = (await resp.json()) as ServerResponse<User>;
    if (body.code !== "00") {
      throw new Error(body.message);
    }

    return body.info;
  } catch (error) {
    console.log(error);
    throw error;
  } 
}
