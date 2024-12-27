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
