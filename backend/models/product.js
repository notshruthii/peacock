const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
 name: String,
  artist: String,
  artForm: String,
  price: Number,
  image: String,
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  cartCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", productSchema);
