import { Exit, PrismaClient } from "@prisma/client";
import { ExitProps } from "../types";

export class ExitModel {
  private database: PrismaClient

  constructor(database: PrismaClient) {
    this.database = database;
  }

  public async create(exit: ExitProps): Promise<number> {
    const insertion: Exit = await this.database.exit.create({
      data: {
        ...exit
      }
    })

    return insertion.id;
  }

  public async read(): Promise<Exit[]> {
    const reading: Exit[] = await this.database.exit.findMany();

    return reading;
  }

  public async update(id: number, exit: ExitProps): Promise<number> {
    const updating: Exit = await this.database.exit.update({
      where: {
        id
      },
      data: {
        ...exit
      }
    })

    return updating.id;
  }

  public async delete(id: number): Promise<number> {
    const deleted: Exit = await this.database.exit.delete({
      where: {
        id
      }
    })

    return deleted.id;
  }
}