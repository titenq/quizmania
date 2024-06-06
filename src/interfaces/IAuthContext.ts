import { IUser } from './IUser';

export interface IAuthContext {
  isLoggedIn: boolean;
  userInfo: IUser | null;
  login: (userInfo: IUser) => void;
  logout: () => void;
}
