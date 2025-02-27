import express from "express";

import { apiV1Router } from "./src/routes/v1/index.js";

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

app.use('/api/v1', apiV1Router);



app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
