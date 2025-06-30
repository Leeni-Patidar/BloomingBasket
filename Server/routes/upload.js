const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { auth } = require("../middleware/auth")

const router = express.Router()

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads")
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    cb(new Error("Only image files are allowed!"), false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
})

// Upload single image
router.post("/image", auth, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const fileUrl = `/uploads/${req.file.filename}`

    res.json({
      message: "File uploaded successfully",
      filename: req.file.filename,
      url: fileUrl,
      size: req.file.size,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Upload failed" })
  }
})

// Upload multiple images
router.post("/images", auth, upload.array("images", 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" })
    }

    const files = req.files.map((file) => ({
      filename: file.filename,
      url: `/uploads/${file.filename}`,
      size: file.size,
    }))

    res.json({
      message: "Files uploaded successfully",
      files,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Upload failed" })
  }
})

// Delete uploaded file
router.delete("/:filename", auth, (req, res) => {
  try {
    const filename = req.params.filename
    const filePath = path.join(__dirname, "../uploads", filename)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      res.json({ message: "File deleted successfully" })
    } else {
      res.status(404).json({ message: "File not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Delete failed" })
  }
})

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large. Maximum size is 5MB." })
    }
  }

  if (error.message === "Only image files are allowed!") {
    return res.status(400).json({ message: error.message })
  }

  res.status(500).json({ message: "Upload error occurred" })
})

module.exports = router
