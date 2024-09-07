import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/compare");
  };

  return (
    <div>
      <div>
        <h1>Welcome to Battle Bites</h1>
        <p>
          Find out how healthy and unhealthy foods compare based on nutritional
          information.
        </p>
        <button onClick={handleButtonClick}>Compare Foods NOW</button>
      </div>
    </div>
  );
}

export default LandingPage;
