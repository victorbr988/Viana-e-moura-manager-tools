import { useContext, useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { AuthContext, DatabaseContext } from "../context/Context-provider";
import { ExitProps } from "../context/types";
import { createOptions, createSeries } from "../utils/chartConfig";
import { dateFormat } from "../utils/dateFormat";
import useWindowDimensions from "../utils/hooks";

export function Chart() {
  const contextState = useContext(DatabaseContext)
  const authContextState = useContext(AuthContext);
  const [filteredByDate, setFilteredByDate] = useState<string>("")
  const [filteredBySecondDate, setFilteredBySecondDate] = useState<string>("")
  const { width } = useWindowDimensions();
  console.log(width / 2)

  useEffect(() => {
    contextState.getEntrances()
    contextState.getExits()
  }, [])

  function setFilterDate({ target }: any) {
    setFilteredByDate(target.value)
  }

  function setFilterSecondDate({ target }: any) {
    setFilteredBySecondDate(target.value)
  }

  const dataList: string[] = []
  const datalistExit: string[] = []
  const entrancesQuantity: number[] = []
  const exitsQuantity: number[] = []

  // Dados do gráfico de entradas
  
  const filteredDate = contextState.entrances.filter((entrance) => {
    const ONE_HOUR = 1000 * 60 * 60
    const initialDate = new Date(filteredByDate).getTime() + ONE_HOUR * 3 + ONE_HOUR * 24
    const entranceDate = new Date(entrance.addedAt).getTime() - ONE_HOUR * 3

    return entranceDate <= initialDate
  })

  const iterableDataEntrance = filteredDate.length === 0 ? contextState.entrances : filteredDate
  
  iterableDataEntrance.forEach((entrance) => {
    if (entrance.userId === authContextState.userLogged?.uid) {
      dataList.push(`${entrance.toolName} ${dateFormat(new Date(entrance.addedAt))}`)
      entrancesQuantity.push(entrance.quantity)
    }
  })

  // Dados do gráfico de saída

  const filteredDateExits = contextState.exits.filter((exit) => {
    const ONE_HOUR = 1000 * 60 * 60
    const initialDate = new Date(filteredBySecondDate).getTime() + ONE_HOUR * 3 + ONE_HOUR * 24
    const exitDate = new Date(exit.responseAt).getTime() - ONE_HOUR * 3

    return exitDate <= initialDate
  })

  const iterableDataExtit = filteredDateExits.length === 0 ? contextState.exits : filteredDateExits
  
  iterableDataExtit.forEach((exit: ExitProps) => {
    if (exit.userId === authContextState.userLogged?.uid) {
      datalistExit.push(`${exit.toolName} ${dateFormat(new Date(exit.responseAt))} ${exit.status}`)
      exitsQuantity.push(exit.quantity)
    }
  })

  return (
    <div className="flex flex-col gap-5 p-20">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <label className="flex gap-2 focus-within:border-[#0066FF] border-2 border-gray-300 rounded items-center w-full p-2">
            Até:
            <input type="date" onChange={setFilterDate} className="flex-1 bg-transparent outline-none" />
          </label>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-xl">Entradas</h1>
          <ApexCharts 
            options={createOptions<typeof dataList>(dataList)}
            series={createSeries<typeof entrancesQuantity>(entrancesQuantity, "Entradas")}
            width={width / 2}
            height={400}
            type="bar"
          />
          <div className="flex gap-3 justify-center">
            <label className="flex gap-2 focus-within:border-[#0066FF] border-2 border-gray-300 rounded items-center w-full p-2">
              Até:
              <input type="date" onChange={setFilterSecondDate} className="flex-1 bg-transparent outline-none" />
            </label>
          </div>
          <h1 className="font-semibold text-xl">Saídas</h1>
          <ApexCharts 
            options={createOptions<typeof datalistExit>(datalistExit)}
            series={createSeries<typeof exitsQuantity>(exitsQuantity, "Saídas")}
            width={width / 1.9}
            height={400}
            type="bar"
          />
        </div>
      </div>
    </div>
  )
}
