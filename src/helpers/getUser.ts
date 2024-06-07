import { jwtDecode } from 'jwt-decode';

import { IGoogleCredential } from '../interfaces/IGoogleCredential';

const getUser = (credential: string) => {
  if (credential) {
    const { name, email, picture } = jwtDecode<IGoogleCredential>(credential);
    const user = { name, email, picture };

    return user;
  }

  return null;
};

export default getUser;
