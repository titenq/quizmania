import { IUser } from './IUser';

export interface IAuthContext {
  isLoggedIn: boolean;
  userInfo: IUser | null;
  loginGoogle: (token: string) => void;
  loginGithub: (token: string, userInfo: IUser) => void;
  loginFacebook: (token: string, userInfo: IUser) => void;
  logout: () => void;
}
