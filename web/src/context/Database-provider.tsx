import { AxiosError } from "axios";
import { ReactNode, useEffect, useMemo, useState } from "react"
import { toast } from "react-hot-toast";
import { create, deleteData, getData, update } from "../axios/requesters";
import { orderArray } from "../utils/orderArrayList";
import { DatabaseContext } from "./Context-provider"
import { EnterpriseProps, EntranceProps, SupervisorProps, ToolProps } from "./types";

interface DatabaseProviderProps {
  children: ReactNode
}

export interface ContextDatabaseProps {
  tools: ToolProps[];
  createTool(value: string): void;
  deleteTool(id: number): void;
  updateTool(data: ToolProps): void;
  getTools(): void;
  enterprises: EnterpriseProps[];
  createEnterprise(value: string): void;
  deleteEnterprise(id: number): void;
  updateEnterprise(data: EnterpriseProps): void;
  supervisors: SupervisorProps[];
  createSupervisor(data: SupervisorProps): void;
  deleteSupervisor(id: number): void;
  updateSupervisor(data: SupervisorProps): void;
  getSupervisors(): void;
  entrances: EntranceProps[];
  createEntrance(data: EntranceProps): void;
  deleteEntrance(id: number): void;
  updateEntrance(data: EntranceProps): void;
  getEntrances(): void;
}

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const [tools, setTools] = useState<ToolProps[]>([])
  const [enterprises, setEnterprises] = useState<EnterpriseProps[]>([])
  const [supervisors, setSupervisors] = useState<SupervisorProps[]>([])
  const [entrances, setEntrances] = useState<EntranceProps[]>([])
  

  const contextType: ContextDatabaseProps = {
    tools,
    createTool,
    deleteTool,
    updateTool,
    createEnterprise,
    deleteEnterprise,
    updateEnterprise,
    enterprises,
    getTools,
    createSupervisor,
    deleteSupervisor,
    supervisors,
    updateSupervisor,
    getSupervisors,
    getEntrances,
    createEntrance,
    deleteEntrance,
    entrances,
    updateEntrance,
  }

  async function getTools() {
    try {
      const tools = await getData('/tools')
      setTools(orderArray<ToolProps>(tools.data))
      return tools
    } catch(err: AxiosError | any) {
      toast.error(err)
      console.log(err)
    }
  }

  async function createTool(name: string) {
    const toastId = toast.loading("Criando ferramenta...")
    try {
      await create<ToolProps>('/tools', { name })
      await getTools()

      toast.dismiss(toastId)
      toast.success("Ferramenta criada com sucesso") 
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
    }
  }

  async function deleteTool(id: number) {
    const toastId = toast.loading("Verificando ferramenta...")
    try {
      await deleteData(`/tools/${id}`)
      await getTools()

      toast.dismiss(toastId)
      toast.success("Excluído com sucesso")
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
      throw err
    }
  }

  async function updateTool(data: ToolProps) {
    const toastId = toast.loading("Editando ferramenta...")
    try {
      await update<ToolProps>(`/tools/${data.id}`, data)
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
      setEnterprises(orderArray<EnterpriseProps>(enterprises.data))
      return enterprises
    } catch(err: AxiosError | any) {
      toast.error(err)
      console.log(err)
    }
  }

  async function createEnterprise(name: string) {
    const toastId = toast.loading("Criando empreendimento...")
    try {
      await create<EnterpriseProps>('/enterprises', { name })
      await getEnterprises()

      toast.dismiss(toastId)
      toast.success("Empreendimento criado com sucesso")
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
    }
  }

  async function deleteEnterprise(id: number) {
    const toastId = toast.loading("Verificando empreendimento...")
    try {
      await deleteData(`/enterprises/${id}`)
      await getEnterprises()

      toast.dismiss(toastId)
      toast.success("Excluído com sucesso")
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
      throw err
    }
  }

  async function updateEnterprise(data: EnterpriseProps) {
    const toastId = toast.loading("Editando empreendimento...")
    try {
      await update<EnterpriseProps>(`/enterprises/${data.id}`, data)
      await getEnterprises()

      toast.dismiss(toastId)
      toast.success("Editado com sucesso")
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
      throw err
    }
  }

  // CRUD supervisores
  async function getSupervisors() {
    try {
      const supervisors = await getData('/supervisors')
      console.log(supervisors)
      setSupervisors(orderArray<SupervisorProps>(supervisors.data))
      return supervisors
    } catch(err: AxiosError | any) {
      toast.error(err)
      console.log(err)
    }
  }

  async function createSupervisor(data: SupervisorProps) {
    const toastId = toast.loading("Criando supervisor...")
    try {
      await create<SupervisorProps>('/supervisors', data)
      await getSupervisors()

      toast.dismiss(toastId)
      toast.success("supervisor criado com sucesso")
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
    }
  }

  async function deleteSupervisor(id: number) {
    const toastId = toast.loading("Verificando supervisor...")
    try {
      await deleteData(`/supervisors/${id}`)
      await getSupervisors()

      toast.dismiss(toastId)
      toast.success("Excluído com sucesso")
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
      throw err
    }
  }

  async function updateSupervisor(data: SupervisorProps) {
    const toastId = toast.loading("Editando supervisor...", {
      duration: 2000
    })
    try {
      await update<SupervisorProps>(`/supervisors/${data.id}`, data)
      await getSupervisors()

      toast.dismiss(toastId)
      toast.success("Editado com sucesso")
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
      throw err
    }
  }

  // CRUD Entrance
  async function getEntrances() {
    try {
      const entrances = await getData('/entrance')
      setEntrances(orderArray(entrances.data))
      return supervisors
    } catch(err: AxiosError | any) {
      toast.error(err)
      console.log(err)
    }
  }

  async function createEntrance(data: EntranceProps) {
    const toastId = toast.loading("Criando Entrada...")
    try {
      await create<EntranceProps>('/entrance', data)
      await getEntrances()

      toast.dismiss(toastId)
      toast.success("Entrada criada com sucesso")
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
    }
  }

  async function deleteEntrance(id: number) {
    const toastId = toast.loading("Verificando Entrada...")
    try {
      await deleteData(`/entrance/${id}`)
      await getEntrances()

      toast.dismiss(toastId)
      toast.success("Excluído com sucesso")
    } catch(err: AxiosError | any) {
      toast.dismiss(toastId)
      toast.error(err)
      throw err
    }
  }

  async function updateEntrance(data: EntranceProps) {
    const toastId = toast.loading("Editando entrada...", {
      duration: 2000
    })
    try {
      await update<EntranceProps>(`/entrance/${data.id}`, data)
      await getEntrances()

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