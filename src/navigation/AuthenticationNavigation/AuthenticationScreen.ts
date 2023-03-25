import { LoginScreen, ForgotPassScreen } from 'screens';
import AuthenticationRouter from './AuthenticationRouter';

const { LOGIN, FORGOTPASS } = AuthenticationRouter;

export const AuthenticationScreen = {
  [LOGIN]: { screen: LoginScreen, title: 'Đăng nhập' },
  [FORGOTPASS]: { screen: ForgotPassScreen, title: '' }
};
