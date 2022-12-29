import { AxiosError, AxiosResponse } from "axios"
import { instance } from "./axios-config"

export async function create(url: string, data: Record<string, string>): Promise<AxiosResponse<AxiosError | any>> {
  try {
    const createResponse = await instance.post(
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

export async function getData(url: string): Promise<AxiosResponse> {
  try {
    const tools = await instance.get(url)
    return tools
  } catch(err: AxiosError | any) {
    if (err instanceof AxiosError) {
      throw err.response?.data.message
    }
    throw err.message
  }
}

export async function deleteData(url: string) {
  try {
    await instance.delete(url)
  } catch(err: AxiosError | any) {
    if (err instanceof AxiosError) {
      console.dir(err)
      return err.response?.data.message
    }
    throw err
  }
}

export async function update(url: string, data: Record<string, string | number>) {
  try {
    await instance.put(url, { ...data })
  } catch(err: AxiosError | any) {
    if (err instanceof AxiosError) {
      console.dir(err)
      return err.response?.data.message
    }
    throw err
  }
}
