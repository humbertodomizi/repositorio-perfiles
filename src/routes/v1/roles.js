import { Router } from 'express'
import {
  RolesController
} from '../../controllers/roles.js'

export const rolesRouter = Router()

rolesRouter.get('/', RolesController.getAll)
rolesRouter.get('/:id', RolesController.getByID)
rolesRouter.post('/', RolesController.create)
rolesRouter.patch('/:id', RolesController.update)
rolesRouter.delete('/:id', RolesController.delete)
