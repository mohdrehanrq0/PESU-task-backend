const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath: string, fileName: string) => {
  let mainFolderName = "redvision-task";

  return cloudinary.uploader
    .upload(localFilePath, {
      public_id: fileName,
      folder: mainFolderName,
      overwrite: false,
    })
    .then((result: any) => {
      fs.unlinkSync(localFilePath);

      return {
        success: true,
        fileData: result,
      };
    })
    .catch((err: any) => {
      fs.unlinkSync(localFilePath);
      return {
        success: false,
        err,
      };
    });
};

export default uploadToCloudinary;
