import {
  Category,
  CategoryFormValues,
} from "@/src/app/category/models/category";
import { serverUrl } from "@/src/models/const";
import { ServerResponse } from "@/src/models/serverResponse";

export async function getCategoriesOfTopic({
  topicId,
  token,
}: {
  topicId: string;
  token: string;
}) {
  try {
    const resp = await fetch(`${serverUrl}/topic/${topicId}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const body = (await resp.json()) as ServerResponse<Category[]>;

    if (body.code === "00") {
      return body.info;
    }

    throw new Error(body.message);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createCategoryOfTopic(
  values: Omit<CategoryFormValues, "coverFile"> & {
    topicId: string;
    coverUrl: string;
  },
  token: string
) {
  try {
    const resp = await fetch(`${serverUrl}/topic/${values.topicId}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export async function getCategory(id: string, token: string) {
  try {
    const resp = await fetch(`${serverUrl}/category/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
