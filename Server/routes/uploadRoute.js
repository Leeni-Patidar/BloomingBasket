const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { auth, adminAuth } = require("../middleware/auth.js");
// require("dotenv").config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// console.log("Cloudinary ENV:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET ? "✔️ Present" : "❌ Missing",
// });


const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    file.mimetype.startsWith("image/") ? cb(null, true) : cb(new Error("Only image files are allowed!"));
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

const uploadToCloudinary = (buffer, options = {}) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => (error ? reject(error) : resolve(result)))
      .end(buffer);
  });

router.post("/image", adminAuth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: "bloomin-basket/products",
      transformation: [
        { width: 800, height: 800, crop: "limit" },
        { quality: "auto" },
        { format: "auto" },
      ],
    });

    res.json({ message: "File uploaded successfully", url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

router.post("/images", adminAuth, upload.array("images", 5), async (req, res) => {
  try {
    if (!req.files.length) return res.status(400).json({ message: "No files uploaded" });

    const files = await Promise.all(
      req.files.map((file, i) =>
        uploadToCloudinary(file.buffer, {
          folder: "bloomin-basket/products",
          public_id: `product_${Date.now()}_${i}`,
          transformation: [
            { width: 800, height: 800, crop: "limit" },
            { quality: "auto" },
            { format: "auto" },
          ],
        })
      )
    );

    res.json({ message: "Files uploaded successfully", files });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

router.delete("/:publicId", adminAuth, async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.publicId);
    if (result.result === "ok") {
      res.json({ message: "File deleted successfully" });
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "File too large. Maximum size is 10MB." });
  }
  if (error.message === "Only image files are allowed!") {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: "Upload error occurred" });
});

module.exports = router;
