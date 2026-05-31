import { auth } from "../firebase.js";

export async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(403).send("No token");

  try {
    req.user = await auth.verifyIdToken(token);
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}
