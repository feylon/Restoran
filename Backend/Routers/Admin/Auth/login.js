import {Router} from "express";
import Joi from "joi";
import {hash} from "../../../functions/bcrypt.js";
console.log(hash("!Salom12345678"))


const router = Router();
router.post("/", async (req, res)=>{
    
});

export default router;
