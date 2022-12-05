import { Request, Response } from "express"
import { CreateToolService } from "../services/ToolService";
import { ToolProps } from "../types";
import { StatusCode } from "../types";

export class ToolController {
  private service: CreateToolService

  constructor(service: CreateToolService) {
    this.service = service;
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name }: ToolProps = req.body;

    const insertionService = await this.service.create({ name })

    return res.status(StatusCode.CREATED).json({ id: insertionService })
  }

  public async read(_req: Request, res: Response<ToolProps[]>): Promise<Response> {
    const readings = await this.service.read();

    return res.status(StatusCode.OK).json(readings);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const updating = await this.service.update(+id, req.body);

    return res.status(StatusCode.OK).json({ id: updating });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const deleted = await this.service.delete(+id);

    return res.status(StatusCode.OK).json({ id: deleted });
  }
}