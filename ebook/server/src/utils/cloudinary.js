const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

exports.uploadToCloudinary = async (filePath, publicId) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      public_id: publicId,
      overwrite: true,
    });
    return result;
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    throw err;
  }
};
