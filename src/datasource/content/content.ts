import { Content, ContentFormValues } from "@/src/app/content/models/content";
import { serverUrl } from "@/src/models/const";
import { ServerResponse } from "@/src/models/serverResponse";

export async function getContentOfCategory({
  categoryId,
  token,
}: {
  categoryId: string;
  token: string;
}) {
  try {
    const resp = await fetch(`${serverUrl}/category/${categoryId}/content`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const body = (await resp.json()) as ServerResponse<Content[]>;

    if (body.code === "00") {
      return body.info;
    }

    throw new Error(body.message);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createContentOfCategory(
  values: Omit<ContentFormValues, "file"> & {
    categoryId: string;
    fileUrl: string;
  },
  token: string
) {
  try {
    const resp = await fetch(
      `${serverUrl}/category/${values.categoryId}/content`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: values.name, fileURL: values.fileUrl }),
      }
    );
    const body = (await resp.json()) as ServerResponse<Content>;

    if (body.code === "00") {
      return body.info;
    }

    throw new Error(body.message);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
