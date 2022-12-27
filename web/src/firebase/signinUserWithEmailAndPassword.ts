import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-init";

export async function siginUser(email: string, password: string) {
  try { 
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    return userCredential.user
  } catch(err: unknown) {

    if(err instanceof FirebaseError) {
      return err.code
    }

    console.dir(err)
    throw err
  }
} 
