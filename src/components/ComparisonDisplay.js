import React from "react";
import "../styles/ComparisonDisplay.css";

const ComparisonDisplay = ({ foodData }) => {
  // Ensure healthyFood and unhealthyFood are either defined or fall back to empty objects
  const healthyFood = foodData?.healthyFood || {};
  const unhealthyFood = foodData?.unhealthyFood || {};

  const getNutritionalValues = (food) => {
    // Check if the food object and its servings are valid
    if (!food || !food.servings || !food.servings.serving) return {};

    const serving = Array.isArray(food.servings.serving)
      ? food.servings.serving[0]
      : food.servings.serving;

    return {
      calories: serving.calories || "N/A",
      protein: serving.protein || "N/A",
      carbs: serving.carbohydrate || "N/A",
      fat: serving.fat || "N/A",
    };
  };

  // Get nutritional values for both foods
  const healthyNutrition = getNutritionalValues(healthyFood);
  const unhealthyNutrition = getNutritionalValues(unhealthyFood);

  return (
    <div className="comparison-container">
      <div className="food-box healthy">
        <h3>Healthy Food</h3>
        {/* Fallback to "N/A" if food_name is not available */}
        <h4>{healthyFood?.food_name || "N/A"}</h4>
        <p>Calories: {healthyNutrition.calories}</p>
        <p>Protein: {healthyNutrition.protein}g</p>
        <p>Carbs: {healthyNutrition.carbs}g</p>
        <p>Fat: {healthyNutrition.fat}g</p>
      </div>

      <div className="food-box unhealthy">
        <h3>Unhealthy Food</h3>
        {/* Fallback to "N/A" if food_name is not available */}
        <h4>{unhealthyFood?.food_name || "N/A"}</h4>
        <p>Calories: {unhealthyNutrition.calories}</p>
        <p>Protein: {unhealthyNutrition.protein}g</p>
        <p>Carbs: {unhealthyNutrition.carbs}g</p>
        <p>Fat: {unhealthyNutrition.fat}g</p>
      </div>
    </div>
  );
};

export default ComparisonDisplay;
