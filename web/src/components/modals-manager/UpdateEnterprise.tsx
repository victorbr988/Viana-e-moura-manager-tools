import clsx from "clsx";
import { useContext, useState } from "react";
import { FiGrid, FiSave } from "react-icons/fi";
import { DatabaseContext } from "../../context/Context-provider";
import { ContextDatabaseProps } from "../../context/Database-provider";
import { capitalizeFirstLetter } from "../../utils/capitalizerString";
import { ButtonAdd } from "../Button";
import { Modal } from "../Modal";

interface ModalToolsProps {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
  enterpriseId: number
}

export function ModalUpdateEnterprise({ isOpen, setIsOpen, enterpriseId }: ModalToolsProps) {
  const contextState: ContextDatabaseProps = useContext(DatabaseContext)
  const [enterprise, setEnterprise] = useState<string>("")

  function updateState({ target }: any) {
    setEnterprise(capitalizeFirstLetter(target.value))
  }

  function handleClick() {
    contextState.updateEnterprise({id: enterpriseId, name: enterprise})
    // setEnterprise("")
    setIsOpen(!isOpen)
  }

  return (
    <div className={clsx("absolute justify-center items-center flex w-full h-full flex-1 bg-black/50", {
      "hidden": isOpen === false
    })}>
      <Modal.Root title="Adicionar uma ferramenta">
        <Modal.Content>
          <h1 className="text-gray-600 font-medium">Identificador do empreendimento: {enterpriseId}</h1>
          <Modal.Label>
            <FiGrid />
            <Modal.Input type="text" onChange={updateState} placeholder="Nome do empreendimento" />
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