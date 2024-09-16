import Client from "./client";

export async function loginRequest(username: string, password: string) {
  const client = new Client({});
  const response = await client.postRaw({
    url: "/api/v1/authenticate",
    data: {
      username,
      password,
      type: "login",
    },
  });

  if (response.status === 200) {
    const data = response.data;
    return data;
  } else {
    return null;
  }
}

export async function registerRequest(username: string, password: string) {
  const client = new Client({});
  const response = await client.postRaw({
    url: "/api/v1/authenticate",
    data: {
      username,
      password,
      type: "register",
    },
  });

  if (response.status === 200) {
    const data = response.data;
    return data;
  } else {
    return null;
  }
}
