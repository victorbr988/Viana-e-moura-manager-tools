import { FiLock, FiLogIn, FiMail } from "react-icons/fi"
import { ButtonAdd, ButtonSecondary } from "../components/Button"
import { Modal } from "../components/Modal"
import { Fragment, useContext, useState } from "react"
import phonePreview from "../assets/phone-preview.svg"
import { Footer } from "../components/Footer"
import { AuthContext } from "../context/Context-provider"
import { toast } from "react-hot-toast"

export function HomeLogin() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const contextState = useContext(AuthContext)

  async function handleSignin() {
    contextState.setEmail(email)
    contextState.setPassword(password)
    try {
      toast.loading("Validando dados")
      await contextState.createUser()
      toast.dismiss()

      setEmail('')
      setPassword('')
    } catch(err: any) {
      toast.dismiss()
      toast.error(err.message)
      console.log(err)
    }
  }

  return (
    <Fragment>
      <main className="flex min-h-screen w-full justify-center items-center">
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
      <Footer />
    </Fragment>
  )
}