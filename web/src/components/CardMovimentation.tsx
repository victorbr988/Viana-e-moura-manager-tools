import clsx from "clsx";
import { ReactNode } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { EntranceProps, ExitProps } from "../context/types";
import { dateFormat } from "../utils/dateFormat";

export interface CardMovimentationProps {
  variant: "entrance" | "exit";
  data: EntranceProps | ExitProps | any;
  children: ReactNode;
};

export function CardMovimentation({ variant, data, children }: CardMovimentationProps) {
  const location = useLocation()

  return (
    <div 
      className=' border-blue-600 shadow-md bg-white border-l-8 rounded flex flex-col justify-between'>
      {
        variant === "exit" && (
          <div
            className="flex justify-end mt-1"
          >
           <span className={clsx('px-[8px] font-light text-sm text-white rounded-l-full', {
                "bg-red-600": data.status === 'Pendente',
                "bg-green-600": data.status === 'Atendido',
              })}
            >
              { data.status }
            </span> 
          </div>
        )
      }
      <section className="p-3 pt-0">
        <h2 className="text-lg text-gray-900 text-semibold">{data.toolName}</h2>
        { variant === "exit" && <p className="text-gray-500 text-sm font-light rounded-lg"><strong>Requisitado em:</strong> {dateFormat(new Date(data.requestedAt))}</p> }
        {
          variant === "entrance" && 
          (
            <p className="text-sm text-slate-500">{dateFormat(new Date(data.addedAt))}</p>
          )
        }

        <div className="flex justify-between items-center mt-4">
          <NavLink 
              to={`${location.pathname}/${data.id}`}
              className="hover:text-blue-500 underline-offset-4 text-sm text-gray-900 underline"
            >
              Detalhes
            </NavLink> 
          <div className="flex gap-2 items-center text-lg">
            {children}
          </div>
        </div>
      </section>
      
    </div>
  )
}