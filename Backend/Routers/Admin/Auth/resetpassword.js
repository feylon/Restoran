import express from "express";
import pool from "../../../functions/database.js";
import { hash } from "../../../functions/bcrypt.js";
import Joi from "joi";

const router = express.Router();

const schema = Joi.object({
  token: Joi.string().required(),
  newpassword: Joi.string().min(8).max(30).required(),
});

router.post("/", async (req, res) => {
  const { token, newpassword } = req.body;

  const { error } = schema.validate({ token, newpassword });
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  try {
    const user = await pool.query(
      "SELECT id FROM admin WHERE reset_password_token = $1 AND reset_password_expires > $2",
      [token, new Date()]
    );

    if (user.rows.length === 0) {
      return res.status(400).send({ error: "Token eskirdi" });
    }

    const hashedPassword = hash(newpassword);

    await pool.query(
      "UPDATE admin SET password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2",
      [hashedPassword, user.rows[0].id]
    );

    res.status(200).send({ message: "Parol o'zgartirildi" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Server error" });
  }
});

export default router;

/**
 * @swagger
 * /admin/auth/resetpassword:
 *   post:
 *     summary: Parolni tiklash
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: abc123token
 *               newpassword:
 *                 type: string
 *                 example: NewPassword!123
 *     responses:
 *       200:
 *         description: Parol muvaffaqiyatli o'zgartirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Parol o'zgartirildi
 *       400:
 *         description: Token eskirdi yoki yaroqsiz ma'lumot
 *       500:
 *         description: Server xatosi
 */