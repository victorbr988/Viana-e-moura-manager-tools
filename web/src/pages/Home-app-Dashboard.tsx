import { useContext, useEffect, useState } from "react";
import { CardReport } from "../components/CardReport";
import { Chart } from "../components/Chart";
import { DatabaseContext } from "../context/Context-provider";
import { toBRLCurrency } from "../utils/priceFormat";
import { uuidv4 } from "@firebase/util";
import { EntranceProps, ExitProps, ToolProps } from "../context/types";

export function Dashboard() {
  const contextState = useContext(DatabaseContext)
  const [totalEntrancesNumber, setTotalEntrancesNumber] = useState<number>(0)
  const [totalEntrancesCurrency, setTotalEntrancesCurrency] = useState<string>("")
  const [totalExitsNumber, setTotalExitsNumber] = useState<number>(0)
  const [totalExitsCurrency, setTotalExitsCurrency] = useState<string>("")

  useEffect(() => {
    contextState.getEntrances()
    contextState.getExits()
    contextState.getTools()
  }, [])

  const entranceByMonth = contextState.entrances.filter((entrance) => {
    const YEAR_NOW: number = new Date(Date.now()).getFullYear()
    const MONTH_NOW: number = new Date(Date.now()).getMonth()
    const dateEntranceYear: number = new Date(entrance.addedAt).getFullYear()
    const dateEntranceMonth: number = new Date(entrance.addedAt).getMonth()
    
    return dateEntranceMonth === MONTH_NOW && dateEntranceYear === YEAR_NOW
  })

  interface ExitWithUnitPriceProps extends ExitProps {
    unitPrice: number;
  }

  const exitWithUnitPrice: ExitWithUnitPriceProps[] = []

  contextState.tools.forEach((data: ToolProps): void => {
    const mostRecentlyEntrance: EntranceProps = data.entrance!.at(-1) as EntranceProps
    
    data.exit?.forEach((exit: ExitProps) => {
      exitWithUnitPrice.push({...exit, unitPrice: mostRecentlyEntrance.unitPrice})
    })
  })

  const exitByMonth = exitWithUnitPrice.filter((exit) => {
    const YEAR_NOW: number = new Date(Date.now()).getFullYear()
    const MONTH_NOW: number = new Date(Date.now()).getMonth()
    const dateEntranceYear: number = new Date(exit.responseAt).getFullYear()
    const dateEntranceMonth: number = new Date(exit.responseAt).getMonth()
    
    return dateEntranceMonth === MONTH_NOW && dateEntranceYear === YEAR_NOW
  })

  const entrancesNumber: number = entranceByMonth.reduce((acc, curr) => acc + curr.quantity, 0)
  const entrancesCurrency: number = entranceByMonth.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0)
  const exitsNumber: number = exitByMonth.reduce((acc, curr) => acc + curr.quantity, 0)
  const exitsCurrency: number = exitByMonth.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0)
  const inventoryQuantityNow: number = totalEntrancesNumber - totalExitsNumber

  useEffect(() => {
    setTotalEntrancesNumber(entrancesNumber)
    setTotalEntrancesCurrency(toBRLCurrency(entrancesCurrency))
    setTotalExitsNumber(exitsNumber)
    setTotalExitsCurrency(toBRLCurrency(exitsCurrency))
  }, [])

  return (
    <div className="w-full flex flex-col gap-5 justify-center items-center">
      <div className="flex flex-wrap justify-center pt-10 gap-10">
        <CardReport
          key={uuidv4()}
          title="Total de entradas do mês"
          quantityCurrencyFormat={totalEntrancesCurrency}
          quantityNumberFormat={totalEntrancesNumber}
        />
        <CardReport
          key={uuidv4()}
          title="Total de saídas do mês"
          quantityCurrencyFormat={totalExitsCurrency}
          quantityNumberFormat={totalExitsNumber}
        />
        <CardReport
          key={uuidv4()}
          title="Estoque atual"
          quantityCurrencyFormat={toBRLCurrency(entrancesCurrency - exitsCurrency)}
          quantityNumberFormat={inventoryQuantityNow < 0 ? 0 : inventoryQuantityNow}
        />
      </div>
      <Chart />
    </div>
  )
}