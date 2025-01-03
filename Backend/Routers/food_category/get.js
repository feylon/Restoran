import { verify } from "../../functions/JWTAdmin.js";
import { Router } from "express";
import pool from "../../functions/database.js";
import Joi from "joi";

const router = Router();
// path : http://localhost:4100/admin/food_category/get?page=2,1&size=1&order_type=name_uz&order=az
const schema = Joi.object({
  page: Joi.number().min(0).integer().required(),
  size: Joi.number().min(0).integer().required(),
  order_type: Joi.string()
    .valid("name_uz", "name_kril", "name_rus", "name_en")
    .required(),
  order: Joi.string().valid("az", "za").required(),
});

router.get("/", verify, async (req, res) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).required(),
    size: Joi.number().integer().min(1).required(),
    order_type: Joi.string()
      .valid("id", "name_uz", "name_kril", "name_rus", "name_en", "status")
      .required(),
    order: Joi.string().valid("az", "za").required(),
  });

  const { error, value } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { page, size, order_type, order } = value;
  const order_by = order === "az" ? "ASC" : "DESC";

  try {
    const query = `
        SELECT 
          food_category.id,
          food_category.name_uz, 
          food_category.name_kril,
          food_category.name_rus, 
          food_category.name_en, 
          food_category.status, 
          food_category.description,
          (SELECT COUNT(*) FROM food_category) AS all
        FROM food_category
        ORDER BY ${order_type} ${order_by}
        OFFSET $1 LIMIT $2;
      `;

    const data = await pool.query(query, [(page - 1) * size, size]);

    return res.status(200).send(data.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send({ error: "Server error" });
  }
});

export default router;

/**
 * @swagger
 * /admin/food_category/get:
 *   get:
 *     summary: Get a list of food categories with pagination and sorting
 *     tags:
 *       - Food Category
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: size
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The number of items per page
 *       - in: query
 *         name: order_type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [id, name_uz, name_kril, name_rus, name_en, status]
 *         description: The field to sort by
 *       - in: query
 *         name: order
 *         required: true
 *         schema:
 *           type: string
 *           enum: [az, za]
 *         description: The order direction (az for ascending, za for descending)
 *     responses:
 *       200:
 *         description: A list of food categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name_uz:
 *                     type: string
 *                   name_kril:
 *                     type: string
 *                   name_rus:
 *                     type: string
 *                   name_en:
 *                     type: string
 *                   status:
 *                     type: boolean
 *                   description:
 *                     type: string
 *                   all:
 *                     type: integer
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
 *                   example: "Server error"
 *     security:
 *       - bearerAuth: []
 */
