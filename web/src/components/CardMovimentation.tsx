import clsx from "clsx";
import { ReactNode } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { Text } from "./Text"

export interface EntranceProps {
  id?: number;
  toolName: string;
  addedAt: Date;
  supervisorName: string;
  quantity: number;
  unitPrice: number
};

export interface ExitProps {
  id?: number;
  status: string;
  requester: string;
  toolName: string;
  requestedAt: Date;
  responseAt: Date;
  enterpriseName: string;
  quantity: number;
  account: string;
  subAccount: string
};

export interface CardMovimentationProps {
  variant: "entrance" | "exit";
  data: EntranceProps | ExitProps | any;
  children: ReactNode;
  colorBorder: string
};

export function CardMovimentation({ variant, data, children, colorBorder }: CardMovimentationProps) {
  const location = useLocation()

  return (
    <div 
      style={{
        borderColor: colorBorder
      }}
      className=' shadow-md border-l-8 rounded flex flex-col justify-between'>
      {
        variant === "exit" && (
          <div
            className="flex justify-end"
          >
            <Text 
              text="sm" 
              size="xs"
              color="white" 
              asChild
            > 
              <span className={clsx('px-[8px] rounded-l-full', {
                "bg-red-600": data.status === 'Pendente',
                "bg-green-600": data.status === 'Autorizado',
              })}
              >
                { data.status }
              </span> 
            </Text> 
          </div>
        )
      }
      <section className="p-3">
        <Text text={(data.toolName) as string} color="gray-900" size="lg" />
        {
          variant === "entrance" && 
          (
            <Text 
              size="sm" 
              color="gray-900" 
              asChild
            > 
              <p>Adicionado por { data.supervisorName }</p> 
            </Text> 
          )
        }

        <div className="flex justify-between items-center mt-4">
          <Text size="sm" color="gray-900" asChild>
            <NavLink 
              to={`${location.pathname}/${data.id}`}
              className="hover:text-gray-600 underline-offset-4 underline"
            >
              Detalhes
            </NavLink> 
          </Text>
          <div className="flex gap-2 items-center">
            {children}
          </div>
        </div>
      </section>
      
    </div>
  )
}