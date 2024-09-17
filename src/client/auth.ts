import Client from "./client";

export async function loginRequest(
  username: string,
  password: string
): Promise<any | null> {
  const client = new Client({});

  try {
    const response = await client.postRaw({
      url: "/api/v1/authenticate",
      data: {
        username,
        password,
        type: "login",
      },
    });

    return response.data;
  } catch (error) {
    return null;
  }
}

export async function registerRequest(username: string, password: string) {
  const client = new Client({});

  try {
    const response = await client.postRaw({
      url: "/api/v1/authenticate",
      data: {
        username,
        password,
        type: "register",
      },
    });

    return response.data;
  } catch (error) {
    return null;
  }
}
