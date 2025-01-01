import express from "express";
import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
import pool from "../../../functions/database.js"; 
import crypto from "crypto"; 

configDotenv();

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await pool.query("SELECT id FROM admin WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(404).send({ error: "Foydalanuvchi topilmadi" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const expires = new Date(Date.now() + 3600000); // 1 soat
    await pool.query(
      "UPDATE admin SET reset_password_token = $1, reset_password_expires = $2 WHERE email = $3",
      [token, expires, email]
    );

    const mailOptions = {
      from: {
        name: "Ergashev Jamshid",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: "Parolni tiklash",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Parolni tiklash so'rovi</h2>
          <p>Siz (yoki boshqa birov) hisobingiz uchun parolni tiklashni so'raganingiz sababli ushbu xabarni oldingiz.</p>
          <p>Jarayonni yakunlash uchun quyidagi havolani bosing yoki brauzeringizga nusxa ko'chiring:</p>
          <a href="http://${req.headers.host}/#/admin/reset/${token}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #007bff; border-radius: 5px; text-decoration: none;">Parolni tiklash</a>
          <p>Agar siz bu so'rovni qilmagan bo'lsangiz, iltimos, ushbu xabarni e'tiborsiz qoldiring va parolingiz o'zgarmaydi.</p>
          <p>Rahmat,<br/>Ergashev Jamshid</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .send({
        message:
          "Parolni tiklash uchun elektron pochta muvaffaqiyatli yuborildi",
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Server xatosi" });
  }
});

export default router;

/**
 * @swagger
 * /admin/forgotpassword:
 *   post:
 *     summary: Parolni tiklash uchun elektron pochta yuborish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Parolni tiklash uchun elektron pochta muvaffaqiyatli yuborildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Parolni tiklash uchun elektron pochta muvaffaqiyatli yuborildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */