import multer from "multer";

const storage = multer.memoryStorage(); // Temporarily store file in memory

const temporaryStoreImageInMemory = multer({ storage: storage }).single(
  "image"
);

export default temporaryStoreImageInMemory;
