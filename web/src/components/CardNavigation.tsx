import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { randonColor } from '../utils/randonColor'

export interface CardNavigationProps {
  route: string,
  children: ReactNode,
  colorBorder?: string
}

interface CardNavigationIconProps {
  children: ReactNode
}

function CardNavigationRoot({ route = '/', children, colorBorder = '#121212' }: CardNavigationProps) {
  const navigation = useNavigate()

  return (
    <button
      style={{borderColor: colorBorder}}
      className={`cursor-pointer w-full rounded bg-gray-200 text-gray-900 border-l-8 flex justify-center items-center gap-2 p-2`}
      onClick={ () => navigation(route)}
    >
      {children}
    </button>
  )
}

function CardNavigationWithIcon({ children }: CardNavigationIconProps) {
  return (
    <>
      { children }
    </>
  ) 
}

export const CardNavigate = {
  Root: CardNavigationRoot,
  WithIcon: CardNavigationWithIcon
}
