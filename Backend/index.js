import express from "express";
import cors from "cors";
import http from "http";
import { configDotenv } from "dotenv";
import pool from "./functions/database.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


(async () => {
  try {
    const client = await pool.connect();
    console.log("Database serverga ulanish muvaffaqiyatli amalga oshirildi");
    client.release();
  } catch (err) {
    console.log("Database serverga ulanishda xatolik:", err.stack);
  } finally {
    // await pool.end();
  }
})();

configDotenv();
const app = express();
app.use(express.json());
app.use(express.static("./uploads"))
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      status: "error",
      message: "JSON XATO 😢😢😢",
    });
  }
  next();
});
app.use(
  cors({
    // origin: "http://localhost:4100",
    // credentials: true,
  })
);

// Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for your application",
    },
    servers: [
      {
        url: "http://localhost:4100",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./Routers/**/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const server = http.createServer(app);
// Routers
import Admin from "./Routers/Admin/index.js";
import food_category from "./Routers/food_category/index.js";
import food from "./Routers/Food/index.js"
Admin.forEach((index) =>app.use(`/admin${index.path}`, index.component));
food_category.forEach((index) =>app.use(`/admin/food_category${index.path}`, index.component));
food.forEach((index) =>app.use(`/admin/food${index.path}`, index.component));


try {
  server.listen(process.env.PORT || 3000, () =>
    console.log("Server ishga tushdi : ", server.address().port)
  );
} catch (error) {
  console.log(error);
}
