import { Fragment, useContext, useEffect, useState } from "react";
import { FiEdit, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { ButtonAdd } from "../components/Button";
import { CardMovimentation } from "../components/CardMovimentation";
import { NoData } from "../components/DefaultComponent";
import { inputGroup } from "../components/Modal";
import { ModalInsertEntrance } from "../components/modals-manager/InsertEntrance";
import { ModalUpdateEntrance } from "../components/modals-manager/UpdateEntrance";
import { AuthContext, DatabaseContext } from "../context/Context-provider";
import { EntranceProps } from "../context/types";
import { capitalizeFirstLetter } from "../utils/capitalizerString";

export function HomeAppEntrances() {
  const contextState = useContext(DatabaseContext)
  const authContext = useContext(AuthContext)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [entrance, setEntrance] = useState<EntranceProps>({} as EntranceProps)
  const [searchEntrance, setSearchEntrance] = useState<string>("")
  const userCredencial = authContext.userLogged

  const entranceByUserId = contextState.entrances.filter((entranceObj: EntranceProps) => entranceObj.userId === userCredencial?.uid)
  const filteredByNameEntrance: EntranceProps[] = entranceByUserId.filter((entrance) => entrance.toolName.includes(capitalizeFirstLetter(searchEntrance)))

  function handleClickEdit(entrances: EntranceProps) {
    setIsOpenEditModal(!isOpenEditModal)
    setEntrance(entrances)
  }

  function handleSearch({ target }: any) {
    setSearchEntrance(target.value)
  }

  useEffect(() => {
    contextState.getEntrances()
  }, [])

  function renderCards() {
    const iterableData: EntranceProps[] = filteredByNameEntrance.length <= 0 ? entranceByUserId : filteredByNameEntrance

    if (entranceByUserId.length <= 0) return <NoData />
    
    return iterableData.map(entrance => (
      <CardMovimentation 
        variant="entrance"
        key={entrance.id}
        data={entrance}
      >
        <Fragment>
          <FiEdit 
            className="text-green-500 cursor-pointer"
            onClick={() => handleClickEdit(entrance)}
          />
          <FiTrash2
            className="text-red-500 cursor-pointer"
            onClick={() => contextState.deleteEntrance(entrance.id as number)}
          />
        </Fragment>
      </CardMovimentation>
    ))
  }

  return (
    <section className="relative w-full flex flex-col">
      <div className="md:p-20 w-full py-20 px-5 flex flex-col gap-10">
        <header>
          <h1 className="text-center text-2xl font-semibold">Entradas de ferramentas</h1>
        </header>

        <section className="flex flex-col w-full gap-2 items-end bg-transparent">
          <inputGroup.Label>
            <FiSearch />
            <inputGroup.Input onChange={handleSearch} placeholder="Buscar uma entrada de ferramenta" />
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
      <ModalInsertEntrance
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
      />
      <ModalUpdateEntrance
        entranceId={entrance.id as number}
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
      />
    </section>
  )
}