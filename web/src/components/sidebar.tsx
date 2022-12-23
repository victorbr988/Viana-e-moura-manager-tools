import { useContext, Fragment } from "react";
import { FiActivity, FiArrowDownCircle, FiArrowUpCircle, FiGrid, FiLogOut, FiSettings, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CardNavigation } from "./CardNavigation";
import { AuthContext } from "../context/Context-provider"
import { User } from "firebase/auth";
import {disconect} from "../firebase/disconectUser"

export function Sidebar() {
  const contextState = useContext(AuthContext)
  const userCredential: User | null = contextState.userLogged
  const navigate = useNavigate()

  async function handleClick() {
    await disconect()
    navigate("/")
  }

  return (
    <Fragment>
      <aside className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r">
        <header>
          <h2 className="text-3xl font-semibold text-center text-gray-800">Viana & Moura</h2>
          <p className="mx-2 mt-1 text-sm font-medium text-gray-600 text-center">{userCredential?.email || "anônimo@gmail.com"}</p>
        </header>
        <main className="flex flex-col justify-between flex-1 mt-6">
            <nav>
                <CardNavigation route="/tools">
                  <FiSettings />
                  <span>Ferramentas</span>
                </CardNavigation>

                <CardNavigation route="/enterprises">
                  <FiGrid />
                  <span>Empreendimentos</span>
                </CardNavigation>

                <CardNavigation route="/supervisors">
                  <FiUsers />
                  <span>Supervisores</span>
                </CardNavigation>

                <CardNavigation route="entrance">
                  <FiArrowUpCircle />
                  <span>Entradas</span>
                </CardNavigation>

                <CardNavigation route="exit">
                  <FiArrowDownCircle />
                  <span>Saídas</span>
                </CardNavigation>

                <CardNavigation route="dashboard">
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