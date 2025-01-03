import { verify } from "../../functions/JWTAdmin.js";
import { Router } from "express";
import pool from "../../functions/database.js";
import Joi from "joi";

const router = Router();
// path : http://localhost:4100/admin/food_category/edit/0a5d9485-7cad-47fe-814d-c7bfc488f1b0
const schema = Joi.object({
  name_uz: Joi.string().max(50).required(),
  name_kril: Joi.string().max(50).required(),
  name_rus: Joi.string().max(50).required(),
  name_en: Joi.string().max(50).required(),
  status: Joi.boolean().optional(),
  description: Joi.string().optional(),
});

router.put("/:id", verify, async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  let { name_uz, name_kril, name_rus, name_en, status, description } = value;
  name_uz = name_uz.trim();
  name_kril = name_kril.trim();
  name_rus = name_rus.trim();
  name_en = name_en.trim();

  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE food_category
       SET name_uz = $1, name_kril = $2, name_rus = $3, name_en = $4, status = $5, description = $6 
       WHERE id = $7
       RETURNING name_uz, name_kril, name_rus, name_en, status, description, id`,
      [name_uz, name_kril, name_rus, name_en, status, description,  id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    if(err.code == "22P02") return res.status(400).send({ error: "UUID error" });
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

/**
 * @swagger
 * /admin/food_category/edit/{id}:
 *   put:
 *     summary: Edit a food category
 *     tags: 
 *       - Food Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the food category
 *       - in: body
 *         name: body
 *         required: true
 *         description: The food category data to update
 *         schema:
 *           type: object
 *           properties:
 *             name_uz:
 *               type: string
 *               maxLength: 50
 *               example: "O'zbekcha nomi"
 *             name_kril:
 *               type: string
 *               maxLength: 50
 *               example: "Кириллча номи"
 *             name_rus:
 *               type: string
 *               maxLength: 50
 *               example: "Русское название"
 *             name_en:
 *               type: string
 *               maxLength: 50
 *               example: "English name"
 *             status:
 *               type: boolean
 *               example: true
 *             description:
 *               type: string
 *               example: "Description of the food category"
 *     responses:
 *       200:
 *         description: Food category updated successfully
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
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Category not found"
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
