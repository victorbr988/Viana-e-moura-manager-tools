import { PrismaClient } from '@prisma/client';
import express from 'express';
import { SupervisorsController } from '../controller/SupervisorsController';
import { supervisorValidation } from '../middlewares/supervisorValidateFields';
import { CreateSupervisor } from '../models/Supervisors';
import { CreateSupervisorService } from '../services/SupervisorsService';

export const supervisorRoute: express.Router = express.Router()

const prisma = new PrismaClient()
const model = new CreateSupervisor(prisma)
const service = new CreateSupervisorService(model)
const supervisorController = new SupervisorsController(service)

supervisorRoute.post('/', supervisorValidation, (req, res) => supervisorController.create(req, res))
supervisorRoute.get('/', (req, res) => supervisorController.read(req, res))
supervisorRoute.put('/:id', supervisorValidation, (req, res) => supervisorController.update(req, res))
supervisorRoute.delete('/:id', (req, res) => supervisorController.delete(req, res))
