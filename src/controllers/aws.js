import { s3 } from "../config/aws.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWS_BUCKET_NAME } from "../config/env.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export class AWSController {
  static async uploadFile(req, res) {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ error: "No se ha subido ningún archivo" });
      }
      res.status(200).json({
        message: "Archivo subido con éxito",
        fileUrl: req.file.location,
        fileName: req.file.key,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al subir el archivo",
        details: error.message,
      });
    }
  }

  static async getSignedUrl(req, res) {
    try {
      const { fileName } = req.body;

      if (!fileName) {
        return res.status(400).json({ error: "El nombre del archivo es requerido" });
      }

      const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
      });

      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

      res.json({ url: signedUrl });
    } catch (error) {
      res.status(500).json({ error: "Error al generar la URL", details: error.message });
    }
  }
}
