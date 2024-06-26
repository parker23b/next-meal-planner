import mongoose from "mongoose";

const MealPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  meals: [{ name: String, calories: Number }],
});

export default mongoose.models.MealPlan ||
  mongoose.model("MealPlan", MealPlanSchema);
