import { Entrance } from "@prisma/client";
import { Request, Response } from "express";
import { EntranceService } from "../services/EntranceService";
import { EntranceProps, StatusCode } from "../types";

export class EntranceController {
  private service: EntranceService;

  constructor(service: EntranceService) {
    this.service = service;
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      toolName,
      supervisorName,
      addedAt,
      quantity,
      unitPrice,
      userId
    }: EntranceProps = req.body;

    const entranceObject: EntranceProps = {
      toolName,
      supervisorName,
      addedAt: new Date(addedAt),
      quantity,
      unitPrice,
      userId
    }
    const entranceId = await this.service.create(entranceObject);

    return res.status(StatusCode.CREATED).json({ id: entranceId });
  };

  public async read(_req: Request, res: Response): Promise<Response<Entrance[]>> {
    const entrances = await this.service.read();

    return res.status(StatusCode.OK).json(entrances);
  }

  public async update(req: Request, res: Response): Promise<Response<number>> {
    const { id } = req.params
    const {toolName, supervisorName, addedAt, quantity, unitPrice, userId}: EntranceProps = req.body;

    const entranceObject: EntranceProps = {
      toolName,
      supervisorName,
      addedAt: new Date(addedAt),
      quantity,
      unitPrice,
      userId
    }
    const entranceId = await this.service.update(+id, entranceObject);

    return res.status(StatusCode.OK).json({id: entranceId});
  }

  public async delete(req: Request, res: Response): Promise<Response<number>> {
    const { id } = req.params
    const entranceId = await this.service.delete(+id);

    return res.status(StatusCode.OK).json({id: entranceId});
  }
}