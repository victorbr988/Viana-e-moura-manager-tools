import { Fragment } from "react";
import { FiEdit, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { ButtonAdd } from "../components/Button";
import { CardProduct } from "../components/CardProduct";
import { NoData } from "../components/DefaultComponent";
import { inputGroup } from "../components/Modal";

export function HomeAppSupervisors() {
  const mockData: any[] = []

  return (
    <section className="p-20 w-full flex flex-col gap-10">
      <header>
        <h1 className="text-center text-2xl font-semibold">Supervisores responsáveis</h1>
      </header>

      <section className="flex flex-col w-full gap-2 items-end bg-transparent">
        <inputGroup.Label>
          <FiSearch />
          <inputGroup.Input placeholder="Buscar por um supervisor" />
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
          : mockData.map(tool => (
            <CardProduct 
              key={tool.id}
              data={tool}
            >
              <Fragment>
                <FiEdit className="text-green-500 cursor-pointer" />
                <FiTrash2 className="text-red-500 cursor-pointer" />
              </Fragment>
            </CardProduct>
          ))
        }
      </main>
    </section>
  )
}