const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/product"); 

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("frontend")); // for HTML/CSS/JS
app.use(express.static("public")); 
// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB error:", err));

// Route to fetch products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
