import { FiSettings } from "react-icons/fi"
import { CardNavigate } from "./components/CardNavigation"

function App() {
  const color = `#121212`
  return (
    <div className="App">
      <CardNavigate.Root route="/">
        <CardNavigate.WithIcon>
          <span>testando</span>
          <FiSettings />
        </CardNavigate.WithIcon>
      </CardNavigate.Root>
      <div className={`w-32 h-32 bg-[${color}]`}>

      </div>
    </div>
  )
}

export default App
