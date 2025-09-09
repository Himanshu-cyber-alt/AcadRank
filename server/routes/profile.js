// routes/profile.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// GET profile by userId
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const result = await pool.query(
      "SELECT * FROM results WHERE user_id = $1 ORDER BY uploaded_at DESC LIMIT 1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.json({
        message: "No profile found for this user",
        data: {},
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

export default router;
