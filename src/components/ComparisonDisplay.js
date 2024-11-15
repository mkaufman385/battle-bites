// ----------------------------------------------------------------------------------

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
        <p>Calories: {healthyFood?.calories || "N/A"}</p>
        <p>
          Protein: {healthyFood?.protein ? `${healthyFood.protein}g` : "N/A"}
        </p>
        <p>Carbs: {healthyFood?.carbs ? `${healthyFood.carbs}g` : "N/A"}</p>
        <p>Fat: {healthyFood?.fat ? `${healthyFood.fat}g` : "N/A"}</p>
      </div>

      <div className="food-box unhealthy">
        <h3>Unhealthy Food</h3>
        <h4>{unhealthyFood?.food_name || "N/A"}</h4>
        <p>Calories: {unhealthyFood?.calories || "N/A"}</p>
        <p>
          Protein:{" "}
          {unhealthyFood?.protein ? `${unhealthyFood.protein}g` : "N/A"}
        </p>
        <p>Carbs: {unhealthyFood?.carbs ? `${unhealthyFood.carbs}g` : "N/A"}</p>
        <p>Fat: {unhealthyFood?.fat ? `${unhealthyFood.fat}g` : "N/A"}</p>
      </div>
    </div>
  );
};

// const ComparisonDisplay = ({ foodData, isComparing }) => {
//   // If no foodData and comparison hasn't started, prompt user to begin
//   if (!foodData && !isComparing) {
//     return <p>Press the button to start comparing foods</p>;
//   }

//   // Log the foodData structure for debugging purposes
//   console.log("Food data:", foodData);

//   // Extract healthy and unhealthy food objects from foodData
//   const healthyFood = foodData?.healthyFood; // Adjust this if structure differs
//   const unhealthyFood = foodData?.unhealthyFood; // Adjust this if structure differs

//   // Ensure both healthy and unhealthy food data is present
//   if (!healthyFood || !unhealthyFood) {
//     return <p>No valid food data available</p>;
//   }

//   return (
//     <div className="comparison-container">
//       <div className="food-box healthy">
//         <h3>Healthy</h3>
//         <h4>{healthyFood.name || "N/A"}</h4>
//         <p>Calories: {healthyFood.calories || "N/A"}</p>
//         <p>
//           Protein: {healthyFood.protein ? `${healthyFood.protein}g` : "N/A"}
//         </p>
//         <p>Carbs: {healthyFood.carbs ? `${healthyFood.carbs}g` : "N/A"}</p>
//         <p>Fat: {healthyFood.fat ? `${healthyFood.fat}g` : "N/A"}</p>
//       </div>

//       <div className="food-box unhealthy">
//         <h3>Unhealthy</h3>
//         <h4>{unhealthyFood.name || "N/A"}</h4>
//         <p>Calories: {unhealthyFood.calories || "N/A"}</p>
//         <p>
//           Protein: {unhealthyFood.protein ? `${unhealthyFood.protein}g` : "N/A"}
//         </p>
//         <p>Carbs: {unhealthyFood.carbs ? `${unhealthyFood.carbs}g` : "N/A"}</p>
//         <p>Fat: {unhealthyFood.fat ? `${unhealthyFood.fat}g` : "N/A"}</p>
//       </div>
//     </div>
//   );
// };

export default ComparisonDisplay;
