// http://localhost:4100/admin/food/get?page=1&size=10&lang=uz&order=az&search=Balyk tags food ADMIN
import { verify } from "../../functions/JWTAdmin.js";
import { Router } from "express";
import pool from "../../functions/database.js";
import Joi from "joi";

const router = Router();

router.get("/", verify, async (req, res) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).required(),
    size: Joi.number().integer().min(1).required(),
    lang: Joi.string().valid("uz", "kril", "rus", "en").required(),
    order: Joi.string().valid("az", "za").required(),
    search: Joi.string().required().max(10),
  });

  const { error, value } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { page, size, lang, order } = value;
  const order_by = order === "az" ? "ASC" : "DESC";
  let {search} = value
  if(search == "*") search = '';
  try {
    const query = `
Select 
food.id as key,
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
(SELECT COUNT(*) FROM food where food.name_${lang} ILIKE $3) AS all,
admin.lastname || ' ' || admin.firstname AS created_by,
food_category.id as food_category_id,
food_category.name_${lang} as food_category_name
from food
inner join admin on admin.id = food.created_by
inner join food_category on food_category.id = food.category_id 
where food.name_${lang} ILIKE $3
ORDER BY food.name_${lang} ${order_by}

        OFFSET $1 LIMIT $2;
      `;
    console.log(1);
    const data = await pool.query(query, [(page - 1) * size, size, `%${search}%`]);

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
 *     summary: Retrieve a list of food items with search functionality.
 *     description: Fetches a paginated list of food items, optionally filtered by search query and sorted by order and language. Requires admin authentication.
 *     tags:
 *       - Food (1)
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         description: The page number for pagination (must be 1 or greater).
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: size
 *         required: true
 *         description: The number of items per page (must be 1 or greater).
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: lang
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - uz
 *             - kril
 *             - rus
 *             - en
 *       - in: query
 *         name: order
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - az
 *             - za
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 10
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
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
 *                     type: string
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
 *                     type: integer
 *                   food_category_name:
 *                     type: string
 *       400:
 *         description: Invalid request parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
