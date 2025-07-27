// controllers/addressController.js

const Address = require("../models/Address");

// ✅ Add Address
const addAddress = async (req, res) => {
  try {
    const { isDefault } = req.body;

    if (isDefault) {
      await Address.updateMany({ userId: req.user.id }, { $set: { isDefault: false } });
    }

    const newAddress = new Address({ ...req.body, userId: req.user.id });
    const saved = await newAddress.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error adding address", error: err.message });
  }
};

// ✅ Get All
const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id });
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching addresses", error: err.message });
  }
};

// ✅ Edit
const editAddress = async (req, res) => {
  try {
    const { isDefault } = req.body;
    if (isDefault) {
      await Address.updateMany({ userId: req.user.id }, { $set: { isDefault: false } });
    }

    const updated = await Address.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Address not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error editing address", error: err.message });
  }
};

// ✅ Delete
const deleteAddress = async (req, res) => {
  try {
    const deleted = await Address.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Address not found" });
    res.status(200).json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting address", error: err.message });
  }
};

// ✅ Set Default Address explicitly (optional route)
const setDefaultAddress = async (req, res) => {
  try {
    const { id } = req.params;

    await Address.updateMany({ userId: req.user.id }, { $set: { isDefault: false } });

    const updated = await Address.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isDefault: true },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Address not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error setting default address", error: err.message });
  }
};

module.exports = {
  addAddress,
  getAddress,
  editAddress,
  deleteAddress,
  setDefaultAddress,
};
