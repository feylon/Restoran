import pool from "../../../functions/database.js";
import { Router } from "express";
import { verify } from "../../../functions/JWTAdmin.js";

const router = Router();
router.get("/", verify, async (req, res) => {
  try {
    const data = await pool.query(
      `
        
Select 
admin.name,
admin.login,
admin.lastname,
admin.firstname,
admin.birthday,
admin_permission.name as admin_name,
admin_permission.id as permission_id,
admin.email,
admin.profile_url
from admin
inner join admin_permission on admin.permission_id = admin_permission.id
where admin.id = $1 and admin.state and admin.active

        `,
      [req.ID]
    );
    if (data.rows.length == 0)
      return res.status(401).send({ error: "BLOCKED 🤢🤢🤢🤔" });
    res.status(200).send(data.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Server error 🤢🤢🤢🤔" });
  }
});

export default router;

/**
 * @swagger
 * /admin/profile:
 *   get:
 *     summary: Foydalanuvchi profilini olish
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchi profili
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John
 *                 login:
 *                   type: string
 *                   example: john_doe
 *                 lastname:
 *                   type: string
 *                   example: Doe
 *                 firstname:
 *                   type: string
 *                   example: John
 *                 birthday:
 *                   type: string
 *                   format: date
 *                   example: 1990-01-01
 *                 admin_name:
 *                   type: string
 *                   example: Admin
 *                 permission_id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 profile_url:
 *                   type: string
 *                   example: /uploads/profile.jpg
 *       401:
 *         description: Foydalanuvchi bloklangan
 *       500:
 *         description: Server xatosi
 */