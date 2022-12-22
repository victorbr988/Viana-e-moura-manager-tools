import { AuthProvider } from "./context/Auth-provider"
import { Pagination } from "./Routes/Pagination"


function App() {
  return (
    <AuthProvider>
      <Pagination />
    </AuthProvider>
  )
}

export default App
