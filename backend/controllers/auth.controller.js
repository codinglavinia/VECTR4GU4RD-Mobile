import { auth } from "../firebase.js";

export async function login(req, res) {
  const { uid } = req.body;

  try {
    const token = await auth.createCustomToken(uid);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
