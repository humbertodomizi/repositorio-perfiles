import express from 'express';

import usersRoutes from './src/v1/routes/usersRoutes.js';

import sequelize from './src/database/db/mysqlConnection.js';

process.loadEnvFile();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/api/v1', usersRoutes);

sequelize
  .sync()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
