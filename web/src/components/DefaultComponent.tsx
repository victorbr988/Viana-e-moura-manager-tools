import locations from "../assets/locations.svg"
import noData from "../assets/no-data.svg"
import { ButtonSecondary } from "./Button"

export function Unautorized() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-4">
      <img src={locations} className="md:w-80 md:h-80 w-40 h-40" alt="não autorizado" />
      <h2 className="text-xl">Você não deveria estar aqui...</h2>
      <div>
       <ButtonSecondary />     
      </div>
    </div>  
  )
}

export function NoData() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <img src={noData} className="md:w-60 md:h-60 w-40 h-40" alt="não autorizado" />
      <h2 className="text-xl">Nada por aqui!</h2>
    </div>  
  )
}