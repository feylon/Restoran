import Joi from "joi";
import { verify } from "../../../functions/JWTAdmin.js";
import axios from "axios";
import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.get("/", verify, async (req, res) => {
  const Schema = Joi.object({
    city: Joi.string().required().max(25),
  });
  const checkSchema = Schema.validate(req.query);
  if (checkSchema.error)
    return res.status(400).send({ error: checkSchema.error.message });
  const { city } = checkSchema.value;
  const apiKey = process.env.WEATHER_API_KEY;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

  try {
    const response = await axios.get(apiUrl);
    const { temp } = response.data.main;
    const weatherDescription = response.data.weather[0].description;
    const iconCode = response.data.weather[0].icon;

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return res.status(200).send({
      temperature: temp,
      condition: weatherDescription,
      iconUrl: iconUrl,
    });
  } catch (error) {
    res.status(500).send({ error: "Server error 🤢🤢🤢🤔" });
    console.log(error);
  }
});

export default router;
