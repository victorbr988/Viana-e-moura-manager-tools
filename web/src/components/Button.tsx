import { ReactNode } from "react"
export interface ButtonRootProps {
  children: ReactNode
}

export function ButtonAdd({children}: ButtonRootProps) {
  return (
    <button className="flex gap-2 w-full justify-center text-sm rounded items-center p-2 text-white bg-[#0066FF]">
      {children}
    </button>
  )
}
