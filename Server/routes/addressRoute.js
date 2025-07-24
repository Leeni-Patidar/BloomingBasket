const express = require('express');
const { auth } = require('../middleware/auth.js');
const {
  addAddress,
  getAddress,
  editAddress,
  deleteAddress,
} = require('../controllers/addressController.js');

const addressRouter = express.Router();

// ✅ Add Address
addressRouter.post('/add', auth, addAddress);

// ✅ Get Address (was POST with body for filtering)
addressRouter.post('/get', auth, getAddress);

// ✅ Edit Address
addressRouter.put('/edit', auth, editAddress);

// ✅ Delete Address
addressRouter.delete('/delete/:id', auth, deleteAddress);

module.exports = addressRouter;
