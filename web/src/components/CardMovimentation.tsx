import clsx from "clsx";
import { ReactNode } from "react"
import { NavLink, useLocation } from "react-router-dom"

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
};

export function CardMovimentation({ variant, data, children }: CardMovimentationProps) {
  const location = useLocation()

  return (
    <div 
      className=' border-teal-500 shadow-md border-l-8 rounded flex flex-col justify-between'>
      {
        variant === "exit" && (
          <div
            className="flex justify-end"
          >
           <span className={clsx('px-[8px] text-sm text-white rounded-l-full', {
                "bg-red-600": data.status === 'Pendente',
                "bg-green-600": data.status === 'Autorizado',
              })}
            >
              { data.status }
            </span> 
          </div>
        )
      }
      <section className="p-3">
        <h2 className="text-lg text-gray-900 text-semibold">{data.toolName}</h2>
        {
          variant === "entrance" && 
          (
            <p className="text-sm text-slate-500">Adicionado por { data.supervisorName }</p>
          )
        }

        <div className="flex justify-between items-center mt-4">
          <NavLink 
              to={`${location.pathname}/${data.id}`}
              className="hover:text-gray-600 underline-offset-4 text-sm text-gray-900 underline"
            >
              Detalhes
            </NavLink> 
          <div className="flex gap-2 items-center">
            {children}
          </div>
        </div>
      </section>
      
    </div>
  )
}