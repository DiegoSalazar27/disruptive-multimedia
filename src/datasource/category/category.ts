import {
  Category,
  CategoryFormValues,
} from "@/src/app/category/models/category";
import { serverUrl } from "@/src/models/const";
import { ServerResponse } from "@/src/models/serverResponse";

export async function createCategory(
  values: CategoryFormValues,
  token: string
) {
  try {
    const resp = await fetch(`${serverUrl}/topic/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Autorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...values }),
    });
    const body = (await resp.json()) as ServerResponse<Category>;

    if (body.code === "00") {
      return body.info;
    }

    throw new Error(body.message);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
