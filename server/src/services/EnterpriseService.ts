import { EnterpriseModel } from "../models/Enterprise";
import { EnterpriseProps } from "../types";

export class EnterpriseService {
  private model: EnterpriseModel

  constructor(model: EnterpriseModel) {
    this.model = model;
  }

  public async create(tool: EnterpriseProps): Promise<number> {
    const insertionModel = await this.model.create(tool)
    return insertionModel;
  }

  public async read(): Promise<EnterpriseProps[]> {
    const readings = await this.model.read();

    return readings;
  }

  public async update(id: number, tool: EnterpriseProps): Promise<number> {
    const updating = await this.model.update(id, tool);

    return updating;
  }

  public async delete(id: number): Promise<number> {
    const deleted = await this.model.delete(id);

    return deleted;
  }
}