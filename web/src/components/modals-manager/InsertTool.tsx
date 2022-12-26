import clsx from "clsx";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FiSave, FiTool } from "react-icons/fi";
import { DatabaseContext } from "../../context/Context-provider";
import { ContextDatabaseProps } from "../../context/Database-provider";
import { capitalizeFirstLetter } from "../../utils/capitalizerString";
import { ButtonAdd } from "../Button";
import { Modal } from "../Modal";

interface ModalToolsProps {
  isOpen: boolean;
  setIsOpen(value: boolean): void
}

export function ModalTools({ isOpen, setIsOpen }: ModalToolsProps) {
  const contextState: ContextDatabaseProps = useContext(DatabaseContext)
  const [tool, setTool] = useState<string>("")

  function updateState({ target }: any) {
    setTool(capitalizeFirstLetter(target.value))
  }

  function handleClick() {
    contextState.createTool(tool)
    setTool("")
    setIsOpen(!isOpen)
  }

  return (
    <div className={clsx("absolute justify-center items-center flex w-full h-full flex-1 bg-black/50", {
      "hidden": isOpen === false
    })}>
      <Modal.Root title="Adicionar uma ferramenta">
        <Modal.Content>
          <Modal.Label>
            <FiTool />
            <Modal.Input type="text" onChange={updateState} placeholder="Nome da ferramenta" />
          </Modal.Label>
          <ButtonAdd
            handleClick={ handleClick }
          >
            <FiSave />
            Salvar 
          </ButtonAdd>
          <button type="button" onClick={() => setIsOpen(false)}>Cancelar</button>
        </Modal.Content>
      </Modal.Root>
    </div>
  )
}