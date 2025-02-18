import { verify } from "../../functions/JWTAdmin.js";
import { Router } from "express";
import pool from "../../functions/database.js";
import Joi from "joi";

const router = Router();
// path : http://localhost:4100/admin/food/get?page=1&size=18&lang=en&order=za tags food ADMIN

router.get("/", verify, async (req, res) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).required(),
    size: Joi.number().integer().min(1).required(),
    lang: Joi.string().valid("uz", "kril", "rus", "en").required(),
    order: Joi.string().valid("az", "za").required(),
    category : Joi.string().uuid().required()
  });

  const { error, value } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { page, size, lang, order, category } = value;
  const order_by = order === "az" ? "ASC" : "DESC";
  try {
    const query = `
Select 
food.id as id,
food.name_${lang} as name,
food.created_at as creted_at,
food.description as description,
food.price as price,
food.amount as amount,
REPLACE(food.image_url ::text, '/uploads', '') as image_url,
food.param as param,
food.status as status,
food.discount as discount,
food.discount_value as discount_value,
food.format as format,
(SELECT COUNT(*) FROM food where food.category_id = $3) AS all,
admin.lastname || ' ' || admin.firstname AS created_by,
food_category.id as food_category_id,
food_category.name_${lang} as food_category_name
from food
inner join admin on admin.id = food.created_by
inner join food_category on food_category.id = food.category_id 
where food.category_id = $3
ORDER BY food.name_${lang} ${order_by}

        OFFSET $1 LIMIT $2;
      `;

    const data = await pool.query(query, [(page - 1) * size, size, category]);

    return res.status(200).send(data.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send({ error: "Server error" });
  }
});

export default router;
/**
 * @swagger
 * /admin/food/get:
 *   get:
 *     summary: Get a list of food items by category with pagination and sorting
 *     tags: 
 *       - Food
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
 *         name: lang
 *         required: true
 *         schema:
 *           type: string
 *           enum: [uz, kril, rus, en]
 *         description: The language for the food name
 *       - in: query
 *         name: order
 *         required: true
 *         schema:
 *           type: string
 *           enum: [az, za]
 *         description: The order direction (az for ascending, za for descending)
 *       - in: query
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the food category
 *     responses:
 *       200:
 *         description: A list of food items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   amount:
 *                     type: number
 *                   image_url:
 *                     type: string
 *                   param:
 *                     type: string
 *                   status:
 *                     type: boolean
 *                   discount:
 *                     type: boolean
 *                   discount_value:
 *                     type: number
 *                   format:
 *                     type: string
 *                   all:
 *                     type: integer
 *                   created_by:
 *                     type: string
 *                   food_category_id:
 *                     type: string
 *                   food_category_name:
 *                     type: string
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