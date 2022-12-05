import { Entrance, Exit } from "@prisma/client";
import { ExitModel } from "../models/Exit";
import { ExitProps } from "../types";

export class ExitService {
  private model: ExitModel;

  constructor(model: ExitModel) {
    this.model = model;
  }

  public async create(exit: ExitProps): Promise<number> {
    const exitId = await this.model.create(exit);

    return exitId;
  };

  public async read(): Promise<Exit[] | null> {
    const exit = await this.model.read();

    return exit;
  }

  public async update(id: number, exit: ExitProps): Promise<number> {
    const exitId = await this.model.update(id, exit);

    return exitId;
  }

  public async delete(id: number): Promise<number> {
    const exitId = await this.model.delete(id);

    return exitId;
  }
};
