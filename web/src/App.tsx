import { FiSettings } from "react-icons/fi"
import { CardMovimentation } from "./components/CardMovimentation"
import { CardNavigate } from "./components/CardNavigation"

function App() {
  return (
    <div className="App">
      <CardNavigate.Root route="/">
        <CardNavigate.WithIcon>
          <span>testando</span>
          <FiSettings />
        </CardNavigate.WithIcon>
      </CardNavigate.Root>
    </div>
  )
}

export default App
