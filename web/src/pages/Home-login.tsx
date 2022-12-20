import { FiLock, FiLogIn, FiMail } from "react-icons/fi"
import { ButtonAdd, ButtonSecondary } from "../components/Button"
import { Modal } from "../components/Modal"

export function HomeLogin() {
  return (
    <main>
      <Modal.Root title="Faça login na plataforma">
        <Modal.Content>
          <Modal.Label>
            <FiMail />
            <Modal.Input type="text" placeholder="Digite seu email" />
          </Modal.Label>
          <Modal.Label>
            <FiLock />
            <Modal.Input type="text" placeholder="Digite sua senha" />
          </Modal.Label>
          <ButtonAdd>
            <FiLogIn  className="text-lg text-white"/>
            <span className="text-base">Entrar</span>
          </ButtonAdd>
          <section className=" flex flex-col gap-5 text-center border-t-[1px] border-gray-700 pt-4">
            <ButtonSecondary />
          </section>
        </Modal.Content>
      </Modal.Root>
    </main>
    
  )
}