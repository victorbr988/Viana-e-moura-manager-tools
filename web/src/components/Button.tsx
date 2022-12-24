import { ReactNode, useContext } from "react"
import { FcGoogle }  from "react-icons/fc"
import { AuthContext } from "../context/Context-provider"
export interface ButtonRootProps {
  children: ReactNode
  handleClick?(): void
}

export function ButtonAdd({children, handleClick}: ButtonRootProps) {
  
  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex hover:bg-blue-600/90 transition-all gap-2 w-full justify-center text-sm rounded items-center p-2 text-white bg-blue-600">
      {children}
    </button>
  )
}

export function ButtonSecondary() {
  const contextState = useContext(AuthContext)
  return (
    <button 
      type="button"
      onClick={contextState.createAccountWithGoogle}
      className="flex hover:bg-gray-100 border-2 border-gray-100 transition-all gap-3 w-full justify-center text-sm rounded items-center p-2 text-gray-900 bg-white">
      <FcGoogle className="text-2xl" />
      <span className="text-base">Entrar com o Google</span>
    </button>
  )
}
