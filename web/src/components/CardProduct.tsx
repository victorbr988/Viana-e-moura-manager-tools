import { ReactNode } from "react"

export interface DataProps {
  id?: number;
  name: string;
  sector?: string;
}

export interface CardProductProps {
  children: ReactNode;
  data: DataProps;
}

export function CardProduct({ children, data }: CardProductProps ) {
  return (
    <div 
      className="flex text-lg justify-between items-center p-2 w-full border-blue-500 bg-white shadow-md border-l-8 rounded">
        <h2>{data.name}</h2>
      <div className="flex justify-end items-center gap-3">
        { children }
      </div>
    </div>
  )
}