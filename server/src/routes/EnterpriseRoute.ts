import { PrismaClient } from '@prisma/client';
import express from 'express';
import { EnterpriseController } from '../controller/EnterpriseController';
import { enterpriseValidation } from '../middlewares/enterpriseValidateFields';
import { EnterpriseModel } from '../models/Enterprise';
import { EnterpriseService } from '../services/EnterpriseService';

export const enterpriseRoute: express.Router = express.Router()

const prisma = new PrismaClient()
const model = new EnterpriseModel(prisma)
const service = new EnterpriseService(model)
const enterpriseController = new EnterpriseController(service)

enterpriseRoute.post('/', enterpriseValidation, (req, res) => enterpriseController.create(req, res))
enterpriseRoute.get('/', (req, res) => enterpriseController.read(req, res))
enterpriseRoute.put('/:id', enterpriseValidation, (req, res) => enterpriseController.update(req, res))
enterpriseRoute.delete('/:id', (req, res) => enterpriseController.delete(req, res))
