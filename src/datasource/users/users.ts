import { serverUrl } from "@/src/models/const";
import { ServerResponse } from "@/src/models/serverResponse";
import { User, roleToStringRole } from "@/src/models/user";

export async function getUsers(token: string): Promise<User[]> {
  try {
    const resp = await fetch(`${serverUrl}/user/`, {
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

    return body.info.map((user) => {
      return { ...user, role: roleToStringRole(user.role) };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
