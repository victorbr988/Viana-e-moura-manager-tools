import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export interface CardNavigationProps {
  route: string,
  children: ReactNode,
}

export function CardNavigation({ route = '/', children }: CardNavigationProps) {
  const navigation = useNavigate()

  return (
    <button
      className={`cursor-pointer w-full text-lg hover:bg-gray-50 group rounded text-gray-900 flex items-center gap-2 p-5`}
      onClick={ () => navigation(route) }
    >
      {children}
    </button>
  )
}
