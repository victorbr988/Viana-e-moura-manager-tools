import { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-hot-toast"
import { ToolProps } from "../context/types"
import { instance } from "./axios-config"

export async function create(url: string, data: Record<string, string>): Promise<AxiosResponse<AxiosError | ToolProps[]>> {
  try {
    const createResponse = await instance.post<ToolProps[]>(
      url,
      data
    )
    return createResponse
  } catch(err: AxiosError | any) {
    if (err instanceof AxiosError) {
      throw err.response?.data.message
    }
    throw err
  }
}

export async function getData(url: string): Promise<AxiosResponse<ToolProps[]>> {
  try {
    const tools = await instance.get(url)
    return tools
  } catch(err: any) {
    if (err instanceof AxiosError) {
      throw err.response?.data.message
    }
    throw err.message
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
