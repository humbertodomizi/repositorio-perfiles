import zod from "zod";

export const envSchema = zod.object({
  DB_NAME: zod.string().nonempty(),
  DB_USER: zod.string().nonempty(),
  DB_PASS: zod.string(),
  DB_HOST: zod.string().nonempty(),
  DB_PORT: zod.string().optional(),
  AWS_REGION: zod.string().nonempty(),
  AWS_BUCKET_NAME: zod.string().nonempty(),
});
