import { User, UserCredential } from "firebase/auth";

export interface AuthProviderProps {
  children: React.ReactNode
}

export interface ContextProps {
  userLogged: User | null;
  setUserLogged: React.Dispatch<React.SetStateAction<User | null>>;
  accessUserInApp: (email: string, password: string) => Promise<void>;
  loading: boolean;
  user: UserCredential | undefined;
  createAccountWithGoogle(): Promise<void>;
}

export interface ToolProps {
  id?: number,
  name: string
};

export interface SupervisorProps {
  id?: number,
  name: string,
  sector: string
};

export interface EntranceProps {
  id?: number,
  toolName: string,
  addedAt: Date,
  supervisorName: string,
  quantity: number,
  unitPrice: number,
  userId: string,
}

export interface ExitProps {
  id?: number,
  status: string,
  requester: string,
  toolName: string,
  requestedAt: Date,
  responseAt: Date,
  enterpriseName: string
  quantity: number,
  account: string,
  subAccount: string,
  userId: string
}

export interface EnterpriseProps extends ToolProps {}
