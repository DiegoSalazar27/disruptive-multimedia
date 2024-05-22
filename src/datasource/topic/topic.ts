import { Topic, TopicFormValues } from "@/src/app/topic/models/topic";
import { serverUrl } from "@/src/models/const";
import { ServerResponse } from "@/src/models/serverResponse";

export async function getTopics() {
  try {
    const resp = await fetch(`${serverUrl}/topic`, {
      method: "GET",
    });
    const body = (await resp.json()) as ServerResponse<Topic[]>;

    if (body.code === "00") {
      return body.info;
    }

    throw new Error(body.message);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopic(id: string) {
  try {
    const resp = await fetch(`${serverUrl}/topic/${id}`, {
      method: "GET",
    });
    const body = (await resp.json()) as ServerResponse<Topic>;

    if (body.code === "00") {
      return body.info;
    }

    throw new Error(body.message);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createTopic(values: TopicFormValues, token: string) {
  try {
    const resp = await fetch(`${serverUrl}/topic/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Autorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...values }),
    });
    const body = (await resp.json()) as ServerResponse<Topic>;

    if (body.code === "00") {
      return body.info;
    }

    throw new Error(body.message);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
