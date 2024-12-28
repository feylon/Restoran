import { Router } from "express";
import multer from "multer";
import pool from "../../../functions/database.js";
import { verify } from "../../../functions/JWTAdmin.js";
import path from "path";
import fs from "fs";
import md5 from "md5";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile_pics/'); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${md5(Date.now().toString())}${ext}`); 
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only .jpg and .png files are allowed"));
  }
};

const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB 
  fileFilter
});

router.post("/", verify, (req, res) => {
  upload.single('profile_photo')(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send({ error: "File size exceeds 2MB limit" });
      }
      if (err.message === "Only .jpg and .png files are allowed") {
        return res.status(400).send({ error: err.message });
      }
      return res.status(500).send({ error: "Server error 🤢🤢🤢🤔" });
    }

    try {
      const profilePhotoPath = `/uploads/profile_pics/${req.file.filename}`;
      
      const oldPhoto = await pool.query(
        `SELECT profile_url FROM admin WHERE id = $1`,
        [req.ID]
      );
      try {
        if (oldPhoto.rows[0].profile_url) {
          fs.unlinkSync(path.join(`${process.cwd()}/`, oldPhoto.rows[0].profile_url));
        }
      } catch (error) {
      }

      await pool.query(
        `UPDATE admin SET profile_url = $1 WHERE id = $2`,
        [profilePhotoPath, req.ID]
      );

      res.status(200).send({ message: "Profile photo updated successfully 😎😎😎" });
    } catch (error) {
      if (error.message === "Cannot read properties of undefined (reading 'filename')") {
        return res.status(400).send({ error: "Profile photo not found" });
      }
      console.log(error.message);
      res.status(500).send({ error: "Server error 🤢🤢🤢🤔" });
    }
  });
});

export default router;

/**
 * @swagger
 * /admin/changephoto:
 *   post:
 *     summary: Profil rasmini o'zgartirish
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile_photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profil rasmi muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile photo updated successfully 😎😎😎
 *       400:
 *         description: Noto'g'ri fayl turi yoki hajmi
 *       500:
 *         description: Server xatosi
 */