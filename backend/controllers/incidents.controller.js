import { db } from "../firebase.js";

export async function getIncidents(_, res) {
  const snapshot = await db.collection("incidents").get();
  const data = snapshot.docs.map(d => d.data());
  res.json(data);
}

export async function createIncident(req, res) {
  await db.collection("incidents").add(req.body);
  res.status(201).send("Incident created");
}
