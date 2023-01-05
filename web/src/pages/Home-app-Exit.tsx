import { Fragment, useContext, useEffect, useState } from "react";
import { FiEdit, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { ButtonAdd } from "../components/Button";
import { CardMovimentation } from "../components/CardMovimentation";
import { NoData } from "../components/DefaultComponent";
import { inputGroup } from "../components/Modal";
import { ModalInsertExit } from "../components/modals-manager/InsertExit";
import { AuthContext, DatabaseContext } from "../context/Context-provider";
import { ExitProps } from "../context/types";
import { capitalizeFirstLetter } from "../utils/capitalizerString";

export function HomeAppExit() {
  const contextState = useContext(DatabaseContext)
  const authContext = useContext(AuthContext)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [exit, setExit] = useState<ExitProps>({} as ExitProps)
  const [searchExit, setSearchExit] = useState<string>("")
  const userCredencial = authContext.userLogged

  const exitByUserId = contextState.exits.filter((exitObj: ExitProps) => exitObj.userId === userCredencial?.uid)
  const filteredByNameExit: ExitProps[] = exitByUserId.filter((exit) => exit.toolName.includes(capitalizeFirstLetter(searchExit)))

  function handleClickEdit(entrances: ExitProps) {
    setIsOpenEditModal(!isOpenEditModal)
    setExit(entrances)
  }

  function handleSearch({ target }: any) {
    setSearchExit(target.value)
  }

  useEffect(() => {
    contextState.getExits()
  })

  function renderCards() {
    const iterableData: ExitProps[] = filteredByNameExit.length <= 0 ? exitByUserId : filteredByNameExit

    if (exitByUserId.length <= 0) return <NoData />
    
    return iterableData.map(exit => (
      <CardMovimentation 
        variant="exit"
        key={exit.id}
        data={exit}
      >
        <Fragment>
          <FiEdit 
            className="text-green-500 cursor-pointer"
            onClick={() => handleClickEdit(exit)}
          />
          <FiTrash2
            className="text-red-500 cursor-pointer"
            onClick={() => contextState.deleteEntrance(exit.id as number)}
          />
        </Fragment>
      </CardMovimentation>
    ))
  }

  return (
    <section className="relative w-full flex flex-col">
      <div className="md:p-20 w-full py-20 px-5 flex flex-col gap-10">
        <header>
          <h1 className="text-center text-2xl font-semibold">Saídas de ferramentas</h1>
        </header>

        <section className="flex flex-col w-full gap-2 items-end bg-transparent">
          <inputGroup.Label>
            <FiSearch />
            <inputGroup.Input onChange={handleSearch} placeholder="Buscar uma saída de ferramenta" />
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
      <ModalInsertExit
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
      />
      {/* <ModalUpdateEntrance
        entranceId={entrance.id as number}
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
      /> */}
    </section>
  )
}