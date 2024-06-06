import { jwtDecode } from 'jwt-decode';

import { IGoogleCredential } from '../interfaces/IGoogleCredential';

const getUser = (credential: string) => {
  let decodedCredential;
  let user;

  if (credential) {
    decodedCredential = jwtDecode<IGoogleCredential>(credential);

    user = {
      name: decodedCredential.name,
      email: decodedCredential.email,
      picture: decodedCredential.picture
    };

    return user;
  }

  return null;
};

export default getUser;
