import { Router } from 'express'
import {
  UsersController
} from '../../controllers/users.js'
import { asyncHandler } from '../../middlewares/asyncHandler.js'

export const usersRouter = Router()

usersRouter.get('/', asyncHandler(UsersController.getAll))
usersRouter.get('/:uuid', asyncHandler(UsersController.getByUUID))
usersRouter.post('/', asyncHandler(UsersController.create))
usersRouter.patch('/:uuid', asyncHandler(UsersController.update))
usersRouter.delete('/:uuid', asyncHandler(UsersController.delete))
