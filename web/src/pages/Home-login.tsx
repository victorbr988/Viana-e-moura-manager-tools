import { FiLock, FiLogIn, FiMail } from "react-icons/fi"
import { ButtonAdd, ButtonSecondary } from "../components/Button"
import { Modal } from "../components/Modal"
import { Fragment, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { observerUser } from "../firebase/observerUser"
import { createUser } from "../firebase/createUserWithEmailAndPassword"
import phonePreview from "../../public/phone-preview.svg"

export function HomeLogin() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  async function handleSignin() {
    try {
      toast.promise(
        createUser(email, password),
        {
          loading: "Validando os dados",
          success: "Acesso permitido",
          error: (err) => err.message
        }
      )
      setEmail("")
      setPassword("")
    } catch(err) {
      console.log(err)
    }
  }
  useEffect(() => {
    return observerUser()
  }, [])

  return (
    <Fragment>
      <main className="flex w-full justify-center">
        <section className="w-1/2 hidden lg:visible lg:flex justify-center items-center border-r-[1px] border-gray-900">
          <img className="w-[350px] rounded-xl" src={phonePreview} alt="Imagem de um celular com uma página aberta" />
        </section>
        <section className="lg:w-1/2 w-full flex justify-center items-center">
          <Modal.Root title="Faça login na plataforma">
            <Modal.Content>
              <Modal.Label>
                <FiMail />
                <Modal.Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email" />
              </Modal.Label>
              <Modal.Label>
                <FiLock />
                <Modal.Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" />
              </Modal.Label>
              <ButtonAdd
                handleClick={handleSignin}
              >
                <FiLogIn  className="text-lg text-white"/>
                <span className="text-base">Entrar</span>
              </ButtonAdd>
              <section className=" flex flex-col gap-5 text-center border-t-[1px] border-gray-700 pt-4">
                <ButtonSecondary />
              </section>
            </Modal.Content>
          </Modal.Root>
        </section>
      </main>
    </Fragment>
  )
}