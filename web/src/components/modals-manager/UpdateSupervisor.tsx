import clsx from "clsx";
import { useContext, useState } from "react";
import { FiSave, FiUser } from "react-icons/fi";
import Select from "react-select";
import { DatabaseContext } from "../../context/Context-provider";
import { ContextDatabaseProps } from "../../context/Database-provider";
import { capitalizeFirstLetter } from "../../utils/capitalizerString";
import { SelectOptions } from "../../utils/selectOptions";
import { ButtonAdd } from "../Button";
import { Modal } from "../Modal";

interface ModalProps {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
  supervisorId: number
}

export function ModalUpdateSupervisor({ isOpen, setIsOpen, supervisorId }: ModalProps) {
  const contextState: ContextDatabaseProps = useContext(DatabaseContext)
  const [nameSupervisor, setNameSupervisor] = useState<string>("")
  const [sectorSupervisor, setSectorSupervisor] = useState<string>("")

  function updateName({ target }: any) {
    setNameSupervisor(capitalizeFirstLetter(target.value))
  }

  function updateSector(option: any) {
    setSectorSupervisor(capitalizeFirstLetter(option.value))
  }

  function handleClick() {
    const body = {
      id: supervisorId, 
      name: nameSupervisor,
      sector: sectorSupervisor
    }
    contextState.updateSupervisor(body)
    // setEnterprise("")
    setIsOpen(!isOpen)
  }

  return (
    <div className={clsx("absolute justify-center items-center flex w-full h-full flex-1 bg-black/50", {
      "hidden": isOpen === false
    })}>
      <Modal.Root title="Editar um supervisor">
        <Modal.Content>
          <h1 className="text-gray-600 font-medium">Identificador do empreendimento: {supervisorId}</h1>
          <Modal.Label>
            <FiUser />
            <Modal.Input type="text" onChange={updateName} placeholder="Nome do supervisor" />
          </Modal.Label>
          <Select id="sector" defaultValue={SelectOptions[0]} options={SelectOptions} onChange={updateSector} />
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