import { Sequelize } from 'sequelize'

process.loadEnvFile()

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql'
})

sequelize
  .authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((err) =>
    console.error('No se pudo conectar a la base de datos:', err)
  )

export default sequelize
