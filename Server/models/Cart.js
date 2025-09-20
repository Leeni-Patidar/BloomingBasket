const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { timestamps: true }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

// Indexes for faster lookups
// cartSchema.index({ userId: 1 });
cartSchema.index({ "items.productId": 1 });

// ✅ Pre-save hook to remove invalid productIds
cartSchema.pre("save", function(next) {
  this.items = this.items.filter(item => mongoose.Types.ObjectId.isValid(item.productId));
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
