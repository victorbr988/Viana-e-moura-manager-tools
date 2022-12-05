import { PrismaClient } from '@prisma/client';
import express from 'express';
import { ExitController } from '../controller/ExitController';
import { exitValidation } from '../middlewares/exitValidateFields';
import { ExitModel } from '../models/Exit';
import { ExitService } from '../services/ExitService';

export const exitRoute: express.Router = express.Router()

const prisma = new PrismaClient()
const model = new ExitModel(prisma)
const service = new ExitService(model)
const exitController = new ExitController(service)

exitRoute.post('/', exitValidation, (req, res) => exitController.create(req, res))
exitRoute.get('/', (req, res) => exitController.read(req, res))
exitRoute.put('/:id', exitValidation, (req, res) => exitController.update(req, res))
exitRoute.delete('/:id', (req, res) => exitController.delete(req, res))
