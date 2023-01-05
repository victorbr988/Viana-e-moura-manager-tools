import { Fragment, InputHTMLAttributes, ReactNode } from "react"

export interface ModalRootProps {
  title: string
  children: ReactNode
}

interface ModalContentProps {
  children: ReactNode
}

interface ModalInputProps extends InputHTMLAttributes<HTMLInputElement> {}

type ModalLabelProps = ModalContentProps

function ModalRoot({title, children}: ModalRootProps) {
  return (
    <form className="bg-white shadow-lg rounded-lg sm:w-[400px] sm:max-h-[500px] w-full justify-center flex flex-col px-5 gap-2 pb-8">
      <h2 className="text-gray-900 text-center text-xl font-semibold py-5">{title}</h2>
      {children}
    </form>
  )
}

function ModalContent({children}: ModalContentProps) {
  return(
    <div className="overflow-y-auto w-full h-full flex flex-col gap-4">
      {children}
    </div>
  )
}

function ModalLabel({children}: ModalLabelProps) {
  return (
    <label className="flex gap-2 focus-within:border-[#0066FF] border-2 border-gray-300 rounded items-center w-full p-2">
      {children}
    </label>
  )
}

function ModalInput(props: ModalInputProps){
  return (
    <input 
      className="flex-1 bg-transparent outline-none" 
      {...props} 
    />
  )
}

const Modal = {
  Root: ModalRoot,
  Content: ModalContent,
  Label: ModalLabel,
  Input: ModalInput
}

const inputGroup = {
  Label: ModalLabel,
  Input: ModalInput
}

export { Modal, inputGroup }
