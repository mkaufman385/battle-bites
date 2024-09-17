import React from "react";
import "../styles/LandingPage.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/compare");
  };

  return (
    <div className="landing-page">
      <Header />
      <div className="content">
        <h1>Welcome to Battle Bites</h1>
        <p>
          Find out how healthy and unhealthy foods compare based on nutritional
          information.
        </p>
        <button className="compare-foods-button" onClick={handleButtonClick}>
          Compare Foods NOW
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
