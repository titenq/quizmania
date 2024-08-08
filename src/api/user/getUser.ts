import Host from '../../enums/Host';
import TokenName from '../../enums/TokenName';
import { backendBaseUrl } from '../../helpers/baseUrl';

const getUser = async (token: string, host: Host, tokenName: TokenName) => {
  try {
    const response = await fetch(`${backendBaseUrl}/${host}/user`, {
      method: 'POST',
      headers: {
        [tokenName]: token
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar informações do usuário no ${host}`);
    }

    const user = await response.json();

    return user;
  } catch (error) {
    throw new Error(`Erro ao buscar informações do usuário no ${host}`);
  }
};

export default getUser;
