import { Fragment, useContext, useState } from "react";
import { FiEdit, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { ButtonAdd } from "../components/Button";
import { CardProduct } from "../components/CardProduct";
import { NoData } from "../components/DefaultComponent";
import { inputGroup } from "../components/Modal";
import { ModalTools } from "../components/modals-manager/Tools";
import { DatabaseContext } from "../context/Context-provider";

export function HomeAppTools() {
  const contextState = useContext(DatabaseContext)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  console.log("Chamou o homeApp")

  return (
    <section className="relative w-full flex flex-col">
      <div className="p-20 flex flex-col gap-10">
        <header>
          <h1 className="text-center text-2xl font-semibold">Ferramentas de infraestrutura</h1>
        </header>

        <section className="flex flex-col w-full gap-2 items-end bg-transparent">
          <inputGroup.Label>
            <FiSearch />
            <inputGroup.Input placeholder="Buscar por uma ferramenta" />
          </inputGroup.Label>
          <section>
            <ButtonAdd
              handleClick={() => setIsOpenModal(true)}
            >
              <FiPlus />
              Adicionar
            </ButtonAdd>
          </section>
        </section>

        <main>
          <h2 className="text-gray-600 mb-1">De A-Z</h2>
          <div className="h-96 flex flex-col gap-3 overflow-auto">
            {
              contextState.tools.length <= 0 ? (<NoData />)
              : contextState.tools.map(tool => (
                <CardProduct 
                  key={tool.id}
                  data={tool}
                >
                  <Fragment>
                    <FiEdit 
                      className="text-green-500 cursor-pointer"
                    />
                    <FiTrash2
                      className="text-red-500 cursor-pointer"
                      onClick={() => contextState.deleteTool(tool.id as number)}
                    />
                  </Fragment>
                </CardProduct>
              ))
            }
          </div>
        </main>
      </div>
      <ModalTools 
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
      />
    </section>
  )
}