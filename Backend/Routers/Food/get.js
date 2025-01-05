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
  });

  const { error, value } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { page, size, lang, order } = value;
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
(SELECT COUNT(*) FROM food) AS all,
admin.lastname || ' ' || admin.firstname AS created_by,
food_category.id as food_category_id,
food_category.name_${lang} as food_category_name
from food
inner join admin on admin.id = food.created_by
inner join food_category on food_category.id = food.category_id 
ORDER BY food.name_${lang} ${order_by}

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
