import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCode, ToolProps } from "../types";

export async function toolValidation(request: Request, response: Response, next: NextFunction) {
  const { name }: ToolProps = request.body;
  const MIN_LENGTH_FIELD = 2;

  const prisma = new PrismaClient()
  const findToolWithName = await prisma.tools.findUnique({
    where: { name }
  })

  if(findToolWithName) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "Nome já cadastrado"})
  }

  if (!name) {
    return response.status(StatusCode.NOT_FOUND).json({ message: "É obrigatório preencher o nome"});
  };

  if (name.length < MIN_LENGTH_FIELD) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "O mínimo para nomear uma ferramenta são 3 caracteres" });
  };

  next();
};
