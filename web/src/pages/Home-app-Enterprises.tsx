import { Fragment, useContext, useEffect, useState } from "react";
import { FiEdit, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { ButtonAdd } from "../components/Button";
import { CardProduct } from "../components/CardProduct";
import { NoData } from "../components/DefaultComponent";
import { inputGroup } from "../components/Modal";
import { ModalInsertEnterprise } from "../components/modals-manager/InsertEnterprise";
import { ModalUpdateEnterprise } from "../components/modals-manager/UpdateEnterprise";
import { DatabaseContext } from "../context/Context-provider";
import { EnterpriseProps, ToolProps } from "../context/types";
import { capitalizeFirstLetter } from "../utils/capitalizerString";

export function HomeAppEnterprises() {
  const contextState = useContext(DatabaseContext)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [enterpriseData, setEnterprise] = useState<ToolProps>({} as ToolProps)
  const [searchEnterprise, setSearchEnterprise] = useState<string>("")

  const filteredByNameEnterprise: EnterpriseProps[] = contextState.enterprises.filter((enterprise) => enterprise.name.includes(capitalizeFirstLetter(searchEnterprise)))

  useEffect(() => {
    contextState.getEnterprises()
  })

  function handleClickEdit(enterprise: ToolProps) {
    setIsOpenEditModal(!isOpenEditModal)
    setEnterprise(enterprise)
  }

  function handleSearch({ target }: any) {
    setSearchEnterprise(target.value)
  }

  function renderCards() {
    const iterableData: EnterpriseProps[] = filteredByNameEnterprise.length <= 0 ? contextState.enterprises : filteredByNameEnterprise

    if (contextState.enterprises.length <= 0) return <NoData />
    return iterableData.map(enterprise => (
      <CardProduct 
        key={enterprise.id}
        data={enterprise}
      >
        <Fragment>
          <FiEdit 
            className="text-green-500 cursor-pointer"
            onClick={() => handleClickEdit(enterprise)}
          />
          <FiTrash2
            className="text-red-500 cursor-pointer"
            onClick={() => contextState.deleteEnterprise(enterprise.id as number)}
          />
        </Fragment>
      </CardProduct>
    ))
  }

  return (
    <section className="relative w-full flex flex-col">
      <div className="md:p-20 w-full py-20 px-5 flex flex-col gap-10">
        <header>
          <h1 className="text-center text-2xl font-semibold">Etapas de obra</h1>
        </header>

        <section className="flex flex-col w-full gap-2 items-end bg-transparent">
          <inputGroup.Label>
            <FiSearch />
            <inputGroup.Input onChange={handleSearch} placeholder="Buscar por empreendimento" />
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
      <ModalInsertEnterprise 
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
      />
      <ModalUpdateEnterprise
        enterpriseId={enterpriseData.id as number}
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
      />
    </section>
  )
}