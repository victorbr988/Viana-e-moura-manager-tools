import { NextFunction, Request, Response } from "express";
import { EntranceProps, StatusCode } from "../types";
import { PrismaClient } from "@prisma/client";

export async function entranceValidation(request: Request, response: Response, next: NextFunction) {
  const prisma = new PrismaClient()
  const {
    toolName,
    supervisorName,
    unitPrice,
    addedAt,
    quantity,
  }: EntranceProps = request.body;

  const MIN_PRICE_TOOL = 1
  const MIN_QUANTITY_TOOL = 1

  if (!toolName) return response.status(StatusCode.INVALID_DATA).json({ message: "O nome da ferramenta não pode estar vazio"})
  
  const tool = await prisma.tools.findUnique({
    where: {
      name: toolName
    }
  })

  if (!tool) return response.status(StatusCode.NOT_FOUND).json({ message: "Ferramenta não existe"})

  if (!supervisorName) return response.status(StatusCode.INVALID_DATA).json({ message: "O nome do supervisor não pode estar vazio"})

  const supervisor = await prisma.supervisors.findUnique({
    where: {
      name: supervisorName
    }
  })

  console.log(tool)
  console.log(supervisor)

  if (!supervisor) return response.status(StatusCode.NOT_FOUND).json({ message: "Supervisor não existe"})

  if(typeof unitPrice !== 'number') {
    return response.status(StatusCode.INVALID_DATA).json({ message: "O preço unitário precisa ser um número inteiro ou decimal"})
  };

  if (unitPrice < MIN_PRICE_TOOL) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "O valor não pode ser inferior ou igual a 0"})
  };

  if (quantity < MIN_QUANTITY_TOOL) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "A quantidade não pode ser inferior ou igual a 0"})
  };

  if (!new Date(addedAt).getDate()) {
    return response.status(StatusCode.INVALID_DATA).json({ message: "A data deve possuir o formato mm/dd/yyyy"})
  };

  next();
};
