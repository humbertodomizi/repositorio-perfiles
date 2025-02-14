import { Router } from 'express'
import {
  PermissionsController
} from '../../controllers/permissions.js'

export const permissionsRouter = Router()

permissionsRouter.get('/', PermissionsController.getAll)
permissionsRouter.get('/:id', PermissionsController.getByID)
permissionsRouter.post('/', PermissionsController.create)
permissionsRouter.patch('/:id', PermissionsController.update)
permissionsRouter.delete('/:id', PermissionsController.delete)
