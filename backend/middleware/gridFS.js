import path from "path";
import { gridFSBucket } from "../config/db.js";

export const uploadImageToGridFS = async (req, res, next) => {
  if (!gridFSBucket) {
    return res.status(500).send("GridFSBucket not initialized");
  }

  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  try {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    const uploadStream = gridFSBucket.openUploadStream(uniqueFileName, {
      metadata: {
        originalName: file.originalname,
        mimeType: file.mimetype,
      },
    });

    uploadStream.end(file.buffer); // Write file data to GridFS

    uploadStream.on("finish", () => {
      req.file = {
        id: uploadStream.id,
        filename: uniqueFileName,
      };
      next();
    });

    uploadStream.on("error", (err) => {
      res.status(500).send("File upload failed: " + err.message);
    });
  } catch (err) {
    res.status(500).send("File upload failed: " + err.message);
  }
};
