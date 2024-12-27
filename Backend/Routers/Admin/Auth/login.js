import e, { Router } from "express";
import Joi from "joi";
import { check_hash } from "../../../functions/bcrypt.js";
import pool from "../../../functions/database.js";
import { sign } from "../../../functions/JWTAdmin.js";

const Schema = Joi.object({
  login: Joi.string().required().max(15),
  password: Joi.string().required().max(25),
});
const router = Router();
router.post("/", async (req, res) => {
  const checkSchema = Schema.validate(req.body);

  if (checkSchema.error)
    return res.status(400).send({ error: checkSchema.error.message });
  const { login, password } = checkSchema.value;
  try {
    const data = await pool.query(
      `
        Select  admin.password as pas, admin.id as id, admin.active as active from admin where login = LOWER($1) and admin.state
    group by admin.password, admin.id
    ;`,
      [login]
    );
    if (data.rows.length == 0)
      return res
        .status(400)
        .send({ error: "Login or password incorrect 🤢🤢🤢🤔" });
        const { id, pas, active } = data.rows[0];
    if  (!active) return res.status(400).send({ error: "Account is blocked 🤢🤢🤢🤔" });
    if (check_hash(password, pas)) {
      const { token, die } = sign(id);
      return res.status(200).send({ token, die });
    } else
      return res
        .status(400)
        .send({ error: "Login or password incorrect 🤢🤢🤢🤔" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Server error 🤢🤢🤢🤔" });
  }
});
// For use token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzNGI0MDc4LWQ1YTctNGM1NC1hNjcyLWNhYmNhM2I5NDMzMyIsImlhdCI6MTczNTI5OTI4MywiZXhwIjoxNzM1OTA0MDgzfQ.FpRZRvs4vUUIjHPZDRg2am1Dezi_BaA2Wu8gm25gzpg
export default router;