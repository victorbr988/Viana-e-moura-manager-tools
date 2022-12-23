import { signOut } from "firebase/auth";
import toast from "react-hot-toast" 
import { auth } from "./firebase-init";

export async function disconect() {
  try {
    await signOut(auth)
    toast.success('Usuário desconectado')
  } catch(error) {
    toast.error("Não foi possível desconectar-se")
    console.log(error)
  }
}