import express from "express";
import cors from "cors";
import http from "http";
import { configDotenv } from "dotenv";
import pool from "./functions/database.js";


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
    origin: "http://localhost:4100",
    credentials: true,
  })
);

const server = http.createServer(app);
// Routers
import Admin from "./Routers/Admin/index.js";
Admin.forEach((index) =>app.use(`/admin${index.path}`, index.component));

try {
  server.listen(process.env.PORT || 3000, () =>
    console.log("Server ishga tushdi : ", server.address().port)
  );
} catch (error) {
  console.log(error);
}
