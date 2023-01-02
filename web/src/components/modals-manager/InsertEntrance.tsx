import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { FiDivide, FiDollarSign, FiSave, FiUser } from "react-icons/fi";
import Select from "react-select";
import { AuthContext, DatabaseContext } from "../../context/Context-provider";
import { ContextDatabaseProps } from "../../context/Database-provider";
import { ContextProps, ToolProps } from "../../context/types";
import { dateFormat } from "../../utils/dateFormat";
import { toBRLCurrency } from "../../utils/priceFormat";
import { ButtonAdd } from "../Button";
import { Modal } from "../Modal";

interface ModalProps {
  isOpen: boolean;
  setIsOpen(value: boolean): void
}

export function ModalInsertEntrance({ isOpen, setIsOpen }: ModalProps) {
  const contextState: ContextDatabaseProps = useContext(DatabaseContext)
  const authContext: ContextProps = useContext(AuthContext)

  const [supervisor, setSupervisor] = useState<string>("")
  const [tool, setTool] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)

  const optionsTools: any[] = [{ value: "Ferramenta", label: "Ferramenta"}] 
  const optionsSupervisors: any[] = [{ value: "Supervisor", label: "Supervisor"}] 

  contextState.tools.map((tool: ToolProps) => {
    optionsTools.push({
      value: tool.name,
      label: tool.name
    })
  })

  contextState.supervisors.map((tool: ToolProps) => {
    optionsSupervisors.push({
      value: tool.name,
      label: tool.name
    })
  })
  

  function updateSupervisor(option: any) {
    setSupervisor(option.value)
  }

  function updateDate({ target }: any) {
    setDate(target.value)
  }

  function updateTool(option: any) {
    setTool(option.value)
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
      userId: authContext.userLogged!.uid
    }
    contextState.createEntrance(body)
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    contextState.getTools()
  }, [])

  useEffect(() => {
    contextState.getSupervisors()
  }, [])

  return (
    <div className={clsx("absolute justify-center items-center flex w-full h-full flex-1 bg-black/50", {
      "hidden": isOpen === false
    })}>
      <Modal.Root title="Adicionar uma Entrada">
        <Modal.Content>
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
          <button type="button" onClick={() => setIsOpen(false)}>Cancelar</button>
        </Modal.Content>
      </Modal.Root>
    </div>
  )
}