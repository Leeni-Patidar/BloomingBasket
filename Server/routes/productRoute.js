const express = require("express");
const { body, validationResult } = require("express-validator");
const { auth, adminAuth } = require("../middleware/auth.js");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getCategories,
  getFeaturedProducts,
} = require("../controllers/productController.js");

const router = express.Router();

// ✅ Get latest 8 featured products
router.get("/featured", getFeaturedProducts);

// ✅ Get all products with filters, pagination, sorting
router.get("/", getProducts);

// ✅ Get product by ID
router.get("/:id", getProductById);

// ✅ Create product (Admin only)
router.post(
  "/",
  adminAuth,
  [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters"),
    body("description")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("category")
      .isIn([
        "flower",
        "chocolate",
        "soft-toy",
        "pipecleaner",
        "butterfly",
        "hair-clip",
        "crochet",
        "origami",
        "fruit",
        "skincare",
        "custom",
      ])
      .withMessage("Invalid category"),
    body("stock")
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer"),
    body("images")
      .isArray({ min: 1 })
      .withMessage("At least one image URL is required"),
    body("images.*")
      .isURL()
      .withMessage("Each image must be a valid URL"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
  createProduct
);

// ✅ Update product (Admin only)
router.put("/:id", adminAuth, updateProduct);

// ✅ Delete product (Admin only - soft delete)
router.delete("/:id", adminAuth, deleteProduct);

// ✅ Add product review (User only)
router.post(
  "/:id/reviews",
  auth,
  [
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("comment")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Comment must be at least 5 characters"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
  addReview
);

// ✅ Get distinct product categories
router.get("/categories/list", getCategories);

module.exports = router;
