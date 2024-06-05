import { IUserInfo } from './IUserInfo';

export interface IAuthContext {
  isLoggedIn: boolean;
  userInfo: IUserInfo | null;
  login: (token: string, userInfo: IUserInfo) => void;
  logout: () => void;
}
