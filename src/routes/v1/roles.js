import { Router } from 'express'
import {
  RolesController
} from '../../controllers/roles.js'
import { asyncHandler } from '../../middlewares/asyncHandler.js'

export const rolesRouter = Router()

rolesRouter.get('/', asyncHandler(RolesController.getAll))
rolesRouter.get('/:id', asyncHandler(RolesController.getByID))
rolesRouter.post('/', asyncHandler(RolesController.create))
rolesRouter.patch('/:id', asyncHandler(RolesController.update))
rolesRouter.delete('/:id', asyncHandler(RolesController.delete))
