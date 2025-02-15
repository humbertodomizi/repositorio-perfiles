import { Router } from 'express'
import {
  PermissionsController
} from '../../controllers/permissions.js'
import { asyncHandler } from '../../middlewares/asyncHandler.js'

export const permissionsRouter = Router()

permissionsRouter.get('/', asyncHandler(PermissionsController.getAll))
permissionsRouter.get('/:id', asyncHandler(PermissionsController.getByID))
permissionsRouter.post('/', asyncHandler(PermissionsController.create))
permissionsRouter.patch('/:id', asyncHandler(PermissionsController.update))
permissionsRouter.delete('/:id', asyncHandler(PermissionsController.delete))
