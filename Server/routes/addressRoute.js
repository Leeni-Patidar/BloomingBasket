const express = require("express");
const { auth } = require("../middleware/auth.js");
const {
  addAddress,
  getAddress,
  editAddress,
  deleteAddress,
} = require("../controllers/addressController.js");

const addressRouter = express.Router();

// GET /api/addresses - Fetch all addresses for the logged-in user
addressRouter.get("/", auth, getAddress);

// POST /api/addresses - Add a new address
addressRouter.post("/", auth, addAddress);

// PUT /api/addresses/:id - Update a specific address
addressRouter.put("/:id", auth, editAddress);

// DELETE /api/addresses/:id - Delete a specific address
addressRouter.delete("/:id", auth, deleteAddress);

module.exports = addressRouter;
