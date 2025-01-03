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
    if ((err.code == "23505"))
      return res.status(400).json({ error: err.detail });
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

/**
 * @swagger
 * /admin/food_category/add:
 *   post:
 *     summary: Add a new food category
 *     tags: 
 *       - Food Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_uz:
 *                 type: string
 *                 maxLength: 50
 *                 example: "O'zbekcha nomi"
 *               name_kril:
 *                 type: string
 *                 maxLength: 50
 *                 example: "Кириллча номи"
 *               name_rus:
 *                 type: string
 *                 maxLength: 50
 *                 example: "Русское название"
 *               name_en:
 *                 type: string
 *                 maxLength: 50
 *                 example: "English name"
 *               status:
 *                 type: boolean
 *                 example: true
 *               description:
 *                 type: string
 *                 example: "Description of the food category"
 *     responses:
 *       200:
 *         description: Food category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name_uz:
 *                   type: string
 *                 name_kril:
 *                   type: string
 *                 name_rus:
 *                   type: string
 *                 name_en:
 *                   type: string
 *                 status:
 *                   type: boolean
 *                 description:
 *                   type: string
 *                 id:
 *                   type: string
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 *     security:
 *       - bearerAuth: []
 */