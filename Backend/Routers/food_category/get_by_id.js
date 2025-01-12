import { verify } from "../../functions/JWTAdmin.js";
import { Router } from "express";
import pool from "../../functions/database.js";
import Joi from "joi";

const router = Router();
// http://localhost:4100/admin/food_category/get_by_id/fc455f64-9d6a-4a93-bf9f-1ba4e01a81d2 TAGS  : Food Category
const schema = Joi.object({
  id : Joi.string().required().uuid()
});

router.get("/:id", verify, async (req, res) => {
  

  const { error, value } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

    const { id } = value;

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
          REPLACE(food_category.image_url ::text, '/uploads', '') as image_url
          
        FROM food_category
        WHERE food_category.id = $1;
      `;

    const data = await pool.query(query, [id]);

    return res.status(200).send(data.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send({ error: "Server error" });
  }
});

export default router;
/**
 * @swagger
 * /admin/food_category/get_by_id/{id}:
 *   get:
 *     summary: Get a food category by ID
 *     tags: 
 *       - Food Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the food category
 *     responses:
 *       200:
 *         description: A food category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
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
 *                 image_url:
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
 *         description: Food category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Food category not found"
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