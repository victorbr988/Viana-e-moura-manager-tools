import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { FiDivide, FiDollarSign, FiSave } from "react-icons/fi";
import Select from "react-select";
import { AuthContext, DatabaseContext } from "../../context/Context-provider";
import { ContextDatabaseProps } from "../../context/Database-provider";
import { ContextProps, SupervisorProps, ToolProps } from "../../context/types";
import { ButtonAdd } from "../Button";
import { Modal } from "../Modal";

interface ModalProps {
  isOpen: boolean;
  setIsOpen(value: boolean): void
  entranceId: number
}

interface OptionsProps {
  value: string,
  label: string,
}

export function ModalUpdateEntrance({ isOpen, setIsOpen, entranceId }: ModalProps) {
  const contextState: ContextDatabaseProps = useContext(DatabaseContext)
  const authContext: ContextProps = useContext(AuthContext)

  const [supervisor, setSupervisor] = useState<string>("")
  const [tool, setTool] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)

  useEffect(() => {
    contextState.getTools()
  }, [])

  useEffect(() => {
    contextState.getSupervisors()
  }, [])

  const optionsTools: OptionsProps[] = [{ value: "Ferramenta", label: "Ferramenta"}] 
  const optionsSupervisors: OptionsProps[] = [{ value: "Supervisor", label: "Supervisor"}] 

  contextState.tools.forEach((tool: ToolProps) => {
    optionsTools.push({
      value: tool.name,
      label: tool.name
    })
  })

  contextState.supervisors.forEach((supervisor: SupervisorProps) => {
    optionsSupervisors.push({
      value: supervisor.name,
      label: supervisor.name
    })
  })
  

  function updateSupervisor(option: any) {
    setSupervisor(option.value)
  }

  function updateTool(option: any) {
    setTool(option.value)
  }

  function updateDate({ target }: any) {
    setDate(target.value)
  }

  function updateQuantity({ target }: any) {
    setQuantity(Number(target.value))
  }

  function updatePrice({ target }: any) {
    setPrice(Number(target.value))
  }

  function handleClick() {
    const body = {
      supervisorName: supervisor,
      toolName: tool,
      addedAt: new Date(date),
      unitPrice: price,
      quantity,
      userId: authContext.userLogged!.uid,
    }
    contextState.updateEntrance({id: entranceId, ...body})
    setIsOpen(!isOpen)
  }

  return (
    <div className={clsx("absolute justify-center items-center flex w-full h-full flex-1 bg-black/50", {
      "hidden": isOpen === false
    })}>
      <Modal.Root title="Adicionar uma Entrada">
        <Modal.Content>
        <h1 className="text-gray-600 font-medium">Identificador do empreendimento: {entranceId}</h1>
          <Modal.Label>
            <Modal.Input type="datetime-local" onChange={updateDate} placeholder="Data da entrada" />
          </Modal.Label>
          <Modal.Label>
            <FiDivide />
            <Modal.Input type="number" onChange={updateQuantity} placeholder="Quantidade" />
          </Modal.Label>
          <Modal.Label>
            <FiDollarSign />
            <Modal.Input type="number" onChange={updatePrice} placeholder="Valor unitário" />
          </Modal.Label>
          <Select id="sector" defaultValue={optionsTools[0]} options={optionsTools} onChange={updateTool} />
          <Select id="sector" defaultValue={optionsSupervisors[0]} options={optionsSupervisors} onChange={updateSupervisor} />
          <ButtonAdd
            handleClick={ handleClick }
          >
            <FiSave />  
            Salvar
          </ButtonAdd>
          <button className="bg-gray-300 p-2 rounded" type="button" onClick={() => setIsOpen(false)}>Cancelar</button>
        </Modal.Content>
      </Modal.Root>
    </div>
  )
}