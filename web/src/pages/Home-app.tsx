import { useContext } from "react"
import { AuthContext } from "../context/Context-provider"

export function HomeApp() {
  const contextState = useContext(AuthContext)
  const userCredential = contextState.userLogged

  return (
    <p>{`Bem vindo ${userCredential?.displayName || userCredential?.email}`}</p>
  )
}