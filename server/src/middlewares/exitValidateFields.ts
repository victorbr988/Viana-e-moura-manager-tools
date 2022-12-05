import { NextFunction, Request, Response } from "express";
import { ExitProps, StatusCode } from "../types";
import { PrismaClient } from "@prisma/client";

export async function exitValidation(request: Request, response: Response, next: NextFunction) {
  const prisma = new PrismaClient()
  const {
    account,
    enterpriseName,
    toolName,
    quantity,
    requestedAt,
    responseAt,
    requester,
    status,
    subAccount,
  }: ExitProps = request.body;
  const MIN_QUANTITY_EXIT = 1;

  if (!toolName) return response.status(StatusCode.INVALID_DATA).json({ message: "O nome da ferramenta não pode estar vazio"})

  const tool = await prisma.tools.findUnique({
    where: {
      name: toolName
    }
  })

  if (!tool) return response.status(StatusCode.NOT_FOUND).json({ message: "Ferramenta não existe"})

  if (!requester) return response.status(StatusCode.INVALID_DATA).json({ message: "O nome do supervisor não pode estar vazio"})

  if (!account) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "A conta não pode estar em branco"});
  };

  if (!subAccount) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "A sub-conta não pode estar em branco"});
  };

  if (!enterpriseName) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "O empreendimento não pode estar em branco"});
  };

  const enterprise = await prisma.enterprises.findUnique({
    where: {
      name: enterpriseName
    }
  })

  if(!enterprise) return response.status(StatusCode.NOT_FOUND).json({ message: "Empreendimento não existe"})

  if (!quantity) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "A quantidade deve ser preenchida"});
  };

  if (typeof quantity !== 'number') {
    return response.status(StatusCode.INVALID_DATA).json({ message: "A quantidade precisa ser um número"});
  };

  if (quantity < MIN_QUANTITY_EXIT) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "A quantidade de ferramentas deve ser maior ou igual a 1"});
  };

  if (!new Date(requestedAt).getDate() || !new Date(responseAt).getDate()) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "A data deve possuir o formato mm/dd/yyyy"})
  };

  if (new Date(requestedAt).getMilliseconds() < new Date(responseAt).getMilliseconds()) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "A data do pedido não pode ser inferior a data da liberação"});
  };

  if (!requester) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "A pessoa solicitante deve ser inserida no campo"})
  };

  if (!status) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "O status deve ser preenchido"})
  };

  next();
}