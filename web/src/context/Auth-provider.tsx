import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import { siginUser } from "../firebase/signinUserWithEmailAndPassword";
import { ProviderProps, ReactNode, useEffect, useState } from "react";
import { auth } from "../firebase/firebase-init";
import { AuthContext } from "./Context-provider";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { customErrors } from "../errors/customErrors";
import { useNavigate } from "react-router-dom";
import { ContextProps } from "./types";

const provider = new GoogleAuthProvider();

function validateFields(email: string, password: string) {
  const regex = /\S+@\S+\.\S+/
  if (!regex.test(email)) return customErrors.INVALID_EMAIL
  if (password.length < 3) return customErrors.INVALID_PASSWORD

  return true
}

export function AuthProvider({ children }: ProviderProps<ReactNode>) {
  const [userLogged, setUserLogged] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
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
  })

  const contextType: ContextProps = {
    userLogged,
    setUserLogged,
    email,
    setEmail,
    password,
    setPassword,
    createUser,
    loading,
    user,
    createAccountWithGoogle
  }
  console.log({email, password})

  async function createUser() {
    try {
      if (validateFields(email, password) === customErrors.INVALID_PASSWORD) throw new Error("Senha inválida")
      if (validateFields(email, password) === customErrors.INVALID_EMAIL) throw new Error("E-mail inválido")
      
      const userExist = await siginUser(email, password)
  
      if (userExist === customErrors.WRONG_PASSWORD) {
        throw new Error("Senha não confere")
      }
  
      if (userExist === customErrors.NOT_FOUND) {
        const userCredential = await createUserWithEmailAndPassword(email, password)
        return userCredential?.user
      }
      navigate('home-app')
    } catch(err: any) {
      throw err
    }
  }

  async function createAccountWithGoogle() {
    try {
      const userCredential = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(userCredential);
      const token = credential?.accessToken;
      const user = userCredential.user;
      console.log({user, token})
      navigate('home-app')
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
