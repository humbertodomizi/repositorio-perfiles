import { Router } from 'express'
import { usersRouter } from './users.js'
import { permissionsRouter } from './permissions.js'
import { rolesRouter } from './roles.js'

const apiV1Router = Router()

apiV1Router.use('/users', usersRouter)
apiV1Router.use('/permissions', permissionsRouter)
apiV1Router.use('/roles', rolesRouter)

export { apiV1Router }
