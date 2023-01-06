import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle, FiDivide, FiDollarSign, FiSave, FiUserMinus } from "react-icons/fi";
import Select from "react-select";
import { AuthContext, DatabaseContext } from "../../context/Context-provider";
import { ContextDatabaseProps } from "../../context/Database-provider";
import { ContextProps, EnterpriseProps, SupervisorProps, ToolProps } from "../../context/types";
import { SelectOptionsStatus } from "../../utils/selectOptions";
import { ButtonAdd } from "../Button";
import { Modal } from "../Modal";

interface ModalProps {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
  exitId?: number
}

interface OptionsProps {
  value: string,
  label: string,
}

export function ModalUpdateExit({ isOpen, setIsOpen, exitId }: ModalProps) {
  const contextState: ContextDatabaseProps = useContext(DatabaseContext)
  const authContext: ContextProps = useContext(AuthContext)

  const [supervisor, setSupervisor] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const [requester, setRequester] = useState<string>("")
  const [enterpriseName, setEnterpriseName] = useState<string>("")
  const [account, setAccount] = useState<string>("")
  const [subAccount, setSubAccount] = useState<string>("")
  const [tool, setTool] = useState<string>("")
  const [requestDate, setRequestDate] = useState<string>("")
  const [responseDate, setResponseDate] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(0)

  useEffect(() => {
    contextState.getTools()
  }, [])

  useEffect(() => {
    contextState.getSupervisors()
  }, [])

  useEffect(() => {
    contextState.getEnterprises()
  }, [])

  const optionsTools: OptionsProps[] = [{ value: "Ferramenta", label: "Ferramenta"}] 
  const optionsSupervisors: OptionsProps[] = [{ value: "Supervisor", label: "Supervisor"}]
  const optionsEnterprises: OptionsProps[] = [{ value: "Empreendimento", label: "Empreendimento"}]
  
  contextState.enterprises.forEach((enterprise: EnterpriseProps) => {
    optionsEnterprises.push({
      value: enterprise.name,
      label: enterprise.name
    })
  })
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

  function updateEnterprise(option: any) {
    setEnterpriseName(option.value)
  }

  function updateStatus(option: any) {
    setStatus(option.value)
  }

  function updateTool(option: any) {
    setTool(option.value)
  }

  function updateRequestDate({ target }: any) {
    setRequestDate(target.value)
  }

  function updateResponseDate({ target }: any) {
    setResponseDate(target.value)
  }

  function updateQuantity({ target }: any) {
    setQuantity(Number(target.value))
  }

  function updateRequester({ target }: any) {
    setRequester(target.value)
  }

  function updateAccount({ target }: any) {
    setAccount(target.value)
  }

  function updateSubAccount({ target }: any) {
    setSubAccount(target.value)
  }

  function handleClick() {
    const body = {
      status,
      requester,
      supervisorName: supervisor,
      toolName: tool,
      enterpriseName,
      responseAt: new Date(responseDate),
      requestedAt: new Date(requestDate),
      quantity,
      account,
      subAccount,
      userId: authContext.userLogged!.uid,
    }
    contextState.updateExit({id: exitId, ...body})
    setIsOpen(!isOpen)
  }

  return (
    <div className={clsx("absolute justify-center items-center flex w-full h-full flex-1 bg-black/50", {
      "hidden": isOpen === false
    })}>
      <Modal.Root title="Adicionar uma Saída">
        <h1 className="text-gray-600 font-medium">Identificador da saída: {exitId}</h1>
        <Modal.Content>
          <Modal.Label>
            <span>Solicitado em:</span>
            <Modal.Input type="datetime-local" onChange={updateRequestDate} />
          </Modal.Label>
          <Modal.Label>
            <span>Adicionado em:</span>
            <Modal.Input type="datetime-local" onChange={updateResponseDate} />
          </Modal.Label>
          <Select id="tools" defaultValue={optionsTools[0]} options={optionsTools} onChange={updateTool} />
          <Select id="supervisor" defaultValue={optionsSupervisors[0]} options={optionsSupervisors} onChange={updateSupervisor} />
          <Select id="status" defaultValue={SelectOptionsStatus[0]} options={SelectOptionsStatus} onChange={updateStatus} />
          <Select id="enterprise" defaultValue={optionsEnterprises[0]} options={optionsEnterprises} onChange={updateEnterprise} />
          <Modal.Label>
            <FiUserMinus />
            <Modal.Input type="text" placeholder="Solicitante" onChange={updateRequester} />
          </Modal.Label>
          <Modal.Label>
            <FiUserMinus />
            <Modal.Input type="text" placeholder="Conta" onChange={updateAccount} />
          </Modal.Label>
          <Modal.Label>
            <FiUserMinus />
            <Modal.Input type="text" placeholder="Sub-conta" onChange={updateSubAccount} />
          </Modal.Label>
          <Modal.Label>
            <FiDivide />
            <Modal.Input type="number" onChange={updateQuantity} placeholder="Quantidade" />
          </Modal.Label>
        </Modal.Content>
        <ButtonAdd
            handleClick={handleClick}
          >
            <FiSave />
            Salvar
          </ButtonAdd>
          <button className="bg-gray-300 p-2 rounded" type="button" onClick={() => setIsOpen(false)}>Cancelar</button>
      </Modal.Root>
    </div>
  )
}