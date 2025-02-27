export class UploadController {
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
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al subir el archivo",
        details: error.message,
      });
    }
  }
}
