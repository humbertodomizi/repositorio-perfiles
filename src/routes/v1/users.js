import { Router } from 'express'
import {
  UsersController
} from '../../controllers/users.js'

export const usersRouter = Router()

usersRouter.get('/', UsersController.getAll)
usersRouter.get('/:uuid', UsersController.getByUUID)
usersRouter.post('/', UsersController.create)
usersRouter.patch('/:uuid', UsersController.update)
usersRouter.delete('/:uuid', UsersController.delete)
