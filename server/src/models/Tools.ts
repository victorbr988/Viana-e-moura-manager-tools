import { PrismaClient, Tools } from "@prisma/client"
import { ToolProps } from "../types";
 
export class ToolModel {
  private database: PrismaClient

  constructor(database: PrismaClient) {
    this.database = database;
  }
  
  public async create(tool: ToolProps): Promise<number> {
    const insertion: Tools = await this.database.tools.create({
      data: {
        ...tool
      }
    })
    return insertion.id
  }

  public async read(): Promise<Tools[]> {
    const readings: Tools[] = await this.database.tools.findMany({
      include: {
        entrance: true,
        exit: true
      }
    });
    
    return readings;
  }
  public async update(id: number, tool: ToolProps): Promise<number> {
    const updating: Tools = await this.database.tools.update({
      where: {
        id,
      },
      data: {
        ...tool
      }
    });
    
    return updating.id;
  }

  public async delete(id: number): Promise<number> {
    const deleted: Tools = await this.database.tools.delete({
      where: {
        id
      }
    })

    return deleted.id
  }
}