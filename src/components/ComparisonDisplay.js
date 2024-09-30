import React from "react";
import "../styles/ComparisonDisplay.css";
// import FoodComparison from "./FoodComparison";

function ComparisonDisplay() {
  const food1 = {
    name: "Apple",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
  };
  const food2 = {
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

  // return (
  //   <div className="food-comparison">
  //     <div>Food 1 here</div>
  //     <div>Food 2 here</div>
  //   </div>
  // );
}

export default ComparisonDisplay;
