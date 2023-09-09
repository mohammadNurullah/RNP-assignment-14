// middleware/authMiddleware.js
import { verifyToken } from "../utils/auth";

export default function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }

  req.user = user;
  next();
}
