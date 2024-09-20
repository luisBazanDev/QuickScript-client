import { Session } from "../types";
import Client from "./client";

export async function getSession(): Promise<Session[] | null> {
  const client = new Client({});

  try {
    const response = await client.getAuth({
      url: "/api/v1/session/get",
    });

    return response.data;
  } catch (error) {
    return null;
  }
}

export async function saveSession(
  sessionData: Omit<Session, "id" | "user_id">
): Promise<boolean> {
  const client = new Client({});

  try {
    await client.postAuth({
      url: "/api/v1/session/save",
      data: sessionData,
    });

    return true;
  } catch (error) {
    console.error("Error al guardar la sesión:", error);

    return false;
  }
}
