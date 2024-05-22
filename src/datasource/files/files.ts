import { ServerResponse } from "@/src/models/serverResponse";

export async function uploadFile(file: File, token: string) {
  try {
    const form = new FormData(); // Convert file to buff
    form.append('file', file);

    const resp = await fetch("http://localhost:3001/files", {
      body: form,
    });

    const body = (await resp.json()) as ServerResponse<{ url: string }>;

    if (body.code === "00") {
      return body.info;
    }

    throw new Error(body.message);
  } catch (error) {
    console.log("Error uploading file to server", error);
    throw error;
  }
}
