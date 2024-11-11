// // import React from "react";
// // import "../styles/ComparisonDisplay.css";

// // const ComparisonDisplay = ({ foodData, isComparing }) => {
// //   // Check if food data is available
// //   if (!foodData && !isComparing) {
// //     return <p>Press the button to start comparing foods</p>;
// //   }

// //   console.log("Food data:", foodData);

// //   // Check if foodData has the expected structure
// //   if (!foodData || !foodData.healthyFood || !foodData.unhealthyFood) {
// //     return <p>No valid food data available</p>; // Show a message if data is not valid
// //   }

// //   // Extract food1 and food2 from the API data (adjust this based on your API response structure)
// //   const food1 = foodData.healthyFood;

// //   const food2 = foodData.unhealthyFood;

// //   return (
// //     <div className="comparison-container">
// //       <div className="food-box healthy">
// //         <h3>Healthy</h3>
// //         <h4>{food1.name}</h4>
// //         <p>Calories: {food1.calories}</p>
// //         <p>Protein: {food1.protein}g</p>
// //         <p>Carbs: {food1.carbs}g</p>
// //         <p>Fat: {food1.fat}g</p>
// //       </div>

// //       <div className="food-box unhealthy">
// //         <h3>Unhealthy</h3>
// //         <h4>{food2.name}</h4>
// //         <p>Calories: {food2.calories}</p>
// //         <p>Protein: {food2.protein}g</p>
// //         <p>Carbs: {food2.carbs}g</p>
// //         <p>Fat: {food2.fat}g</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ComparisonDisplay;

// import React from "react";
// import "../styles/ComparisonDisplay.css";

// const ComparisonDisplay = ({ foodData, isComparing }) => {
//   // Check if foodData is null or comparison hasn't started
//   if (!foodData && !isComparing) {
//     return <p>Press the button to start comparing foods</p>;
//   }

//   // Log the structure of foodData for debugging
//   console.log("Food data:", foodData);

//   // Adjust to the actual structure of foodData after confirming with console.log output
//   const healthyFood = foodData?.healthyFood; // Adjust based on actual response
//   const unhealthyFood = foodData?.unhealthyFood; // Adjust based on actual response

//   // Ensure both food items are present before rendering
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

// export default ComparisonDisplay;

// --------------------------------------------------------------------------------------------------------

import React from "react";
import "../styles/ComparisonDisplay.css";

const ComparisonDisplay = ({ foodData, isComparing }) => {
  // If no foodData and comparison hasn't started, prompt user to begin
  if (!foodData && !isComparing) {
    return <p>Press the button to start comparing foods</p>;
  }

  // Log the foodData structure for debugging purposes
  console.log("Food data:", foodData);

  // Extract healthy and unhealthy food objects from foodData
  const healthyFood = foodData?.healthyFood; // Adjust this if structure differs
  const unhealthyFood = foodData?.unhealthyFood; // Adjust this if structure differs

  // Ensure both healthy and unhealthy food data is present
  if (!healthyFood || !unhealthyFood) {
    return <p>No valid food data available</p>;
  }

  return (
    <div className="comparison-container">
      <div className="food-box healthy">
        <h3>Healthy</h3>
        <h4>{healthyFood.name || "N/A"}</h4>
        <p>Calories: {healthyFood.calories || "N/A"}</p>
        <p>
          Protein: {healthyFood.protein ? `${healthyFood.protein}g` : "N/A"}
        </p>
        <p>Carbs: {healthyFood.carbs ? `${healthyFood.carbs}g` : "N/A"}</p>
        <p>Fat: {healthyFood.fat ? `${healthyFood.fat}g` : "N/A"}</p>
      </div>

      <div className="food-box unhealthy">
        <h3>Unhealthy</h3>
        <h4>{unhealthyFood.name || "N/A"}</h4>
        <p>Calories: {unhealthyFood.calories || "N/A"}</p>
        <p>
          Protein: {unhealthyFood.protein ? `${unhealthyFood.protein}g` : "N/A"}
        </p>
        <p>Carbs: {unhealthyFood.carbs ? `${unhealthyFood.carbs}g` : "N/A"}</p>
        <p>Fat: {unhealthyFood.fat ? `${unhealthyFood.fat}g` : "N/A"}</p>
      </div>
    </div>
  );
};

export default ComparisonDisplay;
