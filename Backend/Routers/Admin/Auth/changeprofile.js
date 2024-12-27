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