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
      className="flex text-lg justify-between items-end p-2 w-full border-blue-500 bg-white shadow-md border-l-8 rounded"
    > 
      <div className="flex flex-col gap-1">
        {data.sector && <p className="text-gray-500 text-sm font-light rounded-lg">Setor: {data.sector}</p>}
        <h2>{data.name}</h2>
      </div>  
      <div className="flex justify-end items-center gap-3 text-lg">
        { children }
      </div>
    </div>
  )
}