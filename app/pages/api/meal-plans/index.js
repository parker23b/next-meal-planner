// pages/api/meal-plans/index.js
import jwt from "jsonwebtoken";
import MealPlan from "../../../../models/MealPlan";
import connectDB from "../../../../lib/db";

export const index = async (req, res) => {
  await connectDB();

  if (req.method === "GET") {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).json({ message: "No token provided" });

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const mealPlans = await MealPlan.find({ userId: decoded.userId });
    res.status(200).json(mealPlans);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
