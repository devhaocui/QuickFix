// NOTE: routes/note.route.js
import express from "express";
import Note from "../models/note.model.js";

const router = express.Router();

router.get("/", async (_, res) => {
  const notes = await Note.find();
  res.json(notes);
});

router.post("/", async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
});

export default router;
