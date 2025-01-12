import pool from "../../functions/database.js";
import { verify } from "../../functions/JWTAdmin.js";
import { Router } from "express";
import Joi from "joi";
// path http://localhost:4100/admin/food/add food ADMIN
const router = Router();
const Schema = Joi.array().items(
  Joi.object({
    name_uz: Joi.string().max(50).required(),
    name_kril: Joi.string().max(50).required(),
    name_rus: Joi.string().max(50).required(),
    name_en: Joi.string().max(50).required(),
    description: Joi.string().allow(null, ""),
    price: Joi.number().min(0).precision(2).required(),
    amount: Joi.number().min(0).precision(2).required(),
    status: Joi.boolean().default(true),
    category_id: Joi.string().uuid().required(),
    discount: Joi.boolean().default(false),
    discount_value: Joi.number().min(0).precision(2).default(0),
    format: Joi.string().max(50).required(),
  })
);

router.post("/", verify, async (req, res) => {
  let { error, value } = Schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  await pool.query("BEGIN");

  try {
    for (const item of value) {
      let {
        name_uz,
        name_kril,
        name_rus,
        name_en,
        description,
        price,
        amount,
        status,
        category_id,
        discount,
        discount_value,
        format,
      } = item;

      let result = await pool.query(
        `INSERT INTO food (name_uz, name_kril, name_rus, name_en, description, price, amount, status, category_id, discount, discount_value, format, created_by) 
         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
        [
          name_uz,
          name_kril,
          name_rus,
          name_en,
          description,
          price,
          amount,
          status,
          category_id,
          discount,
          discount_value,
          format,
          req.ID,
        ]
      );
    }

    await pool.query("COMMIT");

    res.status(201).send({ message: "Data inserted successfully" });
  } catch (error) {
    await pool.query("ROLLBACK");
    if(error.code == '23503')
        return res.status(400).send({error :"Category not found"});
    if(error.code == '23505')
        return res.status(400).send({error : error.message});
    console.error("Error during transaction:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
/**
 * @swagger
 * /admin/food/add:
 *   post:
 *     summary: Add new food items
 *     tags: 
 *       - Food
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name_uz:
 *                   type: string
 *                   maxLength: 50
 *                   example: "O'zbekcha nomi"
 *                 name_kril:
 *                   type: string
 *                   maxLength: 50
 *                   example: "Кириллча номи"
 *                 name_rus:
 *                   type: string
 *                   maxLength: 50
 *                   example: "Русское название"
 *                 name_en:
 *                   type: string
 *                   maxLength: 50
 *                   example: "English name"
 *                 description:
 *                   type: string
 *                   example: "Description of the food item"
 *                 price:
 *                   type: number
 *                   minimum: 0
 *                   example: 10.99
 *                 amount:
 *                   type: number
 *                   minimum: 0
 *                   example: 100
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 category_id:
 *                   type: string
 *                   format: uuid
 *                   example: "0a5d9485-7cad-47fe-814d-c7bfc488f1b0"
 *                 discount:
 *                   type: boolean
 *                   example: false
 *                 discount_value:
 *                   type: number
 *                   minimum: 0
 *                   example: 0
 *                 format:
 *                   type: string
 *                   maxLength: 50
 *                   example: "Format of the food item"
 *     responses:
 *       201:
 *         description: Data inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data inserted successfully"
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