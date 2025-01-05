import { Router } from "express";
import multer from "multer";
import pool from "../../functions/database.js";
import { verify } from "../../functions/JWTAdmin.js";
import path from "path";
import md5 from "md5";
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/food/");
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
      `SELECT id FROM food WHERE id = $1`,
      [req.params.id]
    );
    if (data.rows.length === 0) {
      return res.status(404).send({ error: "Food not found" });
    }
  } catch (error) {
    if (error.code === "22P02") {
      return res.status(404).send({ error: "Food not found." });
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
        return res.status(400).send({ error: "Photo not found" });
      }

      const profilePhotoPath = `/uploads/food/${req.file.filename}`;



      await pool.query(
        `Update food set  image_url = array_append(image_url, $1) where id = $2;`,
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