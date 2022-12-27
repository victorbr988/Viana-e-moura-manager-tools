import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export interface CardNavigationProps {
  route: string,
  children: ReactNode,
  closeSidebar?(): void
}

export function CardNavigation({ route = '/', children, closeSidebar = () => {} }: CardNavigationProps) {
  const navigation = useNavigate()

  return (
    <button
      className='navigation-card-style'
      onClick={ () => {
        navigation(route);
        closeSidebar()
      } }
    >
      {children}
    </button>
  )
}
