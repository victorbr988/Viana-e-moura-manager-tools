import { Fragment, useContext, useEffect, useState } from "react";
import { FiEdit, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { ButtonAdd } from "../components/Button";
import { CardProduct } from "../components/CardProduct";
import { NoData } from "../components/DefaultComponent";
import { inputGroup } from "../components/Modal";
import { ModalInsertSupervisor } from "../components/modals-manager/InsertSupervisor";
import { ModalUpdateSupervisor } from "../components/modals-manager/UpdateSupervisor";
import { DatabaseContext } from "../context/Context-provider";
import { SupervisorProps } from "../context/types";
import { capitalizeFirstLetter } from "../utils/capitalizerString";

export function HomeAppSupervisors() {
  const contextState = useContext(DatabaseContext)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [supervisor, setSupervisor] = useState<SupervisorProps>({} as SupervisorProps)
  const [searchTool, setSearchTool] = useState<string>("")

  const filteredByNameSupervisor: SupervisorProps[] = contextState.supervisors.filter((tool) => tool.name.includes(capitalizeFirstLetter(searchTool)))

  function handleClickEdit(supervisors: SupervisorProps) {
    setIsOpenEditModal(!isOpenEditModal)
    setSupervisor(supervisors)
  }

  function handleSearch({ target }: any) {
    setSearchTool(target.value)
  }

  useEffect(() => {
    contextState.getSupervisors()
  }, [])
  console.log(contextState.supervisors)

  function renderCards() {
    const iterableData: SupervisorProps[] = filteredByNameSupervisor.length <= 0 ? contextState.supervisors : filteredByNameSupervisor

    if (contextState.supervisors.length <= 0) return <NoData />
    
    return iterableData.map(supervisor => (
      <CardProduct 
        key={supervisor.id}
        data={supervisor}
      >
        <Fragment>
          <FiEdit 
            className="text-green-500 cursor-pointer"
            onClick={() => handleClickEdit(supervisor)}
          />
          <FiTrash2
            className="text-red-500 cursor-pointer"
            onClick={() => contextState.deleteSupervisor(supervisor.id as number)}
          />
        </Fragment>
      </CardProduct>
    ))
  }

  return (
    <section className="relative w-full flex flex-col">
      <div className="md:p-20 w-full py-20 px-5 flex flex-col gap-10">
        <header>
          <h1 className="text-center text-2xl font-semibold">Supervisores responsáveis</h1>
        </header>

        <section className="flex flex-col w-full gap-2 items-end bg-transparent">
          <inputGroup.Label>
            <FiSearch />
            <inputGroup.Input onChange={handleSearch} placeholder="Buscar por um supervisor" />
          </inputGroup.Label>
          <section>
            <ButtonAdd
              handleClick={() => setIsOpenModal(true)}
            >
              <FiPlus />
              <span className="px-1">Adicionar</span>
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
      <ModalInsertSupervisor
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
      />
      <ModalUpdateSupervisor
        supervisorId={supervisor.id as number}
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
      />
    </section>
  )
}