import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import { siginUser } from "../firebase/signinUserWithEmailAndPassword";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase-init";
import { AuthContext } from "./Context-provider";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { customErrors } from "../errors/customErrors";
import { useNavigate } from "react-router-dom";
import { ContextProps, AuthProviderProps } from "./types";

const provider = new GoogleAuthProvider();

export function AuthProvider({ children }: AuthProviderProps) {
  const [userLogged, setUserLogged] = useState<User | null>(null);
  const [
    createUserWithEmailAndPassword,
    user,
    loading
  ] = useCreateUserWithEmailAndPassword(auth)

  const navigate = useNavigate()

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUserLogged(user)
    });
  }, [])

  const contextType: ContextProps = {
    userLogged,
    setUserLogged,
    accessUserInApp,
    loading,
    user,
    createAccountWithGoogle
  }

  async function createUser(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(email, password)
    navigate("/home-app")
    return userCredential?.user
  }

  async function managerErrorsAccess(userType: string | User, email: string, password: string) {
    if (userType === customErrors.WRONG_PASSWORD) {
      throw new Error("Senha não confere")
    }

    if (typeof userType !== 'string') {
      return navigate("/home-app")
    }

    if (userType === customErrors.INVALID_EMAIL) {
      throw new Error("Email no formato inválido")
    }

    if (userType === customErrors.NOT_FOUND) {
      try{
        await createUser(email, password)
      } catch(err: unknown) {
        throw err
      }
    }
  }

  async function accessUserInApp(email: string, password: string) {
    try {
      const userExist = await siginUser(email, password)
      await managerErrorsAccess(userExist, email, password)

    } catch(err: any) {
      throw err
    }
  }

  async function createAccountWithGoogle() {
    try {
      await signInWithPopup(auth, provider)
      // const credential = GoogleAuthProvider.credentialFromResult(userCredential);
      // const token = credential?.accessToken;
      // const user = userCredential.user;
      navigate('/home-app')
    } catch(err) {
      throw err
    }
  }

  return (
    <AuthContext.Provider value={contextType}>
      {children}
    </AuthContext.Provider>
  )
}
