type CreateUserCredentials = {
  username: string;
  password: string;
  email: string;
}

export async function createUser(credentials: CreateUserCredentials) {
  await fetch('http://localhost:3001/register', {
    body: JSON.stringify(credentials),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => {
    if (res.ok) {
      console.info("User created successfully")
    } else {
      throw new Error('Error while creating a user')
    }
  }).catch((err) => {
    console.error(err)
  })
}