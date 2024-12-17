import Cookies from "js-cookie";
import { ServiceResponse } from "../types/common";

type UserCredentials = {
  username: string;
  password: string;
};

/**
 * Logs out the user by sending a POST request to the server's logout endpoint.
 *
 * @param {string} username - The username of the user to log out.
 * @returns {Promise<ServiceResponse>} A promise that resolves to a ServiceResponse object indicating the success or failure of the logout operation.
 *
 * Note: Proper error handling and mapping of status codes should be enhanced in the future.
 */
export async function logOut(username: string): Promise<ServiceResponse> {
  return await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
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

/**
 * Authenticates a user with the provided credentials.
 *
 * @param credentials - An object containing the username and password of the user.
 * @returns A promise that resolves to a ServiceResponse object indicating the success or failure of the login attempt.
 *
 * @remarks
 * - On successful login, the function sets cookies for the token, username, and email with an expiration time of `1 hour`.
 */
export async function logUser(
  credentials: UserCredentials
): Promise<ServiceResponse<null>> {
  return await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
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
