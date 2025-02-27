import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../config/aws.js";
import { AWS_BUCKET_NAME } from "../config/env.js";
import crypto from "crypto";

const { randomUUID } = crypto;

export const s3Middleware = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      
      const fileName = `${randomUUID()}-${file.originalname.replace(/ /g, "_")}`

      cb(null, fileName );
    },
  }),
});
