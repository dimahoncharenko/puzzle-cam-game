// Imports libraries
import { Router } from "express";

// Imports data models
import { RecordsAPI } from "../models/records";

const router = Router();
const recordsAPI = new RecordsAPI();

router.get("/records", async (req, res) => {
  const records = await recordsAPI.getRecords();
  res.json(records);
});

router.post("/record/add", async (req, res) => {
  const { name, time, difficulty } = req.body;

  if (!name || !time || !difficulty) {
    return res
      .status(400)
      .json("Please provide full and correct data records!");
  }

  const newRecord = {
    name,
    time,
    difficulty,
  };

  const op = await recordsAPI.addRecord(newRecord);
  if (!op) {
    return res.json(op);
  }

  res.json(true);
});

export default router;
