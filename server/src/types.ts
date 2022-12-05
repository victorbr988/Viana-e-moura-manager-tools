export enum StatusCode {
  OK = 200,
  INVALID_DATA = 400,
  NOT_FOUND = 404,
  CREATED = 201,
};

export interface ToolProps {
  id?: number,
  name: string
};

export interface SupervisorProps {
  id?: number,
  name: string,
  sector: string
};

export interface EnterpriseProps {
  id?: number,
  name: string
};

export interface EntranceProps {
  id?: number,
  toolName: string,
  addedAt: Date,
  supervisorName: string,
  quantity: number,
  unitPrice: number
}

export interface ExitProps {
  id?: number,
  status: string,
  requester: string,
  toolName: string,
  requestedAt: Date,
  responseAt: Date,
  enterpriseName: string
  quantity: number,
  account: string,
  subAccount: string
}

export type PortProps = string | undefined;
