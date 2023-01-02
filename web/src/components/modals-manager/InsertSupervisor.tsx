import clsx from "clsx";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FiClipboard, FiSave, FiUser } from "react-icons/fi";
import { icons } from "react-icons/lib";
import Select from "react-select";
import { DatabaseContext } from "../../context/Context-provider";
import { ContextDatabaseProps } from "../../context/Database-provider";
import { capitalizeFirstLetter } from "../../utils/capitalizerString";
import { SelectOptions } from "../../utils/selectOptions";
import { ButtonAdd } from "../Button";
import { Modal } from "../Modal";

interface ModalProps {
  isOpen: boolean;
  setIsOpen(value: boolean): void
}

export function ModalInsertSupervisor({ isOpen, setIsOpen }: ModalProps) {
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
    if (sectorSupervisor === SelectOptions[0].value) {
      return toast.error("É necessário preencher um setor")
    } else {
      const body = {
        name: nameSupervisor,
        sector: sectorSupervisor
      }
      console.log(body)
      contextState.createSupervisor(body)
      setIsOpen(!isOpen)
    }
    
  }

  return (
    <div className={clsx("absolute justify-center items-center flex w-full h-full flex-1 bg-black/50", {
      "hidden": isOpen === false
    })}>
      <Modal.Root title="Adicionar um supervisor">
        <Modal.Content>
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