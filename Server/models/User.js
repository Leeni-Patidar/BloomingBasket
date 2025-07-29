const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },
    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },
    addressLine2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{6}$/, "Pincode must be 6 digits"],
    },
    country: {
      type: String,
      trim: true,
      default: "India",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isAdmin: {
      type: Boolean,
      default: function () {
        return this.role === "admin"
      },
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
      country: { type: String, trim: true, default: "India" },
    },
    addresses: [addressSchema],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    preferences: {
      newsletter: {
        type: Boolean,
        default: true,
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
    lastLogin: {
      type: Date,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Index for better query performance
userSchema.index({ email: 1 })
userSchema.index({ phone: 1 })
userSchema.index({ role: 1 })

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Pre-save middleware to sync isAdmin with role
userSchema.pre("save", function (next) {
  if (this.isModified("role")) {
    this.isAdmin = this.role === "admin"
  }
  next()
})

// Pre-save middleware to ensure only one default address
userSchema.pre("save", function (next) {
  if (this.isModified("addresses")) {
    const defaultAddresses = this.addresses.filter((addr) => addr.isDefault)
    if (defaultAddresses.length > 1) {
      // Keep only the last one as default
      this.addresses.forEach((addr, index) => {
        addr.isDefault = index === this.addresses.length - 1 && addr.isDefault
      })
    }
  }
  next()
})

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Method to get public profile
userSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject()
  delete userObject.password
  delete userObject.emailVerificationToken
  delete userObject.passwordResetToken
  delete userObject.passwordResetExpires
  return userObject
}

// Method to add address
userSchema.methods.addAddress = function (addressData) {
  // If this is set as default, make others non-default
  if (addressData.isDefault) {
    this.addresses.forEach((addr) => {
      addr.isDefault = false
    })
  }

  // If no addresses exist, make this one default
  if (this.addresses.length === 0) {
    addressData.isDefault = true
  }

  this.addresses.push(addressData)
  return this.save()
}

// Method to update address
userSchema.methods.updateAddress = function (addressId, updateData) {
  const address = this.addresses.id(addressId)
  if (!address) {
    throw new Error("Address not found")
  }

  // If setting as default, make others non-default
  if (updateData.isDefault) {
    this.addresses.forEach((addr) => {
      if (addr._id.toString() !== addressId) {
        addr.isDefault = false
      }
    })
  }

  Object.assign(address, updateData)
  return this.save()
}

// Method to remove address
userSchema.methods.removeAddress = function (addressId) {
  const address = this.addresses.id(addressId)
  if (!address) {
    throw new Error("Address not found")
  }

  const wasDefault = address.isDefault
  address.remove()

  // If removed address was default, make first address default
  if (wasDefault && this.addresses.length > 0) {
    this.addresses[0].isDefault = true
  }

  return this.save()
}

// Method to migrate old address to new addresses array
userSchema.methods.migrateAddress = function () {
  // If user has old address format but no new addresses, migrate it
  if (this.address && this.address.street && this.addresses.length === 0) {
    const migratedAddress = {
      fullName: this.name,
      phone: this.phone || "0000000000",
      addressLine1: this.address.street,
      addressLine2: "",
      city: this.address.city || "",
      state: this.address.state || "",
      pincode: this.address.zipCode || "000000",
      country: this.address.country || "India",
      isDefault: true,
    }

    this.addresses.push(migratedAddress)
    return this.save()
  }
  return Promise.resolve(this)
}

// Method to add product to wishlist
userSchema.methods.addToWishlist = function (productId) {
  if (!this.wishlist.includes(productId)) {
    this.wishlist.push(productId)
    return this.save()
  }
  return Promise.resolve(this)
}

// Method to remove product from wishlist
userSchema.methods.removeFromWishlist = function (productId) {
  this.wishlist = this.wishlist.filter((id) => id.toString() !== productId.toString())
  return this.save()
}

// Method to check if product is in wishlist
userSchema.methods.isInWishlist = function (productId) {
  return this.wishlist.some((id) => id.toString() === productId.toString())
}

// Static method to find by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() })
}

// Static method to find active users
userSchema.statics.findActiveUsers = function () {
  return this.find({ isActive: true })
}

// Virtual for full name (if you want to split name later)
userSchema.virtual("fullName").get(function () {
  return this.name
})

// Virtual to check if user has addresses
userSchema.virtual("hasAddresses").get(function () {
  return this.addresses && this.addresses.length > 0
})

// Virtual to get default address
userSchema.virtual("defaultAddress").get(function () {
  return this.addresses.find((addr) => addr.isDefault) || this.addresses[0]
})

module.exports = mongoose.model("User", userSchema)
