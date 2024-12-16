import Cookies from "js-cookie";
import { ServiceResponse } from "../types/common";
import { serverURL } from "../../../constants";

type UserCredentials = {
  username: string;
  password: string;
};

export async function logOut(username: string): Promise<ServiceResponse> {
  return await fetch(`${serverURL}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json", credentials: "include" },
    body: JSON.stringify({ username }),
  }).then(async (res) => {
    const success = res.status === 200;
    if (res.status === 200) {
      Cookies.remove("token");
      Cookies.remove("username");
      Cookies.remove("email");
      return { success, error: null };
    } else {
      /* TBD: Enhance with the proper error handling, map the status codes and configure Server messages */
      return {
        success,
        error: "Could not log out from the account. Please try again",
      };
    }
  });
}

export async function logUser(
  credentials: UserCredentials
): Promise<ServiceResponse<null>> {
  return await fetch(`${serverURL}/login`, {
    body: JSON.stringify(credentials),
    method: "POST",
    headers: { "Content-Type": "application/json", credentials: "include" },
  }).then(async (res) => {
    const success = res.status === 200;
    if (res.status === 200) {
      const data = await res.json();
      Cookies.set("token", data.token, { expiresIn: "1h" });
      Cookies.set("username", data.username, { expiresIn: "1h" });
      Cookies.set("email", data.email, { expiresIn: "1h" });
      return { success, error: null };
    } else {
      /* TBD: Enhance with the proper error handling, map the status codes and configure Server messages */
      return { success: false, error: "User unauthorized" };
    }
  });
}
