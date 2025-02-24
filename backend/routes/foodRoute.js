import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import temporaryStoreImageInMemory from "../middleware/singleUpload.js";
import { uploadImageToGridFS } from "../middleware/gridFS.js";

const foodRouter = express.Router();

foodRouter.get("/list", listFood);
foodRouter.post(
  "/add",
  temporaryStoreImageInMemory,
  uploadImageToGridFS,
  addFood
);
foodRouter.post("/remove", removeFood);

export default foodRouter;
