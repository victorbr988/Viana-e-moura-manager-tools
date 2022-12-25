import { createContext } from "react"
import { ContextDatabaseProps } from "./Database-provider"
import { ContextProps } from "./types"

export const AuthContext = createContext({} as ContextProps)

export const DatabaseContext = createContext({} as ContextDatabaseProps)
