import React from "react";
import "../styles/ComparisonDisplay.css";

const ComparisonDisplay = ({ foodData }) => {
  const healthyFood = foodData?.healthyFood;
  const unhealthyFood = foodData?.unhealthyFood;

  return (
    <div className="comparison-container">
      <div className="food-box healthy">
        <h3>Healthy Food</h3>
        <h4>{healthyFood?.food_name || "N/A"}</h4>
        <p>Calories: {healthyFood?.nutritional_values?.calories || "N/A"}</p>
        <p>Protein: {healthyFood?.nutritional_values?.protein || "N/A"}g</p>
        <p>Carbs: {healthyFood?.nutritional_values?.carbohydrate || "N/A"}g</p>
        <p>Fat: {healthyFood?.nutritional_values?.fat || "N/A"}g</p>
      </div>

      <div className="food-box unhealthy">
        <h3>Unhealthy Food</h3>
        <h4>{unhealthyFood?.food_name || "N/A"}</h4>
        <p>Calories: {unhealthyFood?.nutritional_values?.calories || "N/A"}</p>
        <p>Protein: {unhealthyFood?.nutritional_values?.protein || "N/A"}g</p>
        <p>
          Carbs: {unhealthyFood?.nutritional_values?.carbohydrate || "N/A"}g
        </p>
        <p>Fat: {unhealthyFood?.nutritional_values?.fat || "N/A"}g</p>
      </div>
    </div>
  );
};

export default ComparisonDisplay;

// ----------------------------------------------------------------------------------
