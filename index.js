import express from "express";

import { router } from "./src/routes/v1/index.js";

import { errorHandler } from "./src/middlewares/errorHandler.js";
import { corsMiddleware } from "./src/middlewares/cors.js";
import { connectDB, syncDB } from "./src/database/mySQL.js";

process.loadEnvFile();

const app = express();
app.use(express.json());
app.use(corsMiddleware());

await connectDB();
await syncDB();

const PORT = process.env.PORT || 5000;


app.use('/api/v1', router);

app.use((req, res, next) => {
  res.status(404).json({ message: `Route '${ req.originalUrl }' not found` });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
