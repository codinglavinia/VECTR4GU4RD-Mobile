import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("VectraGuard API running ✅");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Backend running on http://localhost:3000");
});