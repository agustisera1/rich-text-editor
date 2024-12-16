import { serverURL } from "../../../constants";

type CreateUserCredentials = {
  username: string;
  password: string;
  email: string;
};

export async function createUser(credentials: CreateUserCredentials) {
  return await fetch(`${serverURL}/register`, {
    body: JSON.stringify(credentials),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    if (res.status === 201) {
      return { success: true, error: null };
    } else {
      return { success: false, error: "Could not register the user." };
    }
  });
}
