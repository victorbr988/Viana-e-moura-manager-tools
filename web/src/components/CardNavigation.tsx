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
      className='navigation-card-style'
      onClick={ () => navigation(route) }
    >
      {children}
    </button>
  )
}
