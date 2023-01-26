import { useContext, useEffect, useState } from "react";
import { CardReport } from "../components/CardReport";
import { Chart } from "../components/Chart";
import { DatabaseContext } from "../context/Context-provider";
import { toBRLCurrency } from "../utils/priceFormat";
import { uuidv4 } from "@firebase/util";

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
    const YEAR_NOW = new Date(Date.now()).getFullYear()
    const MONTH_NOW = new Date(Date.now()).getMonth()
    const dateEntranceYear = new Date(entrance.addedAt).getFullYear()
    const dateEntranceMonth = new Date(entrance.addedAt).getMonth()
    
    return dateEntranceMonth === MONTH_NOW && dateEntranceYear === YEAR_NOW
  })

  const exitWithUnitPrice: any[] = []
  contextState.tools.forEach((data) => {
    const recentlyentrance = data.entrance?.at(-1)
    data.exit?.forEach((exit) => {
      exitWithUnitPrice.push({...exit, unitPrice: recentlyentrance?.unitPrice})
    })
  })

  const exitByMonth = exitWithUnitPrice.filter((exit) => {
    const YEAR_NOW = new Date(Date.now()).getFullYear()
    const MONTH_NOW = new Date(Date.now()).getMonth()
    const dateEntranceYear = new Date(exit.responseAt).getFullYear()
    const dateEntranceMonth = new Date(exit.responseAt).getMonth()
    
    return dateEntranceMonth === MONTH_NOW && dateEntranceYear === YEAR_NOW
  })

  const entrancesNumber: number = entranceByMonth.reduce((acc, curr) => acc + curr.quantity, 0)
  const entrancesCurrency: number = entranceByMonth.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0)
  const exitsNumber: number = exitByMonth.reduce((acc, curr) => acc + curr.quantity, 0)
  const exitsCurrency: number = exitByMonth.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0)
  const inventoryQuantityNow = totalEntrancesNumber - totalExitsNumber

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