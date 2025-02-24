import foodModel from "../models/foodModel.js";
import { gridFSBucket } from "../config/db.js";

// all food list
const listFood = async (req, res) => {
  try {
    let foods = await foodModel.find({});

    foods = await Promise.all(
      foods.map(async (food) => {
        const image = await getImageData(food.imageId);
        return {
          ...food.toObject(),
          image,
        };
      })
    );

    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// add food
const addFood = async (req, res) => {
  try {
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      imageId: req.file.id,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// delete food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    await foodModel.findByIdAndDelete(req.body.id);
    await gridFSBucket.delete(food.imageId);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Helper function to get image data from GridFS
const getImageData = async (imageId) => {
  const images = await gridFSBucket.find({ _id: imageId }).toArray();
  const image = images[0];

  if (!image) {
    throw new Error("Image not found");
  }

  const base64File = await new Promise((resolve, reject) => {
    let fileData = Buffer.from([]);
    const downloadStream = gridFSBucket.openDownloadStream(image._id);
    downloadStream.on("data", (chunk) => {
      fileData = Buffer.concat([fileData, chunk]);
    });
    downloadStream.on("end", () => {
      resolve(fileData.toString("base64"));
    });
    downloadStream.on("error", (err) => {
      reject(err);
    });
  });

  return {
    filename: image.filename,
    contentType: image.contentType,
    length: image.length,
    uploadDate: image.uploadDate,
    data: base64File,
  };
};

export { listFood, addFood, removeFood };
