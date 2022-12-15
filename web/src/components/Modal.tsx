import { Fragment, InputHTMLAttributes, ReactNode } from "react"

interface ModalRootProps {
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
    <form className="bg-gray-100 w-[400px] justify-center flex flex-col px-11 pb-8">
      <h2 className="text-gray-900 text-center text-xl py-5">{title}</h2>
      {children}
    </form>
  )
}

function ModalContent({children}: ModalContentProps) {
  return(
    <Fragment>
      {children}
    </Fragment>
  )
}

function ModalLabel({children}: ModalLabelProps) {
  return (
    <label className="flex gap-2 focus-within:border-[#0066FF] border-b-2 border-gray-900 items-center w-full p-1">
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

export { Modal }