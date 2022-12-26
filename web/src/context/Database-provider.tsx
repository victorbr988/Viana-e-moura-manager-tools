import { AxiosError } from "axios";
import { ReactNode, useEffect, useState } from "react"
import { toast } from "react-hot-toast";
import { create, deleteData, getData, update } from "../axios/requesters";
import { DatabaseContext } from "./Context-provider"
import { ToolProps } from "./types";

interface DatabaseProviderProps {
  children: ReactNode
}

export interface ContextDatabaseProps {
  tools: ToolProps[];
  createTool(value: string): void;
  deleteTool(id: number): void;
  updateTool(data: Record<string, string | number>): void;
}

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const [tools, setTools] = useState<ToolProps[]>([])
  console.log("Chamou o contexto")

  const contextType: ContextDatabaseProps = {
    tools,
    createTool,
    deleteTool,
    updateTool
  }

  async function createTool(name: string) {
    const toastId = toast.loading("Criando ferramenta...", {
      duration: 2000
    })
    try {
      await create('/tools', { name })
      toast.success("Ferramenta criada com sucesso", {
        duration: 3000
      })
      toast.dismiss(toastId)
      await getTools()
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
    }
  }

  async function getTools() {
    try {
      const tools = await getData('/tools')
      setTools(tools.data.sort())
      return tools
    } catch(err: AxiosError | any) {
      toast.error(err)
      console.log(err)
    }
  }

  async function deleteTool(id: number) {
    const toastId = toast.loading("Verificando ferramenta...", {
      duration: 2000
    })
    try {
      await deleteData(`/tools/${id}`)
      toast.success("Excluído com sucesso")
      await getTools()
      toast.dismiss(toastId)
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
      throw err
    }
  }

  async function updateTool(data: Record<string, string | number>) {
    const toastId = toast.loading("Editando ferramenta...", {
      duration: 2000
    })
    try {
      await update(`/tools/${data.id}`, data)
      await getTools()

      toast.dismiss(toastId)
      toast.success("Ferramenta editada com sucesso")
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
      throw err
    }
  }

  useEffect(() => {
    getTools()
  }, [])

  return (
    <DatabaseContext.Provider value={contextType}>
      { children }
    </DatabaseContext.Provider>
  )
}