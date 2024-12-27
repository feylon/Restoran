import JWT from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

function sign(id) {
  const { JWTADMIN } = process.env;
  const token = JWT.sign({ id }, JWTADMIN, { expiresIn: "1w" });
  const timestamp = JWT.verify(token, JWTADMIN).exp;

  const date = new Date(timestamp * 1000);

  const die = date.toISOString();

  return { token, die };
}
export { sign };
