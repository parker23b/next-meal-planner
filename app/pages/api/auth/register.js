// pages/api/auth/register.js
import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import connectDB from "../../../../lib/db";

export const register = async (req, res) => {
  await connectDB();

  if (req.method === "POST") {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
