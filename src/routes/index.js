import { Router } from 'express'
import { usersRouter } from './v1/users.js'
import { permissionsRouter } from './v1/permissions.js'
import { rolesRouter } from './v1/roles.js'

const apiV1Router = Router()

apiV1Router.use('/users', usersRouter)
apiV1Router.use('/permissions', permissionsRouter)
apiV1Router.use('/roles', rolesRouter)

export { apiV1Router }
