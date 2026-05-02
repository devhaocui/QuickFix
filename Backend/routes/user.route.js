// routes/user.route.js
import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = 10;

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  res.status(201).json(user);
});

router.get("/checkEmail", async (req, res) => {
  const emailExists = await User.findOne({ email: req.query.email });
  res.json({ exists: !!emailExists });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // verify user's email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // verify password
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(401).json({ message: "invalid password" });
    }

    // sucess, send user data back without the pw
    const userData = user.toObject();
    delete userData.password;
    res.json({ user: userData, message: "login success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
