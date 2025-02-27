import { fromEnv } from "@aws-sdk/credential-providers";
import { AWS_REGION } from "./env.js";

import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: AWS_REGION,
  credentials: fromEnv(),
});
