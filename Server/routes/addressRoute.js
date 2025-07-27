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

router.get("/", auth, getAddress);
router.post("/", auth, addAddress);
router.put("/:id", auth, editAddress);
router.delete("/:id", auth, deleteAddress);
router.put("/default/:id", auth, setDefaultAddress); // optional default setter route

module.exports = router;
