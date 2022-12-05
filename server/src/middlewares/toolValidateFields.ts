import { NextFunction, Request, Response } from "express";
import { StatusCode, ToolProps } from "../types";

export function toolValidation(request: Request, response: Response, next: NextFunction) {
  const { name }: ToolProps = request.body;
  const MIN_LENGTH_FIELD = 3;

  if (!name) {
    return response.status(StatusCode.NOT_FOUND).json({ message: "É obrigatório preencher o nome"});
  };

  if (name.length <= MIN_LENGTH_FIELD) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "O mínimo para nomear uma ferramenta são 3 caracteres" });
  };

  next();
};
