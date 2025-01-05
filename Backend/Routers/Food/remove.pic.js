import { Router } from "express";
import pool from "../../functions/database.js";
import { verify } from "../../functions/JWTAdmin.js";
import path from "path";
import fs from "fs";
import Joi from "joi";
const router = Router();
// http://localhost:4100/admin/food/remove_pic tags food ADMIN
router.post("/", verify, async (req, res) => {
  const Schema = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().required(),
  });

  const { error, value } = Schema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  console.log(value);
  const { id, name } = value;
  try {
    const data = await pool.query(
      `SELECT
  array_position(image_url, $1) AS url_index,
  CASE
    WHEN array_position(image_url, $1) IS NOT NULL THEN image_url[array_position(image_url, $1)]
    ELSE NULL
  END AS url_value
FROM
  food
WHERE
  id = $2;

`,
      [`/uploads${name}`, id]
    );
    console.log(data.rows[0]);
    if (data.rows[0] === undefined) {
      return res.status(400).send("Image not found");
    }
    ``;
    if (data.rows[0].url_index === null) {
      return res.status(400).send("Image not found");
    }
    const { url_value, url_index } = data.rows[0];
    try {
      fs.unlinkSync(path.join(`${process.cwd()}`, url_value));
    } catch (error) {
      console.log("Error deleting old food photo:", error);
      return res.status(500).send({ error: "Server error" });
    }

    try {
      await pool.query(
        `update food set  image_url = array_remove(image_url, $1) 
WHERE id = $2;
`,
        [url_value, id]
      );
    } catch (error) {
      console.log("Update error");
      console.log(error);
      return res.status(500).send({ error: "Server error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server error" });
  }
  res.status(200).send({ message: "Image removed" });
});

export default router;
