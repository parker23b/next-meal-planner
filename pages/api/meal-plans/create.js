// pages/api/meal-plans/create.js
import jwt from "jsonwebtoken";
import MealPlan from "../../../../models/MealPlan";
import connectDB from "../../../../lib/db";

export const create = async (req, res) => {
  await connectDB();

  if (req.method === "POST") {
    const { title, meals } = req.body;
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).json({ message: "No token provided" });

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const mealPlan = new MealPlan({ userId: decoded.userId, title, meals });
    await mealPlan.save();

    res.status(201).json(mealPlan);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
