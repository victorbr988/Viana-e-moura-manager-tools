import clsx from "clsx";
import { useState } from "react";
import { FiArrowDownCircle, FiArrowUpCircle, FiGrid, FiLogOut, FiSettings, FiUsers } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import arrowRightCircle from '../assets/arrow-rigth.svg'
import { CardNavigation } from "./CardNavigation";

export function Sidebar() {
  const [rotateArrow, setRotateArrow] = useState<boolean>(false)

  return (
    <aside className={clsx(`fixed shadow-lg transition-all ease-linear bg-slate-200 h-screen hidden md:block`, {
        "w-[250px]": rotateArrow === false,
        "w-20": rotateArrow === true
      })}
    >
      <img 
        src={arrowRightCircle}
        alt="imagem de uma seta"
        className={clsx(`absolute right-0 top-16 cursor-pointer transition-all ease-linear`, {
          "rotate-180": rotateArrow === true || false
        })}
        onClick={() => {
          setRotateArrow(!rotateArrow)
        }}
      />

      <section className="flex items-center gap-3 p-5">
        <div className="h-10 w-10 bg-teal-500 text-white rounded-full flex justify-center items-center">
          V
        </div>
        <span className={clsx(`text-lg text-gray-900`, {
          "hidden": rotateArrow === true
        })}>Victor</span>
      </section>

      <section className="mt-10">
        <CardNavigation route="/tools">
          <FiSettings className="group-hover:text-teal-500 text-xl" />
          <h2 className={clsx('group-hover:text-teal-500', {
            "hidden": rotateArrow === true
          })}>Ferramentas</h2>
        </CardNavigation>

        <CardNavigation route="/supervisors">
          <FiUsers className="group-hover:text-teal-500 text-xl" />
          <h2 className={clsx('group-hover:text-teal-500', {
            "hidden": rotateArrow === true,
          })}>Supervisores</h2>
        </CardNavigation>

        <CardNavigation route="/enterprises">
          <FiGrid className="group-hover:text-teal-500 text-xl" />
          <h2 className={clsx('group-hover:text-teal-500', {
            "hidden": rotateArrow === true
          })}>Empreendimentos</h2>
        </CardNavigation>

        <CardNavigation route="/entrance">
          <FiArrowUpCircle className="group-hover:text-teal-500 text-xl" />
          <h2 className={clsx('group-hover:text-teal-500', {
            "hidden": rotateArrow === true
          })}>Entradas</h2>
        </CardNavigation>

        <CardNavigation route="/exit">
          <FiArrowDownCircle className="group-hover:text-teal-500 text-xl" />
          <h2 className={clsx('group-hover:text-teal-500', {
            "hidden": rotateArrow === true
          })}>Saídas</h2>
        </CardNavigation>
      </section>

      <NavLink to="/login" className="flex gap-2 w-full items-center absolute bottom-5 cursor-pointer left-8 group hover:text-teal-500">
        <FiLogOut className="text-lg" />
        <span className={clsx(`text-lg text-gray-900  group-hover:text-teal-500`, {
          "hidden": rotateArrow === true
        })}>Sair</span>
      </NavLink>
    </aside>
  )
}