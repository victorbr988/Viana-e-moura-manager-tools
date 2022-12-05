import { PrismaClient } from '@prisma/client';
import express from 'express';
import { EntranceController } from '../controller/EntranceController';
import { entranceValidation } from '../middlewares/entranceValidateFields';
import { EntranceModel } from '../models/Entrance';
import { EntranceService } from '../services/EntranceService';

export const entranceRoute: express.Router = express.Router()

const prisma = new PrismaClient()
const model = new EntranceModel(prisma)
const service = new EntranceService(model)
const entranceController = new EntranceController(service)

entranceRoute.post('/', entranceValidation, (req, res) => entranceController.create(req, res))
entranceRoute.get('/', (req, res) => entranceController.read(req, res))
entranceRoute.put('/:id', entranceValidation, (req, res) => entranceController.update(req, res))
entranceRoute.delete('/:id', (req, res) => entranceController.delete(req, res))
