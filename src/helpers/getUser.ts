import { jwtDecode } from 'jwt-decode';

import { IGoogleCredential } from '../interfaces/IGoogleCredential';

const getUser = (token: string) => {
  if (token) {
    const { name, email, picture } = jwtDecode<IGoogleCredential>(token);
    const user = { name, email, picture };

    return user;
  }

  return null;
};

export default getUser;
