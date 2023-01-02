import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
import { CreateSupervisorService } from "../services/SupervisorsService";
import { SupervisorProps, ToolProps } from "../types";
import { StatusCode } from "../types";

export class SupervisorsController {
  private service: CreateSupervisorService

  constructor(service: CreateSupervisorService) {
    this.service = service;
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, sector }: SupervisorProps = req.body;
    const prisma = new PrismaClient()
    const findSupervisorWithName = await prisma.supervisors.findUnique({
      where: { name }
    })

    if(findSupervisorWithName) return res.status(StatusCode.INVALID_DATA).json({message: "Supervisor já cadastrado"})

    const insertionService = await this.service.create({ name, sector })

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