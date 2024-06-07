import { IUser } from './IUser';

export interface IAuthContext {
  isLoggedIn: boolean;
  userInfo: IUser | null;
  login: (credential: string) => void;
  logout: () => void;
}
