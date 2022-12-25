import { Fragment } from "react";
import { FiEdit, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { ButtonAdd } from "../components/Button";
import { CardMovimentation } from "../components/CardMovimentation";
import { NoData } from "../components/DefaultComponent";
import { inputGroup } from "../components/Modal";

export function HomeAppExit() {
  const mockData: any[] = [
    {
      id: 3,
      status: "Pendente",
      requester: "Victor",
      toolName: "Broca",
      requestedAt: new Date(Date.now()),
      responseAt: new Date(Date.now() + 1),
      enterpriseName: "Xique-xique etapa(3)",
      quantity: 4,
      account: "Acc",
      subAccount: "Acv"
    }
  ]

  return (
    <section className="p-20 w-full flex flex-col gap-10">
      <header>
        <h1 className="text-center text-2xl font-semibold">Saída de ferramentas</h1>
      </header>

      <section className="flex flex-col w-full gap-2 items-end bg-transparent">
        <inputGroup.Label>
          <FiSearch />
          <inputGroup.Input type="text" placeholder="Buscar saída por nome de ferramenta" />
        </inputGroup.Label>
        <section>
          <ButtonAdd >
            <FiPlus />
            Adicionar
          </ButtonAdd>
        </section>
      </section>

      <main className="flex flex-col gap-3 h-96 overflow-auto h-">
        {
          mockData.length <= 0 ? (<NoData />)
          : mockData.map(exit => (
            <CardMovimentation 
              variant="exit"
              key={exit.id}
              data={exit}
            >
              <Fragment>
                <FiEdit className="text-green-500 cursor-pointer" />
                <FiTrash2 className="text-red-500 cursor-pointer" />
              </Fragment>
            </CardMovimentation>
          ))
        }
      </main>
    </section>
  )
}