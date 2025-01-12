import { verify } from "../../functions/JWTAdmin.js";
import { Router } from "express";
import pool from "../../functions/database.js";
import Joi from "joi";

const router = Router();

const schema = Joi.object({
  name_uz: Joi.string().max(50).min(3).required().messages({
    "string.base": "O'zbekcha nomi matn bo'lishi kerak",
    "string.empty": "O'zbekcha nomi kiritilishi shart",
    "string.min": "O'zbekcha nomi kamida 3 ta belgidan iborat bo'lishi kerak",
    "string.max": "O'zbekcha nomi 50 ta belgidan oshmasligi kerak",
    "any.required": "O'zbekcha nomi kiritilishi shart",
  }),
  name_kril: Joi.string().max(50).min(3).required().messages({
    "string.base": "Кириллча номи matn bo'lishi kerak",
    "string.empty": "Кириллча номи kiritilishi shart",
    "string.min": "Кириллча номи kamida 3 ta belgidan iborat bo'lishi kerak",
    "string.max": "Кириллча номи 50 ta belgidan oshmasligi kerak",
    "any.required": "Кириллча номи kiritilishi shart",
  }),
  name_rus: Joi.string().max(50).min(3).required().messages({
    "string.base": "Русское название matn bo'lishi kerak",
    "string.empty": "Русское название kiritilishi shart",
    "string.min": "Русское название kamida 3 ta belgidan iborat bo'lishi kerak",
    "string.max": "Русское название 50 ta belgidan oshmasligi kerak",
    "any.required": "Русское название kiritilishi shart",
  }),
  name_en: Joi.string().max(50).min(3).required().messages({
    "string.base": "English name must be a string",
    "string.empty": "English name is required",
    "string.min": "English name must be at least 3 characters",
    "string.max": "English name must not exceed 50 characters",
    "any.required": "English name is required",
  }),
  status: Joi.boolean().required().messages({
    "boolean.base": "Status must be a boolean value",
    "any.required": "Status is required",
  }),
  description: Joi.string().min(3).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "string.min": "Description must be at least 3 characters",
    "any.required": "Description is required",
  }),
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
      return res.status(409).json({ error: err.detail });
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