import { envSchema } from "../validations/env.js";
process.loadEnvFile();

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  console.log("Error en las variables de entorno:", error.format());
  process.exit(1);
}

export const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  AWS_REGION,
  AWS_BUCKET_NAME,
} = data;
