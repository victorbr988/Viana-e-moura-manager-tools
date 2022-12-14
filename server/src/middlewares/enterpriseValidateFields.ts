import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { EnterpriseProps, StatusCode } from "../types";

export async function enterpriseValidation(request: Request, response: Response, next: NextFunction) {
  const { name }: EnterpriseProps = request.body;
  const MIN_LENGTH_FIELD = 3;

  const prisma = new PrismaClient()
  const findEnterpriselWithName = await prisma.enterprises.findUnique({
    where: { name }
  })

  if(findEnterpriselWithName) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "Nome já cadastrado"})
  }

  if (!name) {
    return response.status(StatusCode.NOT_FOUND).json({ message: "É obrigatório preencher o nome"});
  };

  if (name.length <= MIN_LENGTH_FIELD) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "O mínimo para nomear um empreendimento são 3 caracteres" });
  };

  next();
};
