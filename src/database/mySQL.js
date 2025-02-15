import { Sequelize } from 'sequelize'
import { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } from '../config/env.js'

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT || 3306,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5, // Máximo de conexiones simultáneas
    min: 0, // Mínimo de conexiones
    acquire: 30000, // Tiempo máximo para adquirir conexión (ms)
    idle: 10000 // Tiempo máximo de inactividad (ms)
  }
})

export const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Conexión a la base de datos exitosa')
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error.message)
    process.exit(1)
  }
}

export const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true })
    console.log('✅ Base de datos sincronizada correctamente')
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error.message)
  }
}

export default sequelize
