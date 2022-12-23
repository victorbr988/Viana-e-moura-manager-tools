import { NavLink } from "react-router-dom"
import locations from "../assets/locations.svg"
import { ButtonSecondary } from "./Button"

export function Unautorized() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <img src={locations} className="md:w-80 md:h-80 w-40 h-40" alt="não autorizado" />
      <h2 className="text-xl">Você não deveria estar aqui...</h2>
      <div>
       <ButtonSecondary />     
      </div>
    </div>  
  )
}