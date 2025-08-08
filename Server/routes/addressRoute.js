const express = require("express");
const { auth } = require("../middleware/auth");
const {
  addAddress,
  getAddress,
  editAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/addressController.js");

const router = express.Router();

// All address routes require auth
router.use(auth);

// GET /api/addresses
router.get("/", getAddress);

// POST /api/addresses
router.post("/", addAddress);

// PUT /api/addresses/:id
router.put("/:id", editAddress);

// DELETE /api/addresses/:id
router.delete("/:id", deleteAddress);

// PUT /api/addresses/default/:id
router.put("/default/:id", setDefaultAddress);

module.exports = router;
