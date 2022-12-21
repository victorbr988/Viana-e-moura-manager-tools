import { Meta, StoryObj } from "@storybook/react";
import { FiLock, FiLogIn, FiMail } from "react-icons/fi";
import { ButtonAdd, ButtonSecondary } from "./Button";
import { Modal, ModalRootProps } from "./Modal";

export default {
  title: "Modals/signin",
  component: Modal.Root,
  args: {
    title: "Fazer login na plataforma",
    children: (
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
    )
  },
  argTypes: {
    children: {
      table: {
        disable: true
      }
    }
  }
} as Meta<ModalRootProps>

export const Default: StoryObj = {}
