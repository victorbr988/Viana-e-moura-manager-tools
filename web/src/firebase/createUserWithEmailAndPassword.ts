import { createUserWithEmailAndPassword } from "firebase/auth";
import { customErrors } from "../errors/customErrors";
import { auth } from "./firebase-init";
import { siginUser } from "./signinUserWithEmailAndPassword";

function validateFields(email: string, password: string) {
  const regex = /\S+@\S+\.\S+/
  if (password.length < 3) return customErrors.INVALID_PASSWORD
  if (!regex.test(email)) return customErrors.INVALID_EMAIL

  return true
}

export async function createUser(email: string, password: string) {
  try {
    if (validateFields(email, password) === customErrors.INVALID_PASSWORD) throw new Error("Senha inválida")
    if (validateFields(email, password) === customErrors.INVALID_EMAIL) throw new Error("E-mail inválido")
    
    const userExist = await siginUser(email, password)

    if (userExist === customErrors.WRONG_PASSWORD) {
      throw new Error("Senha não confere")
    }

    if (userExist === customErrors.NOT_FOUND) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      return userCredential.user
    }
    
  } catch(err: any) {
    throw err
  }
}
