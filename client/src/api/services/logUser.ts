import Cookies from 'js-cookie';

type UserCredentials = {
  username: string;
  password: string;
}

export async function logUser(credentials: UserCredentials) {
  return await fetch('http://localhost:3001/login', {
    body: JSON.stringify(credentials),
    method: 'POST',
    headers: { 'Content-Type': 'application/json', credentials: 'include' }
  }).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      Cookies.set('token', data.token, { expiresIn: '1h' });
    } else {
      return { error: res.statusText };
    }
  })
}