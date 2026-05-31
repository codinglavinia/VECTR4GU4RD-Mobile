import express from "express";
import {
  getIncidents,
  createIncident,
} from "../controllers/incidents.controller.js";

const router = express.Router();

router.get("/", getIncidents);
router.post("/", createIncident);

export default router;
