import React from "react";
import ComparisonDisplay from "./ComparisonDisplay";

function FoodComparison() {
  return (
    // <div>
    //   <div>Food 1 here</div>
    //   <div>Food 2 here</div>
    // </div>

    <div>
      <h2>Compare Your Foods</h2>
      <div>{<ComparisonDisplay />} </div>
    </div>
  );
}

export default FoodComparison;
