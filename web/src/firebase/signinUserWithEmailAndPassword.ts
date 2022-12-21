import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-init";

export async function siginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch(err: unknown) {
    console.dir(err)
    if(err instanceof FirebaseError) {
      return err.code
    }
    throw err
  }
} 
