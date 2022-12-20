import { ReactNode } from "react"
import { FcGoogle }  from "react-icons/fc"
export interface ButtonRootProps {
  children: ReactNode
}

export function ButtonAdd({children}: ButtonRootProps) {
  return (
    <button className="flex hover:bg-blue-600/90 transition-all gap-3 w-full justify-center text-sm rounded items-center p-2 text-white bg-blue-600">
      {children}
    </button>
  )
}

export function ButtonSecondary() {
  return (
    <button className="flex hover:bg-gray-100 border-2 border-gray-100 transition-all gap-3 w-full justify-center text-sm rounded items-center p-2 text-gray-900 bg-white">
      <FcGoogle className="text-2xl" />
      <span className="text-base">Entrar com o Google</span>
    </button>
  )
}
