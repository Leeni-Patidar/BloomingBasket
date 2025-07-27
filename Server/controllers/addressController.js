const Address = require("../models/Address");

// Add a new address
const addAddress = async (req, res) => {
  try {
    const newAddress = new Address({
      ...req.body,
      userId: req.user._id,
    });
    const saved = await newAddress.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error adding address", error: err.message });
  }
};

// Get all addresses for a user
const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user._id });
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching addresses", error: err.message });
  }
};

// Edit an existing address
const editAddress = async (req, res) => {
  try {
    const updated = await Address.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Address not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error editing address", error: err.message });
  }
};

// Delete an address
const deleteAddress = async (req, res) => {
  try {
    const deleted = await Address.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deleted) return res.status(404).json({ message: "Address not found" });
    res.status(200).json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting address", error: err.message });
  }
};

module.exports = {
  addAddress,
  getAddress,
  editAddress,
  deleteAddress,
};
