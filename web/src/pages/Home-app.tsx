import managerIcon from "../assets/manager-icon.svg"

export function HomeApp() {

  return (
    <div className="flex flex-col justify-center items-center w-full gap-3">
      <img src={managerIcon} className="md:w-80 md:h-80 w-40 h-40" alt="ícone de um homem" />
      <p className="text-xl text-semibold text-gray-600">Agora você pode gerenciar seu estoque mais facilmente!</p>
    </div>
    
  )
}