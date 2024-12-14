import Cookies from 'js-cookie';
import { ServiceResponse } from '../../types/common';

type UserCredentials = {
  username: string;
  password: string;
}

export async function logUser(credentials: UserCredentials): Promise<ServiceResponse<null>> {
  return await fetch('http://localhost:3001/login', {
    body: JSON.stringify(credentials),
    method: 'POST',
    headers: { 'Content-Type': 'application/json', credentials: 'include' }
  }).then(async (res) => {
    const success = res.status === 200;
    if (res.status === 200) {
      const data = await res.json();
      Cookies.set('token', data.token, { expiresIn: '1h' });
      return { success, error: null };
    } else {
      /* TBD: Enhance with the proper error handling, map the status codes and configure Server messages */
      return { success: false, error: 'User unauthorized' };
    }
  })
}