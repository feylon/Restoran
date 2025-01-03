import { Router } from "express";
import multer from "multer";
import pool from "../../functions/database.js";
import { verify } from "../../functions/JWTAdmin.js";
import path from "path";
import fs from "fs";
import md5 from "md5";
//path : http://localhost:4100/admin/food_category/upload_pic/0a5d9485-7cad-47fe-814d-c7bfc488f1b0
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/food_category/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${md5(Date.now().toString())}${ext}`);
  },
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
  limits: { fileSize: 4 * 1024 * 1024 }, // 4MB
  fileFilter,
});

router.post("/:id", verify, async (req, res) => {
  try {
    const data = await pool.query(
      `SELECT id FROM food_category WHERE id = $1`,
      [req.params.id]
    );
    if (data.rows.length === 0) {
      return res.status(404).send({ error: "Category not found" });
    }
  } catch (error) {
    if (error.code === "22P02") {
      return res.status(404).send({ error: "Category not found." });
    }
    console.log(error);
    return res.status(500).send({ error: "Server error, [search] 🤢🤢🤢🤔" });
  }

  upload.single("photo")(req, res, async (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).send({ error: "Max size 4 MB" });
      }
      if (err.message === "Only .jpg and .png files are allowed") {
        return res.status(400).send({ error: err.message });
      }
      console.log(err);
      return res.status(500).send({ error: "Server error 🤢🤢🤢🤔" });
    }

    try {
      if (!req.file) {
        return res.status(400).send({ error: "Profile photo not found" });
      }

      const profilePhotoPath = `/uploads/food_category/${req.file.filename}`;

      const oldPhoto = await pool.query(
        `SELECT image_url FROM food_category WHERE id = $1`,
        [req.params.id]
      );
      
      try {
        if (oldPhoto.rows[0].image_url) {
          fs.unlinkSync(path.join(`${process.cwd()}/`, oldPhoto.rows[0].image_url));
        }
      } catch (error) {
        console.log("Error deleting old photo:", error);
      }

      await pool.query(
        `UPDATE food_category SET image_url = $1 WHERE id = $2`,
        [profilePhotoPath, req.params.id]
      );

      res.status(200).send({ message: "Photo updated successfully 😎😎😎" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: "Server error 🤢🤢🤢🤔!" });
    }
  });
});

export default router;

/**
 * @swagger
 * /admin/food_category/upload_pic/{id}:
 *   post:
 *     summary: Upload a picture
 *     description: Upload a picture to the server with Bearer token authentication.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the food category.
 *         schema:
 *           type: string
 *           example: 0a5d9485-7cad-47fe-814d-c7bfc488f1b0
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: The picture file to upload.
 *     responses:
 *       200:
 *         description: Successfully uploaded.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Upload successful."
 *                 data:
 *                   type: object
 *                   example: {}
 *       400:
 *         description: Bad request or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid file format."
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized."
 *     security:
 *       - bearerAuth: []
 */
