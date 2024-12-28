import { Router } from "express";
import pool from "../../../functions/database.js";
import { check_hash, hash } from "../../../functions/bcrypt.js";
import { verify } from "../../../functions/JWTAdmin.js";
import Joi from "joi";
import {joiPasswordExtendCore} from "joi-password";

const joiPassword = Joi.extend(joiPasswordExtendCore);

const schema = Joi.object({
  oldpassword: Joi.string().min(8).max(30).required(),
  newpassword: joiPassword
    .string()
    .min(8)
    .max(30)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required(),
});

const router = Router();
router.post("/", verify, async (req, res) => {
  const checkSchema = schema.validate(req.body);
  const { oldpassword, newpassword } = checkSchema.value;
  if (checkSchema.error)
    return res.status(400).send({ error: checkSchema.error.message });
  try {
    const data = await pool.query(
      `SELECT password as pas FROM admin
       WHERE id = $1 AND state AND active;`,
      [req.ID]
    );
    if (data.rows.length == 0)
      return res.status(401).send({ error: "BLOCKED 🤢🤢🤢🤔" });
    if (!check_hash(oldpassword, data.rows[0].pas))
      return res.status(400).send({ error: "Password incorrect 🤢🤢🤢🤔" });
    const hash_password = hash(newpassword);
    await pool.query(`UPDATE admin SET password = $1 WHERE id = $2;`, [
      hash_password,
      req.ID,
    ]);
    res.status(200).send({ message: "Password changed 😎😎😎" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Server error 🤢🤢🤢🤔" });
  }
});

export default router;

/**
 * @swagger
 * /admin/changepassword:
 *   post:
 *     summary: Parolni o'zgartirish
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldpassword:
 *                 type: string
 *                 example: oldpassword123
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
 *                   example: Password changed 😎😎😎
 *       400:
 *         description: Parol noto'g'ri yoki hisob bloklangan
 *       401:
 *         description: Foydalanuvchi bloklangan
 *       500:
 *         description: Server xatosi
 */