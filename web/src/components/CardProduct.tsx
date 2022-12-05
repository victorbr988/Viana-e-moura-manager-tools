import { ReactNode } from "react"
import { Text } from "./Text";

export interface DataProps {
  id?: number;
  name: string;
  sector?: string;
}

export interface CardProductProps {
  children: ReactNode;
  data: DataProps;
  colorBorder?: string;
}

export function CardProduct({ children, data, colorBorder = '#121212' }: CardProductProps ) {
  return (
    <div 
      style={{borderColor: colorBorder}}
      className="flex justify-between items-center p-2 w-full bg-white shadow-md border-l-8 rounded">
      <Text 
        text={data.name} 
        asChild={false}
        size="md"
      />
      <div className="flex justify-end items-center gap-3">
        { children }
      </div>
    </div>
  )
}