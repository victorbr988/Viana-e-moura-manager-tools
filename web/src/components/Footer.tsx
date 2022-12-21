import { ButtonSecondary } from "./Button";

export function Footer() {
  return (
    <footer className="bg-white  absolute bottom-0 w-full">
      <div className="container flex flex-col items-center justify-between p-6 mx-auto sm:flex-row gap-2">
          <a href="#" className="text-xl font-medium text-gray-700 transition-colors duration-300">Gerenciamento de ferramentas</a>
          <p className="text-sm text-gray-600">© Viana e Moura Construções {new Date(Date.now()).getFullYear()}. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}