import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token, "token");
  if (!token) {
    return res.status(401).send("You are not authenticated");
  }
  const check = await jwt.verify(
    token,
    process.env.JWT_KEY,
    async (err, payload) => {
      if (err) return res.status(401).send("Token is not valid");
      req.userId = payload.userId;
    }
  );
  console.log("middleware");
  next();
};
