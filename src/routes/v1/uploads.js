import { Router } from "express";
import { UploadController } from "../../controllers/uploads.js";
import { upload } from "../../middlewares/uploads.js";

export const uploadsRouter = Router();

uploadsRouter.post("/", upload.single("archivo"), UploadController.uploadFile);
