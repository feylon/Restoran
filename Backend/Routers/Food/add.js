import pool from "../../functions/database.js";
import { verify } from "../../functions/JWTAdmin.js";
import { Router } from "express";
import Joi from "joi";

const router = Router();
const Schema = Joi.array().items(
  Joi.object({
    name_uz: Joi.string().max(50).required(),
    name_kril: Joi.string().max(50).required(),
    name_rus: Joi.string().max(50).required(),
    name_en: Joi.string().max(50).required(),
    description: Joi.string().allow(null, ""),
    price: Joi.number().min(0).precision(2).required(),
    amount: Joi.number().min(0).precision(2).required(),
    status: Joi.boolean().default(true),
    category_id: Joi.string().uuid().required(),
    discount: Joi.boolean().default(false),
    discount_value: Joi.number().min(0).precision(2).default(0),
    format: Joi.string().max(50).required(),
  })
);

router.post("/", verify, async (req, res) => {
  let { error, value } = Schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  await pool.query("BEGIN");

  try {
    for (const item of value) {
      let {
        name_uz,
        name_kril,
        name_rus,
        name_en,
        description,
        price,
        amount,
        status,
        category_id,
        discount,
        discount_value,
        format,
      } = item;

      let result = await pool.query(
        `INSERT INTO food (name_uz, name_kril, name_rus, name_en, description, price, amount, status, category_id, discount, discount_value, format, created_by) 
         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
        [
          name_uz,
          name_kril,
          name_rus,
          name_en,
          description,
          price,
          amount,
          status,
          category_id,
          discount,
          discount_value,
          format,
          req.ID,
        ]
      );
    }

    await pool.query("COMMIT");

    res.status(201).send({ message: "Data inserted successfully" });
  } catch (error) {
    await pool.query("ROLLBACK");
    if(error.code == '23503')
        return res.status(400).send({error :"Category not found"});
    if(error.code == '23505')
        return res.status(400).send({error : error.message});
    console.error("Error during transaction:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
