import { User } from "firebase/auth"
import { Fragment, useContext } from "react"
import { useLocation } from "react-router-dom"
import { Unautorized } from "./components/DefaultComponent"
import { Sidebar } from "./components/sidebar"
import { AuthContext } from "./context/Context-provider"
import { Pagination } from "./Routes/Pagination"

function App() {
  const contextState = useContext(AuthContext)
  const userCredential: User | null = contextState.userLogged
  const router = useLocation()

  function RenderIfIsLogged() {
    if (router.pathname !== "/" && !userCredential) {
      return <Unautorized /> 
    }
    return (
      <Fragment>
        {router.pathname !== "/" && userCredential !== null && (<Sidebar />)}
        <Pagination />
      </Fragment>
    )
  }
  return (
    <div className="flex">
      {RenderIfIsLogged()}
    </div>

  )
}

export default App
