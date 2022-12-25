import { User } from "firebase/auth"
import { useContext } from "react"
import { useLocation } from "react-router-dom"
import { Unautorized } from "./components/DefaultComponent"
import { Sidebar } from "./components/sidebar"
import { AuthContext } from "./context/Context-provider"
import { DatabaseProvider } from "./context/Database-provider"
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
      <DatabaseProvider>
        {router.pathname !== "/" && userCredential !== null && (<Sidebar />)}
        <Pagination />
      </DatabaseProvider>
    )
  }
  return (
    <div className="flex">
      {RenderIfIsLogged()}
    </div>
  )
}

export default App
