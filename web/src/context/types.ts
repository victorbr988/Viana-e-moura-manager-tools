import { User, UserCredential } from "firebase/auth";

export interface AuthProviderProps {
  children: React.ReactNode
}

export interface ContextProps {
  userLogged: User | null;
  setUserLogged: React.Dispatch<React.SetStateAction<User | null>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<string>;
  createUser: () => Promise<User | undefined>;
  loading: boolean,
  user: UserCredential | undefined;
  createAccountWithGoogle(): Promise<void>
}
