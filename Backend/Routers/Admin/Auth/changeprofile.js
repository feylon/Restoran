import { Router } from "express";
import pool from "../../../functions/database.js";
import { verify } from "../../../functions/JWTAdmin.js";
import Joi from "joi";

const schema = Joi.object({
    email : Joi.string().email().required(),
    firstname : Joi.string().min(3).max(50).required(),
    lastname : Joi.string().min(3).max(50).required(),
    birthday : Joi.date().required(),

});

const router = Router();
router.patch("/", verify, async (req, res) => {
const checkSchema = schema.validate(req.body);
if(checkSchema.error) return res.status(400).send({error: checkSchema.error.message});
const { email, firstname, lastname, birthday } = req.body;
try {
    await pool.query(
        `UPDATE admin SET email = $1, firstname = $2, lastname = $3, birthday = $4 WHERE id = $5 AND state AND active;`,
        [email, firstname, lastname, birthday, req.ID]
    );
    res.status(200).send({message: "Profile changed 😎😎😎"});

}
catch (error) {
    console.log(error.message);
    res.status(500).send({error: "Server error 🤢🤢🤢🤔"});
}});
export default router;
/**
 * @swagger
 * /admin/changeprofile:
 *   patch:
 *     summary: Profilni o'zgartirish
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
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *     responses:
 *       200:
 *         description: Profil muvaffaqiyatli o'zgartirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile changed 😎😎😎
 *       400:
 *         description: Yaroqsiz ma'lumot
 *       500:
 *         description: Server xatosi
 */
