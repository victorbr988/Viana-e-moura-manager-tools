import { PrismaClient, Enterprises } from "@prisma/client"
import { EnterpriseProps } from "../types";
 
export class EnterpriseModel {
  private database: PrismaClient

  constructor(database: PrismaClient) {
    this.database = database;
  }
  
  public async create(enterprises: EnterpriseProps): Promise<number> {
    const insertion: Enterprises = await this.database.enterprises.create({
      data: {
        ...enterprises
      }
    })
    return insertion.id
  }

  public async read(): Promise<Enterprises[]> {
    const readings: Enterprises[] = await this.database.enterprises.findMany();
    
    return readings;
  }
  public async update(id: number, enterprises: EnterpriseProps): Promise<number> {
    const updating: Enterprises = await this.database.enterprises.update({
      where: {
        id,
      },
      data: {
        ...enterprises
      }
    });
    
    return updating.id;
  }

  public async delete(id: number): Promise<number> {
    const deleted: Enterprises = await this.database.enterprises.delete({
      where: {
        id
      }
    })

    return deleted.id
  }
}