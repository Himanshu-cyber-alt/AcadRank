import express from "express";
import multer from "multer";
import Tesseract from "tesseract.js";
import fs from "fs";
import { pool } from "../db.js";

const router = express.Router();

// ensure uploads folder exists
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// OCR + extract info
async function extractInfo(filePath) {
  const { data: { text } } = await Tesseract.recognize(filePath, "eng");
  const cleaned = text.replace(/\s+/g, " ").trim();

  const name = cleaned.match(/Name\s*[:|]?\s*([A-Za-z\s]+)/i)?.[1]?.trim() || null;
  const rollNo =
    cleaned.match(/Roll\s*No[:|]?\s*([0-9]{6,})/i)?.[1] ||
    cleaned.match(/\b(0\d{8,}|[0-9]{8,})\b/)?.[1] || null;
  const semester = cleaned.match(/\bSemester\b[^0-9]{0,3}(\d{1,2})/i)?.[1] || null;
  const branch = cleaned.match(/Branch\s*[:|]?\s*([A-Za-z]+)/i)?.[1]?.trim() || null;

  let sgpa = cleaned.match(/SGPA\s*[:\-]?\s*(\d+\.\d+)/i)?.[1];
  let cgpa = cleaned.match(/CGPA\s*[:\-]?\s*(\d+\.\d+)/i)?.[1];

  if (!sgpa || !cgpa) {
    const floats = cleaned.match(/(\d+\.\d+)/g) || [];
    if (floats.length >= 2) { sgpa = sgpa || floats[0]; cgpa = cgpa || floats[1]; }
    else if (floats.length === 1) { sgpa = sgpa || floats[0]; }
  }

  const university = cleaned.match(/Rajiv Gandhi Proudyogiki Vishwavidyalaya/i)
    ? "Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal"
    : null;

  return { name, rollNo, semester, branch, sgpa, cgpa, university };
}

// Upload route
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { userId } = req.body;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const extracted = await extractInfo(req.file.path);

    // Prevent duplicate uploads
    const existing = await pool.query(
      "SELECT * FROM results WHERE roll_no = $1 AND branch = $2",
      [extracted.rollNo, extracted.branch]
    );

    if (existing.rows.length > 0) {
      fs.unlinkSync(req.file.path); // cleanup uploaded file
      return res.status(400).json({ error: "Marksheets already uploaded for this Roll No and Branch" });
    }

    const result = await pool.query(
      `INSERT INTO results (user_id, filename, name, roll_no, semester, branch, sgpa, cgpa, university)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        userId || null,
        req.file.filename,
        extracted.name,
        extracted.rollNo,
        extracted.semester,
        extracted.branch,
        extracted.sgpa,
        extracted.cgpa,
        extracted.university,
      ]
    );

    res.json({ message: "File uploaded & data saved", data: result.rows[0] });

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;


