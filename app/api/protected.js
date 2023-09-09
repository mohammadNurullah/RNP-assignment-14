// api/protected.js
import authMiddleware from "../../middleware/authMiddleware";

export default async function handler(req, res) {
  // Apply the auth middleware to this route
  authMiddleware(req, res, () => {
    // If the middleware passes, the user is authenticated
    res.status(200).json({ message: "Protected route accessed" });
  });
}
