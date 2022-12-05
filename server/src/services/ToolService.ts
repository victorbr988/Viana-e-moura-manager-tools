import { ToolModel } from "../models/Tools";
import { ToolProps } from "../types";

export class CreateToolService {
  private model: ToolModel

  constructor(model: ToolModel) {
    this.model = model;
  }

  public async create(tool: ToolProps): Promise<number> {
    const insertionModel = await this.model.create(tool)
    return insertionModel;
  }

  public async read(): Promise<ToolProps[]> {
    const readings = await this.model.read();

    return readings;
  }
  public async update(id: number, tool: ToolProps): Promise<number> {
    const updating = await this.model.update(id, tool);

    return updating;
  }
  public async delete(id: number): Promise<number> {
    const deleted = await this.model.delete(id);

    return deleted;
  }
}