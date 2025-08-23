// routes/customize.js
import express from "express";
import { GoogleGenAI, Modality } from "@google/genai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const ai = new GoogleGenAI({}); // optionally pass apiKey via env

router.post("/generate-preview", async (req, res) => {
  try {
    const { art, product } = req.body;

    // Build dynamic prompt
    const prompt = `Create a high-quality, 3D rendered image of a ${product} in ${art} style, suitable for product printing.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    // Save the first generated image
    let imageUrl = "";
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, "base64");
        const fileName = `${art.toLowerCase()}-${product.toLowerCase()}.png`;
        const filePath = path.join("public", "previews", fileName);

        // Ensure folder exists
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        fs.writeFileSync(filePath, buffer);
        imageUrl = `/previews/${fileName}`; // path relative to your static folder
        break;
      }
    }

    res.json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate preview" });
  }
});

export default router;
