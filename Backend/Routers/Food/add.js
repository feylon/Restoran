import pool from "../../functions/database.js";
import { verify } from "../../functions/JWTAdmin.js";
import { Router } from "express";
import Joi from "joi";

const router = Router();

router.post("/", verify, async(req, res)=>{
    res.status(200).send({id:req.ID})
});


export default router;