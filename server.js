const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Multer setup for file uploads (in memory)
const upload = multer({ storage: multer.memoryStorage() });

// 🔹 MongoDB setup
const uri = "mongodb+srv://sharanyaravindranath:ZqYa8Kiq7DycyU@peacock.f5zuzej.mongodb.net/?retryWrites=true&w=majority&appName=peacock";
const client = new MongoClient(uri);
let usersCollection;

async function connectDB() {
  await client.connect();
  const db = client.db("peacockDB");
  usersCollection = db.collection("users");
  console.log("✅ Connected to MongoDB");
}
connectDB();

// 🔹 Save or update user
app.post("/saveUser", async (req, res) => {
  try {
    const { uid, name, email } = req.body;

    await usersCollection.updateOne(
      { uid },
      { $set: { name, email } },
      { upsert: true }
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save user" });
  }
});

// 🔹 Upload artwork for a specific user
app.post("/uploadArtwork", upload.single("artwork"), async (req, res) => {
  try {
    const { uid } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const artwork = {
      img: file.buffer,       // image as binary
      contentType: file.mimetype,
      uploadedAt: new Date()
    };

    const result = await usersCollection.updateOne(
      { uid },
      { $push: { artworks: artwork } },
      { upsert: false }       // do not create user here, only add artwork
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.json({ message: "Artwork uploaded successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Get all artworks of a user (optional)
app.get("/getArtworks/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await usersCollection.findOne({ uid }, { projection: { artworks: 1 } });

    if (!user) return res.status(404).json({ error: "User not found!" });

    res.json({ artworks: user.artworks || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
