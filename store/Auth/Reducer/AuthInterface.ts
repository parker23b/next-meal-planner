export interface AuthInterface {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  token: null | string;
  user: object;
  id: string;
}
