import { useContext, Fragment, useState } from "react";
import { FiActivity, FiArrowDownCircle, FiArrowUpCircle, FiGrid, FiLogOut, FiMenu, FiSettings, FiUsers, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CardNavigation } from "./CardNavigation";
import { AuthContext } from "../context/Context-provider"
import { User } from "firebase/auth";
import {disconect} from "../firebase/disconectUser"
import clsx from "clsx";
import useWindowDimensions from "../utils/hooks";

export function Sidebar() {
  const contextState = useContext(AuthContext)
  const userCredential: User | null = contextState.userLogged
  const navigate = useNavigate()
  const [isOpenNavigation, setIsOpenNavigation] = useState<boolean>(true)
  const { width } = useWindowDimensions();
  console.log(width)

  async function handleClick() {
    await disconect()
    navigate("/")
  }

  function modalVisible() {
    setIsOpenNavigation(!isOpenNavigation)
  }

  return (
    <Fragment>
      <FiMenu className={clsx("text-3xl absolute left-6 z-50", {
        "hidden": width > 500
      })} onClick={modalVisible} />
      <aside className={clsx("flex flex-col w-64 min-h-screen px-4 py-8 bg-white border-r", {
        "absolute z-40": width <= 500,
        "hidden": isOpenNavigation === false && width <= 500
      })}>
        <header className="flex flex-col pt-3 gap-2">
          <h2 className="text-3xl font-semibold text-center text-gray-800">Viana & Moura</h2>
          <p className="mx-2 mt-1 text-sm font-medium text-gray-600 text-center">{userCredential?.email || "anônimo@gmail.com"}</p>
        </header>
        <main className="flex flex-col justify-between flex-1 mt-6">
            <nav>
                <CardNavigation route="/home-app/tools">
                  <FiSettings />
                  <span>Ferramentas</span>
                </CardNavigation>

                <CardNavigation route="/home-app/enterprises">
                  <FiGrid />
                  <span>Empreendimentos</span>
                </CardNavigation>

                <CardNavigation route="/home-app/supervisors">
                  <FiUsers />
                  <span>Supervisores</span>
                </CardNavigation>

                <CardNavigation route="/home-app/entrance">
                  <FiArrowUpCircle />
                  <span>Entradas</span>
                </CardNavigation>

                <CardNavigation route="/home-app/exit">
                  <FiArrowDownCircle />
                  <span>Saídas</span>
                </CardNavigation>

                <CardNavigation route="/home-app/dashboard">
                  <FiActivity />
                  <span>Dashboard</span>
                </CardNavigation>

                <button onClick={handleClick} className='navigation-card-style'>
                  <FiLogOut />
                  <span>Sair</span>
                </button>
            </nav>
        </main>
      </aside>
    </Fragment>
  )
}