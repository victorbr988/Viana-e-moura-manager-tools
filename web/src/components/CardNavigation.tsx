import clsx from "clsx";
import { ReactNode, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { randonColor } from '../utils/randonColor'

export interface CardNavigationProps {
  route: string,
  children: ReactNode,
}

export function CardNavigation({ route = '/', children }: CardNavigationProps) {
  const navigation = useNavigate()

  return (
    <button
      className={`cursor-pointer w-full hover:bg-gray-50 group rounded text-gray-900 flex justify-center items-center gap-2 p-2`}
      onClick={ () => navigation(route) }
    >
      {children}
    </button>
  )
}
