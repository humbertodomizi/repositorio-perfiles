import { Router } from 'express'
import { usersRouter } from './users.js'
import { permissionsRouter } from './permissions.js'
import { rolesRouter } from './roles.js'
import { s3Router } from './s3.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'API v1' })
})

router.use('/users', usersRouter)
router.use('/permissions', permissionsRouter)
router.use('/roles', rolesRouter)
router.use('/s3', s3Router)

export { router }
