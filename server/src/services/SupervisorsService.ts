import { CreateSupervisor } from "../models/Supervisors";
import { SupervisorProps } from "../types";

export class CreateSupervisorService {
  private model: CreateSupervisor

  constructor(model: CreateSupervisor) {
    this.model = model;
  }

  public async create(supervisor: SupervisorProps): Promise<number> {
    const insertionModel = await this.model.create(supervisor)
    return insertionModel;
  }

  public async read(): Promise<SupervisorProps[]> {
    const readings = await this.model.read();

    return readings;
  }
  public async update(id: number, supervisor: SupervisorProps): Promise<number> {
    const updating = await this.model.update(id, supervisor);

    return updating;
  }
  public async delete(id: number): Promise<number> {
    const deleted = await this.model.delete(id);

    return deleted;
  }
}