import { Router } from "express";
import multer from "multer";
import pool from "../../../functions/database.js";
import { verify } from "../../../functions/JWTAdmin.js";
import path from "path";
import fs from "fs";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.ID}${ext}`); 
  }
});

const upload = multer({ storage });

router.post("/", verify, upload.single('profile_photo'), async (req, res) => {
  try {
    const profilePhotoPath = `/uploads/${req.file.filename}`;
    
    const oldPhoto = await pool.query(
      `SELECT profile_url FROM admin WHERE id = $1`,
      [req.ID]
    );
    if (oldPhoto.rows[0].profile_url) {
      fs.unlinkSync(path.join(__dirname, '../../../', oldPhoto.rows[0].profile_url));
    }

    await pool.query(
      `UPDATE admin SET profile_url = $1 WHERE id = $2`,
      [profilePhotoPath, req.ID]
    );

    res.status(200).send({ message: "Profile photo updated successfully 😎😎😎" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Server error 🤢🤢🤢🤔" });
  }
});

export default router;