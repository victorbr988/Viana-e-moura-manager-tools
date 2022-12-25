import { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-hot-toast"
import { ToolProps } from "../context/types"
import { instance } from "./axios-config"

export async function create(url: string, data: Record<string, string>): Promise<void> {
  try {
    const createPromise = instance.post(
      url,
      data
    )
    toast.promise(createPromise,
      {
        success: "Adicionado com sucesso",
        loading: "Adicionado na base dados...",
        error: "Não foi possível salvar na base de dados"
      }
    )
    await createPromise;
  } catch(err) {
    if (err instanceof AxiosError) {
      console.dir(err)
    }
    throw err
  }
}

export async function getData(url: string): Promise<AxiosResponse<ToolProps[]>> {
  try {
    const toastId = toast.loading("Buscando dados...")
    const tools = await instance.get(url)
    toast.dismiss(toastId)
    toast.success("Dados recuperados com sucesso")
    return tools
  } catch(err: any) {
    toast.dismiss()
    
    if (err instanceof AxiosError) {
      console.dir(err)
    }
    throw err
  }
}

export async function deleteData(url: string) {
  try {
    const createPromise = instance.delete(url)
    toast.promise(createPromise,
      {
        success: "Excluído com sucesso",
        loading: "Verificando na base dados...",
        error: "Não foi possível excluir da base de dados"
      }
    )

    await createPromise
  } catch(err) {
    if (err instanceof AxiosError) {
      console.dir(err)
    }
    throw err
  }
}
