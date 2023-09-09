// utils/auth.js
import jwt from "jsonwebtoken";

// Secret key for JWT (should be stored in environment variables)
const SECRET_KEY = "your-secret-key";

export const createToken = (user) => {
  return jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
};

export const setTokenInHeaders = (user, res) => {
  const token = createToken(user);
  res.setHeader("Authorization", `Bearer ${token}`);
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null; // Token is invalid
  }
};

// utils/auth.js (continued)
export const decodeToken = (token) => {
  return jwt.decode(token);
};
