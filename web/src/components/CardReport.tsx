interface CardReportProps {
  title: string;
  quantityNumberFormat: number;
  quantityCurrencyFormat: string;
}

export function CardReport({title, quantityNumberFormat, quantityCurrencyFormat}: CardReportProps) {
  return (
    <div className="w-80 h-40 border-l-[15px] border-blue-500 rounded bg-gray-50 shadow-lg p-4">
      <h2 className="text-lg font-medium">{title}</h2>
      <p className=" text-2xl p-4 justify-center flex items-center">{quantityNumberFormat} un</p>
      <p className="flex justify-center font-light p-4">Totalizando {quantityCurrencyFormat}</p>
    </div>
  )
}