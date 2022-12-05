import { Entrance } from "@prisma/client";
import { EntranceModel } from "../models/Entrance";
import { EntranceProps } from "../types";

export class EntranceService {
  private model: EntranceModel;

  constructor(model: EntranceModel) {
    this.model = model;
  }

  public async create(entrance: EntranceProps): Promise<number> {
    const entranceId = await this.model.create(entrance);

    return entranceId;
  };

  public async read(): Promise<Entrance[] | null> {
    const entrances = await this.model.read();

    return entrances;
  }

  public async update(id: number, entrance: EntranceProps): Promise<number> {
    const entranceId = await this.model.update(id, entrance);

    return entranceId;
  }

  public async delete(id: number): Promise<number> {
    const entranceId = await this.model.delete(id);

    return entranceId;
  }
};
