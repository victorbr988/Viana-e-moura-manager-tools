import { User } from "firebase/auth"
import { Fragment, useContext } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Unautorized } from "./components/DefaultComponent"
import { Sidebar } from "./components/sidebar"
import { AuthContext } from "./context/Context-provider"
import { DatabaseProvider } from "./context/Database-provider"
import { Pagination } from "./Routes/Pagination"

function RenderIfIsLogged() {
  const contextState = useContext(AuthContext)
  const userCredential: User | null = contextState.userLogged
  const router = useLocation()

  if (router.pathname !== "/" && !userCredential) {
    return <Unautorized /> 
  }
  return (
    <DatabaseProvider>
      <Fragment>
        {router.pathname !== "/" && userCredential !== null && (<Sidebar />)}
        <Pagination />
      </Fragment>
    </DatabaseProvider>
  )
}

function App() {
  return (
    <div className="flex">
      <RenderIfIsLogged />
    </div>
  )
}

export default App
