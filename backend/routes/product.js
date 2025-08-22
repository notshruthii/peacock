const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Like a product
router.post("/:id/like", async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  res.json(product);
});

// Share a product
router.post("/:id/share", async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $inc: { shares: 1 } },
    { new: true }
  );
  res.json(product);
});

// Add to cart
router.post("/:id/cart", async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $inc: { cartCount: 1 } },
    { new: true }
  );
  res.json(product);
});

module.exports = router;
