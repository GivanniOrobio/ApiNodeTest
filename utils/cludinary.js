import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_CLOUD_NAME } from "../config.js";
import {CLOUDINARY_API_KEY} from "../config.js";
import {CLOUDINARY_API_SECRET} from "../config.js";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export async function uploadImage(filePath) {
  return await cloudinary.uploader.upload(filePath, {
     folder: "replit"
  }) 
}

export async function deleteImage(publicId){
  await cloudinary.uploader.destroy(publicId)
}
