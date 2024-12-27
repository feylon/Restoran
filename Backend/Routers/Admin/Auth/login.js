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
        Select  admin.password as pas, admin.id as id from admin where login = LOWER($1)
    group by admin.password, admin.id
    ;`,
      [login]
    );
    if (data.rows.length == 0)
      return res
        .status(400)
        .send({ error: "Login or password incorrect 🤢🤢🤢🤔" });
    const { id, pas } = data.rows[0];
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

export default router;
