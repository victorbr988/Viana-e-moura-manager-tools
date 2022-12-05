import { NextFunction, Request, Response } from "express";
import { StatusCode, SupervisorProps, ToolProps } from "../types";

export function supervisorValidation(request: Request, response: Response, next: NextFunction) {
  const { name, sector }: SupervisorProps = request.body;
  const MIN_LENGTH_FIELD = 3;

  if (!name) {
    return response.status(StatusCode.NOT_FOUND).json({ message: "É obrigatório preencher o nome"});
  };

  if (!sector) {
    return response.status(StatusCode.NOT_FOUND).json({ message: "É obrigatório preencher o setor"});
  };

  if (name.length <= MIN_LENGTH_FIELD) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "O mínimo para nomear um empreendimento são 3 caracteres" });
  };

  next();
};
