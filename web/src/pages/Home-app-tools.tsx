import { Fragment, useContext, useState } from "react";
import { FiEdit, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { ButtonAdd } from "../components/Button";
import { CardProduct } from "../components/CardProduct";
import { NoData } from "../components/DefaultComponent";
import { inputGroup } from "../components/Modal";
import { ModalTools } from "../components/modals-manager/InsertTool";
import { ModalUpdateTool } from "../components/modals-manager/UpdateTool";
import { DatabaseContext } from "../context/Context-provider";
import { ToolProps } from "../context/types";
import { capitalizeFirstLetter } from "../utils/capitalizerString";

export function HomeAppTools() {
  const contextState = useContext(DatabaseContext)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [tool, setTool] = useState<ToolProps>({} as ToolProps)
  const [searchTool, setSearchTool] = useState<string>("")

  const filteredByNameTool: ToolProps[] = contextState.tools.filter((tool) => tool.name.includes(capitalizeFirstLetter(searchTool)))

  function handleClickEdit(tool: ToolProps) {
    setIsOpenEditModal(!isOpenEditModal)
    setTool(tool)
  }

  function handleSearch({ target }: any) {
    setSearchTool(target.value)
  }

  function renderCards() {
    const iterableData: ToolProps[] = filteredByNameTool.length <= 0 ? contextState.tools : filteredByNameTool

    if (contextState.tools.length <= 0) return <NoData />
    
    return iterableData.map(tool => (
      <CardProduct 
        key={tool.id}
        data={tool}
      >
        <Fragment>
          <FiEdit 
            className="text-green-500 cursor-pointer"
            onClick={() => handleClickEdit(tool)}
          />
          <FiTrash2
            className="text-red-500 cursor-pointer"
            onClick={() => contextState.deleteTool(tool.id as number)}
          />
        </Fragment>
      </CardProduct>
    ))
  }

  return (
    <section className="relative w-full flex flex-col">
      <div className="p-20 flex flex-col gap-10">
        <header>
          <h1 className="text-center text-2xl font-semibold">Ferramentas de infraestrutura</h1>
        </header>

        <section className="flex flex-col w-full gap-2 items-end bg-transparent">
          <inputGroup.Label>
            <FiSearch />
            <inputGroup.Input onChange={handleSearch} placeholder="Buscar por uma ferramenta" />
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
              renderCards()
            }
          </div>
        </main>
      </div>
      <ModalTools 
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
      />
      <ModalUpdateTool
        toolId={tool.id as number}
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
      />
    </section>
  )
}