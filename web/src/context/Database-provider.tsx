import { AxiosError } from "axios";
import { ReactNode, useEffect, useState } from "react"
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { create, deleteData, getData, update } from "../axios/requesters";
import { DatabaseContext } from "./Context-provider"
import { EnterpriseProps, ToolProps } from "./types";

interface DatabaseProviderProps {
  children: ReactNode
}

export interface ContextDatabaseProps {
  tools: ToolProps[];
  createTool(value: string): void;
  deleteTool(id: number): void;
  updateTool(data: Record<string, string | number>): void;
  enterprises: EnterpriseProps[]
  createEnterprise(value: string): void;
  deleteEnterprise(id: number): void;
  updateEnterprise(data: Record<string, string | number>): void;
  getTools(): void

}

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const [tools, setTools] = useState<ToolProps[]>([])
  const [enterprises, setEnterprises] = useState<EnterpriseProps[]>([])

  const contextType: ContextDatabaseProps = {
    tools,
    createTool,
    deleteTool,
    updateTool,
    createEnterprise,
    deleteEnterprise,
    updateEnterprise,
    enterprises,
    getTools
  }

  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/home-app/tools') {
      getTools()
    }
  }, [])

  useEffect(() => {
    if (location.pathname === '/home-app/enterprises') {
      getEnterprises()
    }
  }, [])

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

  async function getEnterprises() {
    try {
      const enterprises = await getData('/enterprises')
      setEnterprises(enterprises.data.sort())
      return enterprises
    } catch(err: AxiosError | any) {
      toast.error(err)
      console.log(err)
    }
  }

  async function createEnterprise(name: string) {
    const toastId = toast.loading("Criando empreendimento...", {
      duration: 2000
    })
    try {
      await create('/enterprises', { name })
      toast.success("Empreendimento criado com sucesso", {
        duration: 3000
      })
      toast.dismiss(toastId)
      await getEnterprises()
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
    }
  }

  async function deleteEnterprise(id: number) {
    const toastId = toast.loading("Verificando empreendimento...", {
      duration: 2000
    })
    try {
      await deleteData(`/enterprises/${id}`)
      toast.success("Excluído com sucesso")
      await getEnterprises()
      toast.dismiss(toastId)
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
      throw err
    }
  }

  async function updateEnterprise(data: Record<string, string | number>) {
    const toastId = toast.loading("Editando empreendimento...", {
      duration: 2000
    })
    try {
      await update(`/enterprises/${data.id}`, data)
      await getEnterprises()

      toast.dismiss(toastId)
      toast.success("Editado com sucesso")
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
      throw err
    }
  }

  return (
    <DatabaseContext.Provider value={contextType}>
      { children }
    </DatabaseContext.Provider>
  )
}