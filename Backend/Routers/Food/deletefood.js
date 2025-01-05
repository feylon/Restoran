import { Router } from "express";
import pool from "../../functions/database.js";
import Joi from "joi";
import { verify } from "../../functions/JWTAdmin.js";
import fs from "fs";
import path from "path";

const router = Router();

router.delete("/:id", verify, async (req, res) => {
  const Schema = Joi.object({ id: Joi.string().uuid().required() });
  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  const { id } = value;

  try {
    const data = await pool.query(
      `SELECT food.id, food.image_url FROM food WHERE food.id = $1;`,
      [id]
    );

    if (data.rows.length === 0) {
      return res.status(400).send({ error: "DATA NOT FOUND" });
    }

    const { image_url } = data.rows[0];

    if (image_url && Array.isArray(image_url)) {
      image_url.forEach((file) => {
        const filePath = path.resolve('uploads', file.replace(/^\/uploads\//, ''));

        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); 
            console.log(`${filePath} muvaffaqiyatli o'chirildi.`);
          } else {
            console.warn(`${filePath} mavjud emas.`);
          }
        } catch (err) {
          console.error(`Faylni o'chirishda xatolik yuz berdi: ${err.message}`);
        }
      });
    }

    await pool.query(`DELETE FROM food WHERE id = $1;`, [id]);

    return res.status(200).send({ message: "Fayllar va ma'lumot muvaffaqiyatli o'chirildi." });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
  }
});

export default router;
