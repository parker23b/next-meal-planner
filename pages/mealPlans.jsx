import React, { useState, useEffect } from "react";
import axios from "axios";

const MealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [title, setTitle] = useState("");
  const [meals, setMeals] = useState([{ name: "", calories: 0 }]);

  // useEffect(() => {
  //   const fetchMealPlans = async () => {
  //     const response = await axios.get("/api/meal-plans", {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     });
  //     setMealPlans(response.data);
  //   };
  //   fetchMealPlans();
  // }, []);

  const handleCreateMealPlan = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "/api/meal-plans/create",
      { title, meals },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    setMealPlans([...mealPlans, response.data]);
  };

  const handleMealChange = (index, field, value) => {
    const updatedMeals = [...meals];
    updatedMeals[index][field] = value;
    setMeals(updatedMeals);
  };

  const addMeal = () => {
    setMeals([...meals, { name: "", calories: 0 }]);
  };

  return (
    <div>
      <form onSubmit={handleCreateMealPlan}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Meal Plan Title"
        />
        {meals.map((meal, index) => (
          <div key={index}>
            <input
              value={meal.name}
              onChange={(e) => handleMealChange(index, "name", e.target.value)}
              placeholder="Meal Name"
            />
            <input
              value={meal.calories}
              onChange={(e) =>
                handleMealChange(index, "calories", e.target.value)
              }
              placeholder="Calories"
            />
          </div>
        ))}
        <button type="button" onClick={addMeal}>
          Add Meal
        </button>
        <button type="submit">Create Meal Plan</button>
      </form>
      <ul>
        {mealPlans.map((mealPlan) => (
          <li key={mealPlan._id}>
            <h3>{mealPlan.title}</h3>
            <ul>
              {mealPlan.meals.map((meal, index) => (
                <li key={index}>
                  {meal.name} - {meal.calories} calories
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealPlans;
