import { Entrance } from "@prisma/client";
import { Request, Response } from "express";
import { ExitService } from "../services/ExitService";
import { ExitProps, StatusCode } from "../types";

export class ExitController {
  private service: ExitService;

  constructor(service: ExitService) {
    this.service = service;
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      status,
      requester,
      toolName,
      requestedAt,
      responseAt,
      enterpriseName,
      quantity,
      account,
      subAccount,}: ExitProps = req.body;

    const exitObject: ExitProps = {
      status,
      requester,
      toolName,
      requestedAt: new Date(requestedAt),
      responseAt: new Date(responseAt),
      enterpriseName,
      quantity,
      account,
      subAccount,
    }
    const exitId = await this.service.create(exitObject);

    return res.status(StatusCode.CREATED).json({ id: exitId });
  };

  public async read(_req: Request, res: Response): Promise<Response<Entrance[]>> {
    const exitId = await this.service.read();

    return res.status(StatusCode.OK).json(exitId);
  }

  public async update(req: Request, res: Response): Promise<Response<number>> {
    const { id } = req.params
    const {
      status,
      requester,
      toolName,
      requestedAt,
      responseAt,
      enterpriseName,
      quantity,
      account,
      subAccount,
    }: ExitProps = req.body;

    const exitObject: ExitProps = {
      status,
      requester,
      toolName,
      requestedAt: new Date(requestedAt),
      responseAt: new Date(responseAt),
      enterpriseName,
      quantity,
      account,
      subAccount,
    }

    const exitId = await this.service.update(+id, exitObject);

    return res.status(StatusCode.OK).json({id: exitId});
  }

  public async delete(req: Request, res: Response): Promise<Response<number>> {
    const { id } = req.params
    const exitId = await this.service.delete(+id);

    return res.status(StatusCode.OK).json({id: exitId});
  }
}