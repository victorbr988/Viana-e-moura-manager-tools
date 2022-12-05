import { PrismaClient, Supervisors } from "@prisma/client"
import { SupervisorProps } from "../types";
 
export class CreateSupervisor {
  private database: PrismaClient

  constructor(database: PrismaClient) {
    this.database = database;
  }
  
  public async create(supervisor: SupervisorProps): Promise<number> {
    const insertion: Supervisors = await this.database.supervisors.create({
      data: {
        ...supervisor
      }
    })
    return insertion.id
  }

  public async read(): Promise<SupervisorProps[]> {
    const readings: Supervisors[] = await this.database.supervisors.findMany();
    
    return readings;
  }
  public async update(id: number, supervisor: SupervisorProps): Promise<number> {
    const updating: Supervisors = await this.database.supervisors.update({
      where: {
        id,
      },
      data: {
        ...supervisor
      }
    });
    
    return updating.id;
  }

  public async delete(id: number): Promise<number> {
    const deleted: Supervisors = await this.database.supervisors.delete({
      where: {
        id
      }
    })

    return deleted.id
  }
}