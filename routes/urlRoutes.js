import express from "express";
import shortid from "shortid";
import Url from "../models/Url.js";

const router = express.Router();

// POST - shorten a URL
router.post("/shorten", async (req, res) => {
  try {
    const { fullUrl } = req.body;

    if (!fullUrl) {
      return res.status(400).json({ error: "Full URL is required" });
    }

    // Check if the URL already exists in the database
    let existing = await Url.findOne({ full: fullUrl });
    if (existing) {
      return res.json({ shortUrl: `http://tiny-backend-production.up.railway.app//${existing.short}` });
    }

    
    // Create a new short URL
    const short = shortid.generate();
    const newUrl = new Url({ full: fullUrl, short });
    await newUrl.save();

    res.json({ shortUrl: `http://tiny-backend-production.up.railway.app//${short}` });
  } catch (err) {
    console.error("❌ Error shortening URL:", err);
    res.status(500).json({ error: "Server error" });
  }
});





// GET - redirect short link to original URL
router.get("/:shortId", async (req, res) => {
  try {
    const record = await Url.findOne({ short: req.params.shortId });
    if (record) {
      return res.redirect(record.full);
    }
    res.status(404).json({ error: "URL not found" });
  } catch (err) {
    console.error("❌ Error fetching URL:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

