/**
 * Type representing the credentials required to create a new user.
 */
type CreateUserCredentials = {
  username: string;
  password: string;
  email: string;
};

/**
 * Sends a request to create a new user with the provided credentials.
 *
 * @param credentials - The credentials of the user to be created.
 * @returns A promise that resolves to an object indicating the success or failure of the operation.
 */
export async function createUser(credentials: CreateUserCredentials) {
  return await fetch(`${import.meta.env.VITE_SERVER_URL}/register`, {
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
