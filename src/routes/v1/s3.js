import { Router } from "express";
import { AWSController } from "../../controllers/aws.js";
import { s3Middleware } from "../../middlewares/s3.js";

export const s3Router = Router();

s3Router.post("/upload-file", s3Middleware.single("archivo"), AWSController.uploadFile);
s3Router.post("/download-file", AWSController.getSignedUrl);
