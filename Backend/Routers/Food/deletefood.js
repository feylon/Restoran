import { Router } from "express";
import pool from "../../functions/database.js";
import Joi from "joi";
import { verify } from "../../functions/JWTAdmin.js";
import fs from "fs";
import path from "path";

const router = Router();
// path http://localhost:4100/admin/food/deletefood/1e93553d-44b1-4b59-a2fb-96da2b25a000 food ADMIN
router.delete("/:id", verify, async (req, res) => {
  const Schema = Joi.object({ id: Joi.string().uuid().required() });
  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  const { id } = value;

  try {
    const data = await pool.query(
      `SELECT food.id, food.image_url FROM food WHERE food.id = $1;`,
      [id]
    );

    if (data.rows.length === 0) {
      return res.status(400).send({ error: "DATA NOT FOUND" });
    }

    const { image_url } = data.rows[0];

    if (image_url && Array.isArray(image_url)) {
      image_url.forEach((file) => {
        const filePath = path.resolve('uploads', file.replace(/^\/uploads\//, ''));

        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); 
            console.log(`${filePath} muvaffaqiyatli o'chirildi.`);
          } else {
            console.warn(`${filePath} mavjud emas.`);
          }
        } catch (err) {
          console.error(`Faylni o'chirishda xatolik yuz berdi: ${err.message}`);
        }
      });
    }

    await pool.query(`DELETE FROM food WHERE id = $1;`, [id]);

    return res.status(200).send({ message: "Fayllar va ma'lumot muvaffaqiyatli o'chirildi." });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
  }
});

export default router;

/**
 * @swagger
 * /admin/food/deletefood/{id}:
 *   delete:
 *     summary: Delete a food item and its associated images
 *     tags: 
 *       - Food
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the food item to delete
 *     responses:
 *       200:
 *         description: Files and data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Fayllar va ma'lumot muvaffaqiyatli o'chirildi."
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
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "DATA NOT FOUND"
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