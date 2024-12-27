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

function verify(req, res, next) {
  const { JWTADMIN } = process.env;
  try {
    const token = req.headers.authorization.split(" ")[1];

    const user = JWT.verify(token, JWTADMIN);
    req.ID = user.id;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Token not found 🤢🤢🤢🤔" });
  }
}
export { sign, verify };
