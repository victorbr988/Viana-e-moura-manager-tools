import { useContext, useEffect } from "react";
import { FiActivity, FiCalendar, FiDatabase, FiDivide, FiGrid, FiTool, FiUserMinus } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import { DatabaseContext } from "../../context/Context-provider";
import { ExitProps } from "../../context/types";
import { capitalizeFirstLetter } from "../../utils/capitalizerString";
import { dateFormat } from "../../utils/dateFormat";
import { NoData } from "../DefaultComponent";
import { Modal } from "../Modal";


interface RenderIfExistDataProps {
  data: ExitProps | undefined
}

function RenderIfExistData({data}: RenderIfExistDataProps) {
  if (data) {
    return (
      <Modal.Root title="Detalhes da saída">
        <Modal.Content>
          <Modal.Label>
            <FiActivity />
            <p>{`Status: ${data.status}`}</p>
          </Modal.Label>
          <Modal.Label>
            <FiCalendar />
            <p>{`Solicitado: ${dateFormat(new Date(data.requestedAt))}`}</p>
          </Modal.Label>
          <Modal.Label>
          <FiCalendar />
            <p>{`Adicionado: ${dateFormat(new Date(data.responseAt))}`}</p>
          </Modal.Label>
          <Modal.Label>
            <FiUserMinus />
            <p>{`Solicitado por: ${capitalizeFirstLetter(data.requester)}`}</p>
          </Modal.Label>
          <Modal.Label>
            <FiGrid />
            <p>{`Empreendimento: ${data.enterpriseName}`}</p>
          </Modal.Label>
          <Modal.Label>
            <FiDatabase />
            <p>{`Conta: ${data.account}`}</p>
          </Modal.Label>
          <Modal.Label>
            <FiDatabase />
            <p>{`Sub-conta: ${data.subAccount}`}</p>
          </Modal.Label>
          <Modal.Label>
            <FiDivide />
            <p>{`Quantidade: ${data.quantity}`}</p>
          </Modal.Label>
          <Modal.Label>
            <FiTool />
            <p>{`Ferramenta: ${data.toolName}`}</p>
          </Modal.Label>
        </Modal.Content>
        <NavLink className="text-center bg-blue-500 p-2 rounded-lg text-white" to="/home-app/exit">Voltar</NavLink>
    </Modal.Root>
    )
    
  }
  return <NoData />
}

export function ModalDetailsExit() {
  const contextState = useContext(DatabaseContext)

  useEffect(() => {
    contextState.getExits()
  }, [])

  const location = useLocation()

  const paramId: number = Number(location.pathname.split('/').at(-1))
  const data = contextState.exits.find(exit => exit.id === paramId)

  return (
    <div className="w-full flex justify-center items-center"> 
      <RenderIfExistData data={data} />
    </div>
  )
}