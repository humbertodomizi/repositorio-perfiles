import express from 'express'
import sequelize from './src/database/mySQL.js'

import { apiV1Router } from './src/routes/index.js'

import { errorHandler } from './src/middlewares/errorHandler.js'
import { corsMiddleware } from './src/middlewares/cors.js'

process.loadEnvFile()

const app = express()
app.use(express.json())
app.use(corsMiddleware())

const PORT = process.env.PORT || 5000

app.use('/api/v1', apiV1Router)

app.use(errorHandler)

sequelize
  .sync()
  .then(() => {
    console.log('Conexión a la base de datos exitosa')
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err)
  })

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
