import React from "react";
import "../styles/ComparisonDisplay.css";

const ComparisonDisplay = ({ foodData, isComparing }) => {
  // Check if food data is available
  if (!foodData && !isComparing) {
    return <p>Press the button to start comparing foods</p>;
  }

  // Extract food1 and food2 from the API data (adjust this based on your API response structure)
  const food1 = foodData.healthyFood || {
    name: "Apple",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
  };

  const food2 = foodData.unhealthyFood || {
    name: "Oreos",
    calories: 53,
    protein: 0.5,
    carbs: 8.3,
    fat: 2.3,
  };

  return (
    <div className="comparison-container">
      <div className="food-box healthy">
        <h3>Healthy</h3>
        <h4>{food1.name}</h4>
        <p>Calories: {food1.calories}</p>
        <p>Protein: {food1.protein}g</p>
        <p>Carbs: {food1.carbs}g</p>
        <p>Fat: {food1.fat}g</p>
      </div>

      <div className="food-box unhealthy">
        <h3>Unhealthy</h3>
        <h4>{food2.name}</h4>
        <p>Calories: {food2.calories}</p>
        <p>Protein: {food2.protein}g</p>
        <p>Carbs: {food2.carbs}g</p>
        <p>Fat: {food2.fat}g</p>
      </div>
    </div>
  );
};

export default ComparisonDisplay;
