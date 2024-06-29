import IUser from './IUser';

interface IAuthContext {
  isLoggedIn: boolean;
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

export default IAuthContext;
