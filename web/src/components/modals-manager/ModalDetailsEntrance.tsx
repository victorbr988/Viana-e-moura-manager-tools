import { FiCalendar, FiDivide, FiDollarSign, FiTool, FiUser } from "react-icons/fi";
import { dateFormat } from "../../utils/dateFormat";
import { Modal } from "../Modal";
import { toBRLCurrency } from "../../utils/priceFormat";
import { NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DatabaseContext } from "../../context/Context-provider";
import { EntranceProps } from "../../context/types";
import { NoData } from "../DefaultComponent";

interface RenderIfExistDataProps {
  data: EntranceProps | undefined
}

function RenderIfExistData({ data }: RenderIfExistDataProps) {
  if (data) {
    return (
      <Modal.Root title={`Identificador da entrada: ${data.id}`}>
        <Modal.Content>
          <Modal.Label>
            <FiCalendar />
            <p>{`Entrada: ${dateFormat(new Date(data.addedAt))}`}</p>
          </Modal.Label>
          <Modal.Label>
            <FiTool />
            <p>{`Ferramenta: ${data.toolName}`}</p>
          </Modal.Label>
          <Modal.Label>
            <FiUser />
            <p>{`Supervisor: ${data.supervisorName}`}</p>
          </Modal.Label>
          <Modal.Label>
            <FiDivide />
            <p>{`Quantidade: ${data.quantity}`}</p>
          </Modal.Label>
          <Modal.Label>
            <FiDollarSign />
            <p>{`Preço por un: ${toBRLCurrency(data.unitPrice || 0)}`}</p>
          </Modal.Label>
          <NavLink className="text-center bg-blue-500 p-2 rounded-lg text-white" to="/home-app/entrance">Voltar</NavLink>
        </Modal.Content>
      </Modal.Root>
    )
  }
  return <NoData />
}

export function ModalDetailsEntrance() {
  useEffect(() => {
    contextState.getEntrances()
  }, [])

  const contextState = useContext(DatabaseContext)
  const location = useLocation()

  const paramId: number = Number(location.pathname.split('/').at(-1))
  const data = contextState.entrances.find(entrance => entrance.id === paramId)
  console.log(contextState.entrances)
  

  return (
    <div className="w-full flex justify-center items-center"> 
      <RenderIfExistData data={data} />
    </div>
  )
}