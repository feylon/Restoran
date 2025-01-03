import { verify } from "../../functions/JWTAdmin.js";
import { Router } from "express";
import pool from "../../functions/database.js";
import Joi from "joi";

const router = Router();

const schema = Joi.object({
  name_uz: Joi.string().max(50).required(),
  name_kril: Joi.string().max(50).required(),
  name_rus: Joi.string().max(50).required(),
  name_en: Joi.string().max(50).required(),
  status: Joi.boolean().optional(),
  description: Joi.string().optional(),
});

router.post("/", verify, async (req, res) => {
  const { error, value } = schema.validate(req.body);
  console.log(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  let { name_uz, name_kril, name_rus, name_en, status, description } = value;
  name_uz = name_uz.trim();
  name_kril = name_kril.trim();
  name_rus = name_rus.trim();
  name_en = name_en.trim();
  try {
    const result = await pool.query(
      `INSERT INTO food_category (name_uz, name_kril, name_rus, name_en,  status, description, created_by)
       VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING name_uz, name_kril, name_rus, name_en,  status, description, id`,
      [name_uz, name_kril, name_rus, name_en, status, description, req.ID]
    );

    res.json(result.rows[0]);
  } catch (err) {
    if ((err.code = "23505"))
      return res.status(400).json({ error: err.detail });
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
