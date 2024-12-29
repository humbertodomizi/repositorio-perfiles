import express from 'express'
import { connectDb } from './src/config/mysqlConnection.js'
import { exerciseRoutes } from './src/v1/routes/exerciseRoutes.js'

process.loadEnvFile()
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.use('/api/v1/exercises', exerciseRoutes)

app.listen(PORT, () => {
  connectDb()
  console.log(`Server listening on http://localhost:${PORT}`)
})
