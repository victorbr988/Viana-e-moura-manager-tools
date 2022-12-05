import { Entrance, PrismaClient } from "@prisma/client";
import { EntranceProps } from "../types";

export class EntranceModel {
  private database: PrismaClient

  constructor(database: PrismaClient) {
    this.database = database
  }

  public async create(entrance: EntranceProps): Promise<number> {
    const insertion: Entrance = await this.database.entrance.create({
      data: {
        ...entrance
      },
    })

    return insertion.id
  }

  public async read(): Promise<Entrance[] | null> {
    const reading: Entrance[] = await this.database.entrance.findMany({
      include: {
        name: {
          select: {
            name: true
          }
        },
        supervisors: {
          select: {
            name: true,
            sector: true
          }
        }
      },
    });

    return reading;
  }

  public async update(id: number, entrance: EntranceProps): Promise<number> {
    const updating: Entrance = await this.database.entrance.update({
      where: {
        id,
      }, 
      data: {
        ...entrance
      }
    })

    return updating.id
  }

  public async delete(id: number): Promise<number> {
    const deleted: Entrance = await this.database.entrance.delete({
      where: {
        id
      }
    })

    return deleted.id
  }

}