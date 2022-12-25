import { ReactNode, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { create, deleteData, getData } from "../axios/requesters";
import { DatabaseContext } from "./Context-provider"
import { ToolProps } from "./types";

interface DatabaseProviderProps {
  children: ReactNode
}

export interface ContextDatabaseProps {
  tools: ToolProps[];
  createTool(value: string): void;
  deleteTool(id: number): void;
}

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const [tools, setTools] = useState<ToolProps[]>([])
  const location = useLocation()
  console.log("Chamou o contexto")

  const contextType: ContextDatabaseProps = {
    tools,
    createTool,
    deleteTool
  }

  async function createTool(name: string) {
    try {
      await create('/tools', { name })
      await getTools()
    } catch(err: any) {
      console.dir(err)
    }
  }

  async function getTools() {
    try {
      const tools = await getData('/tools')
      setTools(tools.data.sort())
      return tools
    } catch(err: any) {
      console.log(err)
    }
  }

  async function deleteTool(id: number) {
    try {
      await deleteData(`/tools/${id}`)
      await getTools()
    } catch(err) {
      console.log(err)
      throw err
    }
  }

  useEffect(() => {
    if (location.pathname !== "/") {
      getTools()
    }
  }, [])

  return (
    <DatabaseContext.Provider value={contextType}>
      { children }
    </DatabaseContext.Provider>
  )
}