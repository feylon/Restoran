import express from "express";
import cors from "cors";
import http from "http";
import { configDotenv } from "dotenv";

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

app.use("/", (req, res) => {
  res.send("Salom");
});
const server = http.createServer(app);

try {
  server.listen(process.env.PORT || 3000, () =>
    console.log("Server ishga tushdi : ", server.address().port)
  );
} catch (error) {
  console.log(error);
}
