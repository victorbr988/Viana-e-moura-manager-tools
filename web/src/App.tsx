import { FiSettings } from "react-icons/fi"
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
      <div className={`w-32 h-32`}>

      </div>
    </div>
  )
}

export default App
