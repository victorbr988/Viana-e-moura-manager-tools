import { PrismaClient } from '@prisma/client';
import express from 'express';
import { ToolController } from '../controller/ToolController';
import { toolValidation } from '../middlewares/toolValidateFields';
import { ToolModel } from '../models/Tools';
import { CreateToolService } from '../services/ToolService';

export const toolRoute: express.Router = express.Router()

const prisma = new PrismaClient()
const model = new ToolModel(prisma)
const service = new CreateToolService(model)
const toolController = new ToolController(service)

toolRoute.post('/', toolValidation, (req, res) => toolController.create(req, res))
toolRoute.get('/', (req, res) => toolController.read(req, res))
toolRoute.put('/:id', toolValidation, (req, res) => toolController.update(req, res))
toolRoute.delete('/:id', (req, res) => toolController.delete(req, res))
