const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "flower",
        "chocolate",
        "soft-toy",
        "pipecleaner",
        "butterfly",
        "hairclip",
        "crochet",
        "origami",
        "fruit",
        "skincare",
        "custom", // Added custom category
      ],
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0; // must have at least 1 image
        },
        message: "At least one image is required",
      },
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    dimensions: {
      height: Number,
      width: Number,
      depth: Number,
    },
    weight: Number,
    careInstructions: String,
    // New fields for custom products
    isCustom: {
      type: Boolean,
      default: false,
    },
    customization: {
      bouquetType: String,
      size: String,
      message: String,
      deliveryDate: Date,
      specialInstructions: String,
      referenceImage: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Full-text search index
productSchema.index({ name: "text", description: "text", tags: "text" });

// ✅ Method to calculate average rating
productSchema.methods.calculateAverageRating = function () {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating.average = sum / this.reviews.length;
    this.rating.count = this.reviews.length;
  }
};

module.exports = mongoose.model("Product", productSchema);
