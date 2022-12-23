import { User, UserCredential } from "firebase/auth";

export interface AuthProviderProps {
  children: React.ReactNode
}

export interface ContextProps {
  userLogged: User | null;
  setUserLogged: React.Dispatch<React.SetStateAction<User | null>>;
  createUser: (email: string, password: string) => Promise<User | undefined>;
  loading: boolean;
  user: UserCredential | undefined;
  createAccountWithGoogle(): Promise<void>;
}
