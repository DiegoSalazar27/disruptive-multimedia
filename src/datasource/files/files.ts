import { ServerResponse } from "@/src/models/serverResponse";

export async function uploadFile(file: File, token: string) {
  try {
    console.log(file.type);
    const formData = new FormData(); // Convert file to buff
    formData.append("file", file);

    const resp = await fetch("http://localhost:3001/files", {
      method: "POST",
      body: formData,
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
