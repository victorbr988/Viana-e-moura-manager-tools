import { FiSettings } from "react-icons/fi"
import { Modal } from "./components/Modal"

function App() {
  return (
    <div className="min-h-screen">
      <Modal.Root title="Adicionar uma ferramenta">
        <Modal.Content>
          <Modal.Label>
            <FiSettings />
            <Modal.Input type="text" placeholder="Adicionar uma ferramenta" />
          </Modal.Label>
        </Modal.Content>
      </Modal.Root>
    </div>
  )
}

export default App
